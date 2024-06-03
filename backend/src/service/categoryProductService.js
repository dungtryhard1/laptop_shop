import CategoryProduct from '../models/CategoryProduct.js';
import baseService from './baseService.js';

/* eslint-disable no-undef */
const categoryProductService = {
    create: async (name, description) => {
        return await CategoryProduct.create({
            name,
            description: description ?? '',
        });
    },
    gets: async () => {
        return await new baseService(CategoryProduct).adminGets();
    },
    getInfo: async () => {
        return await CategoryProduct.find({
            isDeleted: false,
            isHidden: false,
        }).populate('products');
    },

    get: async (id) => {
        return await new baseService(CategoryProduct).adminGet(id, [
            'products',
        ]);
    },
    findById: async (id) => {
        return await new baseService(CategoryProduct).adminGet(id);
    },
    update: async (_id, data) => {
        return await CategoryProduct.findOneAndUpdate({ _id }, data, {
            new: true,
        });
    },
    remove: async (_id) => {
        return await CategoryProduct.findOneAndUpdate(
            { _id },
            { $set: { isDeleted: true } },
            { new: true }
        );
    },
};

export default categoryProductService;
