import CustomError from '../../outcomes/customError.js';
import NotFoundError from '../../outcomes/notFoundError.js';
import ResponseHandler from '../../outcomes/responseHandler.js';
import categoryBlogService from '../../service/categoryBlogService.js';
import checkStatus from '../../utils/checkStatus.js';
import getObjectShortened from '../../utils/getObjectShortened.js';

const categoryBlogController = {
    create: async (req, res, next) => {
        const data = req.body;
        try {
            const categoryBlog =
                await categoryBlogService.create(data);
            ResponseHandler(res, categoryBlog);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    gets: async (req, res, next) => {
        try {
            const categoryBlog = await categoryBlogService.gets();
            ResponseHandler(res, categoryBlog);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    get: async (req, res, next) => {
        try {
            const { id } = req.params;
            let categoryBlog = await categoryBlogService.get(id);
            if (checkStatus.remove(categoryBlog)) {
                next(new NotFoundError('Cannot find categoryBlog!'));
            } else {
                ResponseHandler(res, categoryBlog);
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;
            let categoryBlog = await categoryBlogService.get(id);
            if (checkStatus.remove(categoryBlog)) {
                next(new NotFoundError('Cannot find categoryBlog!'));
            } else {
                categoryBlog = getObjectShortened(categoryBlog);
                categoryBlog = await categoryBlogService.update(id, {
                    ...categoryBlog,
                    ...data,
                });
                ResponseHandler(res, categoryBlog);
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    remove: async (req, res, next) => {
        try {
            const { id } = req.params;
            let categoryBlog = await categoryBlogService.get(id);
            if (checkStatus.remove(categoryBlog)) {
                next(new NotFoundError('Cannot find categoryBlog!'));
            } else if (await categoryBlogService.remove(id)) {
                ResponseHandler(res, categoryBlog);
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
};
export default categoryBlogController;
