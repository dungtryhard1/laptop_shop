import _ from 'lodash';
import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import Product from '../models/Product.js';

const orderItemService = {
    create: async (orderId, orderItems) => {
        for (let orderItem of orderItems) {
            const data = await OrderItem.create({
                ...orderItem,
                orderId,
            });
            if (data) {
                await Order.updateOne(
                    { _id: orderId },
                    { $push: { orderItem: data._id } }
                );
                await Product.updateOne(
                    { _id: data.productId },
                    { $push: { orderItem: data._id } }
                );
            }
        }
    },
    get: async (id) => {
        return await OrderItem.findOne({ _id: id })
            .populate('orderId')
            .populate('orderId')
            .populate('productId')
            .populate('reviewId');
    },
    getTotalRating: async () => {
        const orderItems =
            await OrderItem.find().populate('reviewId');
        const review = orderItems.map((item) => item.reviewId);
        const sortReview = _.compact(review);
        return (
            sortReview.reduce(function (accumulator, element) {
                return accumulator + element.rating;
            }, 0) / sortReview.length
        );
    },
};
export default orderItemService;
