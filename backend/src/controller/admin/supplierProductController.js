import CustomError from '../../outcomes/customError.js';
import NotFoundError from '../../outcomes/notFoundError.js';
import ResponseHandler from '../../outcomes/responseHandler.js';
import supplierProductService from '../../service/supplierProductService.js';
import checkStatus from '../../utils/checkStatus.js';
import getObjectShortened from '../../utils/getObjectShortened.js';

const supplierProductController = {
    create: async (req, res, next) => {
        const data = req.body;
        try {
            const supplierProduct =
                await supplierProductService.create(data);
            ResponseHandler(res, supplierProduct);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    gets: async (req, res, next) => {
        try {
            const supplierProduct =
                await supplierProductService.gets();
            ResponseHandler(res, supplierProduct);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    get: async (req, res, next) => {
        try {
            const { id } = req.params;
            let supplierProduct =
                await supplierProductService.get(id);
            if (checkStatus.remove(supplierProduct)) {
                next(
                    new NotFoundError('Cannot find supplierProduct!')
                );
            } else {
                ResponseHandler(res, supplierProduct);
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;
            let supplierProduct =
                await supplierProductService.get(id);
            if (checkStatus.remove(supplierProduct)) {
                next(
                    new NotFoundError('Cannot find supplierProduct!')
                );
            } else {
                supplierProduct = getObjectShortened(supplierProduct);

                supplierProduct = await supplierProductService.update(
                    id,
                    {
                        ...supplierProduct,
                        ...data,
                    }
                );
                ResponseHandler(res, supplierProduct);
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    remove: async (req, res, next) => {
        try {
            const { id } = req.params;
            let supplierProduct =
                await supplierProductService.get(id);
            if (checkStatus.remove(supplierProduct)) {
                next(
                    new NotFoundError('Cannot find supplierProduct!')
                );
            } else if (await supplierProductService.remove(id)) {
                ResponseHandler(res, supplierProduct);
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
};
export default supplierProductController;
