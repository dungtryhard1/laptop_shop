import _ from 'lodash';
import CustomError from '../../outcomes/customError.js';
import NotFoundError from '../../outcomes/notFoundError.js';
import ResponseHandler from '../../outcomes/responseHandler.js';
import attributeService from '../../service/attributeService.js';
import productService from '../../service/productService.js';
import checkStatus from '../../utils/checkStatus.js';
import getObjectShortened from '../../utils/getObjectShortened.js';

const convertFormatImage = (files) => {
    return files.map((image, index) => {
        return {
            url: image.path,
            publicId: image.filename,
            caption: image.name,
            isMain: index === 0,
        };
    });
};

const productController = {
    // createController
    create: async (req, res, next) => {
        try {
            const data = req.body;
            // convert format images
            let images = req?.files
                ? convertFormatImage(req.files)
                : null;
            // check have attribute
            let attributes = [];
            for (let attribute of data.attribute) {
                if (attribute?._id) {
                    attributes.push(attribute._id);
                } else {
                    const data =
                        await attributeService.create(attribute);
                    attributes.push(data.id.toString());
                }
            }
            data.attribute = attributes;
            data.images = images;
            //create product
            const product = await productService.create(data);
            ResponseHandler(res, product);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },

    gets: async (req, res, next) => {
        const data = req.query;
        try {
            const products = await productService.getsAdmin(data);
            ResponseHandler(res, products);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    getChart: async (req, res, next) => {
        try {
            const products = await productService.getsChart();
            const data = products.map((item) => {
                return {
                    _id: item._id,
                    name: item.name,
                    sellNumber: item.orderItem.length,
                    averageRating: getRating(item.orderItem),
                };
            });
            ResponseHandler(res, data);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    getTotal: async (req, res, next) => {
        try {
            const products = await productService.getTotal();
            ResponseHandler(res, products);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },

    get: async (req, res, next) => {
        try {
            const { id } = req.params;
            let product = await productService.get(id);
            if (checkStatus.remove(product)) {
                next(new NotFoundError('Cannot find product!'));
            } else {
                ResponseHandler(res, product);
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    remove: async (req, res, next) => {
        try {
            const { id } = req.params;
            let product = await productService.get(id);
            if (checkStatus.remove(product)) {
                next(new NotFoundError('Cannot find product!'));
            } else if (await productService.remove(id)) {
                ResponseHandler(res, product);
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body.product;
            // convert format images
            let images = req?.files
                ? convertFormatImage(req.files)
                : null;
            let attributes = [];
            for (let attribute of data.attribute) {
                if (attribute?._id) {
                    attributes.push(attribute._id);
                } else {
                    const data =
                        await attributeService.create(attribute);
                    attributes.push(data.id.toString());
                }
            }
            data.attribute = attributes;
            data.images = [...data.images, ...images];
            //create product
            let product = await productService.get(id);
            if (checkStatus.remove(product)) {
                next(new NotFoundError('Cannot find address!'));
            }
            product = getObjectShortened(product);
            product = await productService.update(req.params.id, {
                ...product,
                ...data,
            });
            ResponseHandler(res, product);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
};

const getRating = (orderItems) => {
    const review = orderItems.map((item) => item.reviewId);
    const sortReview = _.compact(review);
    return (
        sortReview.reduce(function (accumulator, element) {
            return accumulator + element.rating;
        }, 0) / sortReview.length
    );
};
export default productController;
