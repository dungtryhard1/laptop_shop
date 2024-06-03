import CustomError from '../../outcomes/customError.js';
import NotFoundError from '../../outcomes/notFoundError.js';
import ResponseHandler from '../../outcomes/responseHandler.js';
import blogService from '../../service/blogService.js';
import categoryBlogService from '../../service/categoryBlogService.js';
import imageService from '../../service/imageService.js';
import checkStatus from '../../utils/checkStatus.js';
import getObjectShortened from '../../utils/getObjectShortened.js';

const convertFormatImage = (files) => {
    return files.map((image, index) => {
        return {
            url: image.path,
            publicId: image.filename,
            caption: image.name,
            isMain: index === 0,
        };
    });
};

const blogController = {
    create: async (req, res, next) => {
        let data = req.body;
        try {
            let categoryBlog = await categoryBlogService.get(
                data.categoryBlogId
            );
            if (checkStatus.remove(categoryBlog)) {
                for (let image of req.files) {
                    await imageService.remove(image.filename);
                }
                next(new NotFoundError('Cannot find categoryBlog!'));
            } else {
                const images = req?.files
                    ? convertFormatImage(req.files)
                    : null;
                if (images) {
                    data.image = images[0];
                }
                const blog = await blogService.create(data);
                if (blog) {
                    ResponseHandler(res, blog);
                }
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    gets: async (req, res, next) => {
        try {
            const data = req.query;
            const categoryBlog = await blogService.getsAdmin(data);
            ResponseHandler(res, categoryBlog);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    get: async (req, res, next) => {
        try {
            const { id } = req.params;
            let blog = await blogService.get(id);
            if (checkStatus.remove(blog)) {
                next(new NotFoundError('Cannot find blog!'));
            } else {
                ResponseHandler(res, blog);
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body.blog;
            let blog = await blogService.get(id);
            if (checkStatus.remove(blog)) {
                next(new NotFoundError('Cannot find blog!'));
            } else {
                let categoryBlog = await categoryBlogService.get(
                    data.categoryBlogId
                );
                if (checkStatus.remove(categoryBlog)) {
                    next(
                        new NotFoundError('Cannot find categoryBlog!')
                    );
                } else {
                    const images = req?.files
                        ? convertFormatImage(req.files)
                        : null;
                    if (images) {
                        data.image = images[0];
                    }
                    blog = getObjectShortened(blog);
                    blog = await blogService.update(id, {
                        ...blog,
                        ...data,
                    });
                    ResponseHandler(res, blog);
                }
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    remove: async (req, res, next) => {
        try {
            const { id } = req.params;
            let blog = await blogService.get(id);
            if (checkStatus.remove(blog)) {
                next(new NotFoundError('Cannot find blog!'));
            } else if (await blogService.remove(id)) {
                ResponseHandler(res, blog);
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
};
export default blogController;
