import SupplierProduct from '../models/SupplierProduct.js';

/* eslint-disable no-undef */
const supplierProductService = {
    create: async (data) => {
        return await SupplierProduct.create(data);
    },
    gets: async () => {
        return await SupplierProduct.find({
            isDeleted: false,
        });
    },
    getInfo: async () => {
        return await SupplierProduct.find({
            isDeleted: false,
            isHidden: false,
        }).populate('products');
    },
    get: async (id) => {
        return await SupplierProduct.findById(id);
    },
    update: async (_id, data) => {
        return await SupplierProduct.findOneAndUpdate({ _id }, data);
    },
    remove: async (_id) => {
        return await SupplierProduct.findOneAndUpdate(
            { _id },
            { $set: { isDeleted: true } },
            { new: true }
        );
    },
};

export default supplierProductService;
