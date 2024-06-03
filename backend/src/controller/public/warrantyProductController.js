import CustomError from '../../outcomes/customError.js';
import ResponseHandler from '../../outcomes/responseHandler.js';
import warrantyProductService from '../../service/warrantyProductService.js';

const warrantyProductController = {
    gets: async (req, res, next) => {
        try {
            const warrantyProduct =
                await warrantyProductService.getInfo();
            ResponseHandler(res, warrantyProduct);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
};
export default warrantyProductController;
