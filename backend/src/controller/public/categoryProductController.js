import CustomError from '../../outcomes/customError.js';
import ResponseHandler from '../../outcomes/responseHandler.js';
import categoryProductService from '../../service/categoryProductService.js';

const categoryProductController = {
    gets: async (req, res, next) => {
        try {
            const categoryProduct =
                await categoryProductService.getInfo();

            ResponseHandler(res, categoryProduct);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
};
export default categoryProductController;
