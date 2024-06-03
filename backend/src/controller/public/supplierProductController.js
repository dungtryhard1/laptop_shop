import CustomError from '../../outcomes/customError.js';
import ResponseHandler from '../../outcomes/responseHandler.js';
import supplierProductService from '../../service/supplierProductService.js';

const supplierProductController = {
    gets: async (req, res, next) => {
        try {
            const supplierProduct =
                await supplierProductService.getInfo();
            ResponseHandler(res, supplierProduct);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
};
export default supplierProductController;
