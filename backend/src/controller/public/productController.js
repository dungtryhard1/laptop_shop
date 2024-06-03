import CustomError from '../../outcomes/customError.js';
import ResponseHandler from '../../outcomes/responseHandler.js';
import productService from '../../service/productService.js';

const productController = {
    gets: async (req, res, next) => {
        try {
            const data = req.query;
            const products = await productService.filter(data);
            ResponseHandler(res, products);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    get: async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await productService.getInfo(id);
            ResponseHandler(res, product);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    getTopSelling: async (req, res, next) => {
        try {
            const product = await productService.getTopSelling();
            ResponseHandler(res, product);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    getTopNew: async (req, res, next) => {
        try {
            const product = await productService.getTopSelling();
            ResponseHandler(res, product);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
};
export default productController;
