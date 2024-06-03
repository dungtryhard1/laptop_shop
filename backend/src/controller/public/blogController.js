import CustomError from '../../outcomes/customError.js';
import NotFoundError from '../../outcomes/notFoundError.js';
import ResponseHandler from '../../outcomes/responseHandler.js';
import blogService from '../../service/blogService.js';

const blogController = {
    gets: async (req, res, next) => {
        try {
            const data = req.query;
            const categoryBlog = await blogService.getAllInfo(data);
            ResponseHandler(res, categoryBlog);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    get: async (req, res, next) => {
        try {
            const { id } = req.params;
            let blog = await blogService.getInfo(id);
            if (!blog) {
                next(new NotFoundError('Cannot find blog!'));
            } else {
                ResponseHandler(res, blog);
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
};
export default blogController;
