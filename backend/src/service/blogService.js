import Blog from '../models/Blog.js';
import CategoryBlog from '../models/CategoryBlog.js';
import baseService from './baseService.js';

/* eslint-disable no-undef */
const blogService = {
    create: async (data) => {
        const { title, content, publishDate, categoryBlogId, image } =
            data;

        const blog = await Blog.create({
            title,
            content,
            publishDate,
            categoryBlogId,
            image,
        });
        if (blog) {
            // Add bog in categoryBlog
            await CategoryBlog.updateOne(
                { _id: blog.categoryBlogId },
                { $push: { blogs: blog._id } }
            );
            return blog;
        }
    },
    gets: async () => {
        return await new baseService(Blog).adminGets();
    },
    getAllInfo: async ({ categoryBlog, page, perPage }) => {
        const query = {};
        if (categoryBlog)
            query.categoryBlogId = { $in: categoryBlog };
        query.isDeleted = false;
        query.isHidden = false;
        const pageNumber = page ? parseInt(page, 10) : 1;
        const pageSize = perPage ? parseInt(perPage, 10) : 10;
        const skip = (pageNumber - 1) * pageSize;
        const totalCount = await Blog.countDocuments(query);

        const blogs = await Blog.find(query)
            .skip(skip)
            .limit(pageSize)
            .populate('categoryBlogId');

        return { blogs, totalCount };
    },
    getsAdmin: async ({ title, page, perPage }) => {
        const query = {};
        // Search by name
        if (title) query.title = new RegExp(title, 'i');
        query.isDeleted = false;
        query.isHidden = false;
        const pageNumber = page ? parseInt(page, 10) : 1;
        const pageSize = perPage ? parseInt(perPage, 10) : 10;
        const skip = (pageNumber - 1) * pageSize;
        const totalCount = await Blog.countDocuments(query);

        const blogs = await Blog.find(query)
            .skip(skip)
            .limit(pageSize)
            .populate('categoryBlogId');

        return { blogs, totalCount };
    },
    getInfo: async (id) => {
        return await Blog.findOne({
            _id: id,
            isDeleted: false,
            isHidden: false,
        }).populate('categoryBlogId');
    },
    get: async (id) => {
        return await Blog.findById(id);
    },
    update: async (id, data) => {
        const preBlog = await Blog.findById(id);
        const blog = await Blog.findOneAndUpdate({ _id: id }, data, {
            new: true,
        });
        if (blog) {
            if (preBlog.categoryBlogId !== blog.categoryBlogId) {
                // Add bog in categoryBlog
                await CategoryBlog.updateOne(
                    { _id: blog.categoryBlogId },
                    { $push: { blogs: id } }
                );

                // Remove bog in categoryBlog
                await CategoryBlog.updateOne(
                    { _id: preBlog.categoryBlogId },
                    { $pull: { blogs: id } }
                );
            }
            return blog;
        }
    },
    remove: async (id) => {
        return await new baseService(Blog).remove(id);
    },
};

export default blogService;
