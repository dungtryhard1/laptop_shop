import CustomError from '../../outcomes/customError.js';
import ResponseHandler from '../../outcomes/responseHandler.js';
import categoryBlogService from '../../service/categoryBlogService.js';

const categoryBlogController = {
    gets: async (req, res, next) => {
        try {
            const categoryBlog = await categoryBlogService.getInfo();
            ResponseHandler(res, categoryBlog);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
};
export default categoryBlogController;
