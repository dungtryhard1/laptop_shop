import attributeTypeService from '../../service/attributeTypeService.js';
import categoryProductService from '../../service/categoryProductService.js';
import supplierProductService from '../../service/supplierProductService.js';
import warrantyProductService from '../../service/warrantyProductService.js';
import imageService from '../../service/imageService.js';

import CustomError from '../../outcomes/customError.js';
import NotFoundError from '../../outcomes/notFoundError.js';
import attributeService from '../../service/attributeService.js';
import checkStatus from '../../utils/checkStatus.js';

const checkSupplierProduct = async (id) => {
    const supplierProduct = await supplierProductService.get(id);
    return checkStatus.remove(supplierProduct);
};

const checkWarrantyProduct = async (id) => {
    const warrantyProduct = await warrantyProductService.get(id);
    return checkStatus.remove(warrantyProduct);
};

const checkCategoryProduct = async (id) => {
    const categoryProduct = await categoryProductService.get(id);
    return checkStatus.remove(categoryProduct);
};

const productMiddlewares = {
    create: async (req, res, next) => {
        try {
            const data = req.body;
            const messages = [];
            //  check supplierProduct
            if (await checkSupplierProduct(data.supplierId)) {
                messages.push('Cannot find supplierProduct!');
            }
            //  check warrantyProduct
            if (await checkWarrantyProduct(data.warrantyId)) {
                messages.push('Cannot find warrantyProduct!');
            }
            //  check categoryProduct
            if (await checkCategoryProduct(data.categoryId)) {
                messages.push('Cannot find categoryProduct!');
            }
            // check have attributeKey
            for (let attributeData of data.attribute) {
                // Đổi tên của tham số từ `attribute` sang `attributeData`
                if (attributeData?._id) {
                    const attr = await attributeService.get(
                        attributeData._id
                    );
                    if (checkStatus.remove(attr)) {
                        messages.push('Cannot find attribute!');
                        break;
                    }
                } else {
                    const attributeKey =
                        await attributeTypeService.get(
                            attributeData.key
                        );
                    if (checkStatus.remove(attributeKey)) {
                        messages.push('Cannot find attributeKey!');
                        break;
                    }
                }
            }
            if (messages.length === 0) {
                next();
            } else {
                for (let image of req.files) {
                    await imageService.remove(image.filename);
                }
                next(new NotFoundError(messages));
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    update: async (req, res, next) => {
        try {
            const data = req.body.product;
            const messages = [];
            //  check supplierProduct
            if (await checkSupplierProduct(data.supplierId)) {
                messages.push('Cannot find supplierProduct!');
            }
            //  check warrantyProduct
            if (await checkWarrantyProduct(data.warrantyId)) {
                messages.push('Cannot find warrantyProduct!');
            }
            //  check categoryProduct
            if (await checkCategoryProduct(data.categoryId)) {
                messages.push('Cannot find categoryProduct!');
            }
            // check have attributeKey
            for (let attributeData of data.attribute) {
                // Đổi tên của tham số từ `attribute` sang `attributeData`
                if (attributeData?._id) {
                    const attr = await attributeService.get(
                        attributeData._id
                    );
                    if (checkStatus.remove(attr)) {
                        messages.push('Cannot find attribute!');
                        break;
                    }
                } else {
                    const attributeKey =
                        await attributeTypeService.get(
                            attributeData.key
                        );
                    if (checkStatus.remove(attributeKey)) {
                        messages.push('Cannot find attributeKey!');
                        break;
                    }
                }
            }
            if (messages.length === 0) {
                next();
            } else {
                for (let image of req.files) {
                    await imageService.remove(image.filename);
                }
                next(new NotFoundError(messages));
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
};
export default productMiddlewares;
