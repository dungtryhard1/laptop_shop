import CategoryBlog from '../models/CategoryBlog.js';
import baseService from './baseService.js';

/* eslint-disable no-undef */
const categoryBlogService = {
    create: async (data) => {
        return await CategoryBlog.create(data);
    },
    gets: async () => {
        return await new baseService(CategoryBlog).adminGets();
    },
    getInfo: async () => {
        return await CategoryBlog.find({
            isDeleted: false,
            isHidden: false,
        }).populate('blogs');
    },
    get: async (id) => {
        return await CategoryBlog.findById(id);
    },
    update: async (_id, data) => {
        return await CategoryBlog.findOneAndUpdate({ _id }, data, {
            new: true,
        });
    },
    remove: async (_id) => {
        return await CategoryBlog.findOneAndUpdate(
            { _id },
            { $set: { isDeleted: true } },
            { new: true }
        );
    },
};

export default categoryBlogService;
