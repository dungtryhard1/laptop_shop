import Attribute from '../models/Attribute.js';

/* eslint-disable no-undef */
const attributeService = {
    create: async (attribute) => {
        const { key, value } = attribute;
        return await Attribute.create({
            key,
            value,
        });
    },
    getByKey: async (id) => {
        return await Attribute.find({ key: id })
            .populate('products'); // Populate thông tin sản phẩm cho mỗi thuộc tính
    },
    
    gets: async () => {
        return await Attribute.find();
    },
    getInfo: async () => {
        return await Attribute.find()
            .populate('key')
            .populate('products');
    },
    search: async (data) => {
        const { key, value } = data;
        return await Attribute.find({
            key,
            value,
        });
    },
    get: async (id) => {
        return await Attribute.findById(id);
    },
    update: async (_id, key, value) => {
        return await Attribute.findOneAndUpdate(
            { _id },
            { key, value },
            { new: true }
        );
    },
    remove: async (attribute) => {
        return await Attribute.findOneAndUpdate(
            { _id: attribute._id },
            { $set: { isDeleted: true } },
            { new: true }
        );
    },
};

export default attributeService;
