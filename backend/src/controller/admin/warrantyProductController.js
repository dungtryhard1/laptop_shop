import CustomError from '../../outcomes/customError.js';
import NotFoundError from '../../outcomes/notFoundError.js';
import ResponseHandler from '../../outcomes/responseHandler.js';
import warrantyProductService from '../../service/warrantyProductService.js';
import checkStatus from '../../utils/checkStatus.js';
import getObjectShortened from '../../utils/getObjectShortened.js';

const warrantyProductController = {
    create: async (req, res, next) => {
        try {
            const warrantyProduct =
                await warrantyProductService.create(req.body);

            ResponseHandler(res, warrantyProduct);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    gets: async (req, res, next) => {
        try {
            const warrantyProduct =
                await warrantyProductService.gets();
            ResponseHandler(res, warrantyProduct);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    get: async (req, res, next) => {
        try {
            const { id } = req.params;
            let warrantyProduct =
                await warrantyProductService.get(id);
            if (checkStatus.remove(warrantyProduct)) {
                next(
                    new NotFoundError('Cannot find warrantyProduct!')
                );
            } else {
                ResponseHandler(res, warrantyProduct);
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;
            let warrantyProduct =
                await warrantyProductService.get(id);
            if (checkStatus.remove(warrantyProduct)) {
                next(
                    new NotFoundError('Cannot find warrantyProduct!')
                );
            } else {
                warrantyProduct = getObjectShortened(warrantyProduct);
                warrantyProduct = await warrantyProductService.update(
                    id,
                    {
                        ...warrantyProduct,
                        ...data,
                    }
                );
                ResponseHandler(res, warrantyProduct);
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    remove: async (req, res, next) => {
        try {
            const { id } = req.params;
            let warrantyProduct =
                await warrantyProductService.get(id);
            if (checkStatus.remove(warrantyProduct)) {
                next(
                    new NotFoundError('Cannot find warrantyProduct!')
                );
            } else if (await warrantyProductService.remove(id)) {
                ResponseHandler(res, warrantyProduct);
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
};
export default warrantyProductController;
