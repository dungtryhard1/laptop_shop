import Attribute from '../models/Attribute.js';
import CategoryProduct from '../models/CategoryProduct.js';
import Product from '../models/Product.js';
import SupplierProduct from '../models/SupplierProduct.js';
import WarrantyProduct from '../models/WarrantyProduct.js';

const productService = {
    create: async (data) => {
        const product = await Product.create(data);
        if (product) {
            // Update infomation in  Attribute
            await Attribute.updateMany(
                { _id: { $in: product.attribute } },
                { $push: { products: product._id } }
            );

            // Update infomation in warranty
            await WarrantyProduct.updateOne(
                { _id: product.warrantyId },
                { $push: { products: product._id } }
            );
            // Update infomation in supplier
            await SupplierProduct.updateOne(
                { _id: product.supplierId },
                { $push: { products: product._id } }
            );
            // Update infomation in category
            await CategoryProduct.updateOne(
                { _id: product.categoryId },
                { $push: { products: product._id } }
            );
            return product;
        }
    },

    gets: async () => {
        return await Product.find({
            isDeleted: false,
        })
            .populate('attribute')
            .populate('warrantyId')
            .populate('supplierId')
            .populate('categoryId')
            .exec();
    },
    getsChart: async () => {
        const orders = await Product.find({
            isDeleted: false,
        }).populate({
            path: 'orderItem',
            populate: [
                'orderId',
                {
                    path: 'reviewId',
                },
            ],
        });
        orders.filter((order) =>
            order.orderItem.some((item) =>
                item.orderId.orderStatus.some(
                    (status) => status.status === 'success'
                )
            )
        );
        return orders;
    },
    getsAdmin: async ({
        name,
        sortName,
        sortPrice,
        page,
        perPage,
    }) => {
        const query = {};

        // Search by name
        if (name) query.name = new RegExp(name, 'i');
        query.isDeleted = false;
        // Sorting
        const sortCriteria = {};
        if (sortName) sortCriteria.name = sortName === 'asc' ? 1 : -1;
        if (sortPrice)
            sortCriteria.price = sortPrice === 'asc' ? 1 : -1;
        // Pagination
        const pageNumber = page ? parseInt(page, 10) : 1;
        const pageSize = perPage ? parseInt(perPage, 10) : 10;
        const skip = (pageNumber - 1) * pageSize;
        const totalCount = await Product.countDocuments(query);
        const products = await Product.find(query)
            .sort(sortCriteria)
            .skip(skip)
            .limit(pageSize)
            .populate('warrantyId')
            .populate('supplierId')
            .populate('categoryId')
            .populate({
                path: 'orderItem',
                populate: ['reviewId'],
            })

            .populate({
                path: 'attribute',
                populate: 'key',
            });
        return { products, totalCount };
    },
    getTotal: async () => {
        const totalCount = await Product.countDocuments({
            isDeleted: false,
        });
        return totalCount;
    },

    get: async (_id) => {
        return await Product.findById(_id)
            .populate('attribute')
            .populate('warrantyId')
            .populate('supplierId')
            .populate('categoryId');
    },

    remove: async (_id) => {
        return await Product.findOneAndUpdate(
            { _id },
            { $set: { isDeleted: true } },
            { new: true }
        );
    },
    update: async (id, data) => {
        const preProduct = await Product.findById(id);
        const product = await Product.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        );

        if (product) {
            // Update in Attribute
            const attributesToAdd = product.attribute;
            const attributesToRemove = preProduct.attribute;

            // Remove product ID in Attribute
            await Attribute.updateMany(
                { _id: { $in: attributesToRemove } },
                { $pull: { products: product._id } }
            );

            // Add product ID in Attribute
            await Attribute.updateMany(
                { _id: { $in: attributesToAdd } },
                { $push: { products: product._id } }
            );

            if (product.warrantyId !== preProduct.warrantyId) {
                // Add product in warranty
                await WarrantyProduct.updateOne(
                    { _id: product.warrantyId },
                    { $push: { products: product._id } }
                );
                // Remove product in warranty
                await WarrantyProduct.updateOne(
                    { _id: preProduct.warrantyId },
                    { $pull: { products: product._id } }
                );
            }

            if (product.supplierId !== preProduct.supplierId) {
                // Add product in SupplierProduct
                await SupplierProduct.updateOne(
                    { _id: product.supplierId },
                    { $push: { products: product._id } }
                );
                // Remove product in SupplierProduct
                await SupplierProduct.updateOne(
                    { _id: preProduct.supplierId },
                    { $pull: { products: product._id } }
                );
            }

            if (product.categoryId !== preProduct.categoryId) {
                // Add product in CategoryProduct
                await CategoryProduct.updateOne(
                    { _id: product.categoryId },
                    { $push: { products: product._id } }
                );
                // Remove product in CategoryProduct
                await CategoryProduct.updateOne(
                    { _id: preProduct.categoryId },
                    { $pull: { products: product._id } }
                );
            }
            return product;
        }
    },
    filter: async ({
        supplier,
        category,
        attribute,
        priceMax,
        priceMin,
        name,
        sortName,
        sortPrice,
        page,
        perPage,
    }) => {
        const query = {};

        // Filter by supplierIds, categoryId, and attributes
        if (supplier) query.supplierId = { $in: supplier };
        if (category) query.categoryId = { $in: category };
        if (attribute) query.attribute = { $in: attribute };

        // Filter by price range
        if (priceMin || priceMax) {
            query.price = {};
            if (priceMin !== undefined) query.price.$gte = priceMin;
            if (priceMax !== undefined) query.price.$lte = priceMax;
        }
        // Search by name
        if (name) query.name = new RegExp(name, 'i');
        query.isDeleted = false;
        query.isHidden = false;
        // Sorting
        const sortCriteria = {};
        if (sortName) sortCriteria.name = sortName === 'asc' ? 1 : -1;
        if (sortPrice)
            sortCriteria.price = sortPrice === 'asc' ? 1 : -1;

        // Pagination
        const pageNumber = page ? parseInt(page, 10) : 1;
        const pageSize = perPage ? parseInt(perPage, 10) : 10;
        const skip = (pageNumber - 1) * pageSize;
        const totalCount = await Product.countDocuments(query);
        const products = await Product.find(query)
            .sort(sortCriteria)
            .skip(skip)
            .limit(pageSize)
            .populate('warrantyId')
            .populate('supplierId')
            .populate('categoryId')
            .populate({
                path: 'orderItem',
                populate: ['reviewId'],
            })

            .populate({
                path: 'attribute',
                populate: 'key',
            });
        return { products, totalCount };
    },
    getInfo: async (id) => {
        const product = await Product.findOne({
            _id: id,
            isDeleted: false,
            isHidden: false,
        })
            .populate('warrantyId')
            .populate('supplierId')
            .populate('categoryId')
            .populate({
                path: 'orderItem',
                populate: [
                    'productId',
                    {
                        path: 'reviewId',
                        populate: {
                            path: 'userId',
                            select: 'username',
                        },
                    },
                ],
            })
            .populate({
                path: 'attribute',
                populate: 'key',
            });
        return product;
    },

    getTopSelling: async () => {
        const product = await Product.aggregate([
            { $match: { isDeleted: false, isHidden: false } },
            {
                $addFields: {
                    numberOfOrderItems: { $size: '$orderItem' },
                },
            },
            { $sort: { numberOfOrderItems: -1 } },
            { $limit: 5 },
        ]);

        return product;
    },

    getTopNew: async () => {
        const product = await Product.find({
            isDeleted: false,
            isHidden: false,
        })
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('warrantyId')
            .populate('supplierId')
            .populate('categoryId')
            .populate({
                path: 'orderItem',
                populate: ['productId', 'reviewId'],
            })
            .populate({
                path: 'attribute',
                populate: 'key',
            });
        return product;
    },
};
export default productService;
