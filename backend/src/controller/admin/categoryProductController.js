import CustomError from '../../outcomes/customError.js';
import NotFoundError from '../../outcomes/notFoundError.js';
import ResponseHandler from '../../outcomes/responseHandler.js';
import categoryProductService from '../../service/categoryProductService.js';
import checkStatus from '../../utils/checkStatus.js';
import getObjectShortened from '../../utils/getObjectShortened.js';

const categoryProductController = {
    create: async (req, res, next) => {
        const { name, description } = req.body;
        try {
            const categoryProduct =
                await categoryProductService.create(
                    name,
                    description
                );

            ResponseHandler(res, categoryProduct);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    gets: async (req, res, next) => {
        try {
            const categoryProduct =
                await categoryProductService.gets();

            ResponseHandler(res, categoryProduct);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    get: async (req, res, next) => {
        try {
            const { id } = req.params;
            let categoryProduct =
                await categoryProductService.get(id);
            if (!categoryProduct) {
                next(
                    new NotFoundError('Cannot find categoryProduct!')
                );
            } else {
                ResponseHandler(res, categoryProduct);
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;
            let categoryProduct =
                await categoryProductService.findById(id);
            if (checkStatus.remove(categoryProduct)) {
                next(
                    new NotFoundError('Cannot find categoryProduct!')
                );
            } else {
                categoryProduct = getObjectShortened(categoryProduct);
                categoryProduct = await categoryProductService.update(
                    id,
                    {
                        ...categoryProduct,
                        ...data,
                    }
                );
                ResponseHandler(res, categoryProduct);
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    remove: async (req, res, next) => {
        try {
            const { id } = req.params;
            let categoryProduct =
                await categoryProductService.get(id);
            if (checkStatus.remove(categoryProduct)) {
                next(
                    new NotFoundError('Cannot find categoryProduct!')
                );
            } else if (await categoryProductService.remove(id)) {
                ResponseHandler(res, categoryProduct);
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
};
export default categoryProductController;
