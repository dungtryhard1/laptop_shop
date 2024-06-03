import WarrantyProduct from '../models/WarrantyProduct.js';

/* eslint-disable no-undef */
const warrantyProductService = {
    create: async (data) => {
        return await WarrantyProduct.create(data);
    },
    gets: async () => {
        return await WarrantyProduct.find({
            isDeleted: false,
        });
    },
    getInfo: async () => {
        return await WarrantyProduct.find({
            isDeleted: false,
            isHidden: false,
        }).populate('products');
    },
    get: async (id) => {
        return await WarrantyProduct.findById(id);
    },
    update: async (_id, data) => {
        return await WarrantyProduct.findOneAndUpdate({ _id }, data, {
            new: true,
        });
    },
    remove: async (_id) => {
        return await WarrantyProduct.findOneAndUpdate(
            { _id },
            { $set: { isDeleted: true } },
            { new: true }
        );
    },
};

export default warrantyProductService;
