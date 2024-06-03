import Address from '../models/Address.js';
import Coupon from '../models/Coupon.js';
import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

const getStep = (status) => {
    switch (status) {
        case 'processing':
            return 0;
        case 'packaging':
            return 1;
        case 'transfer':
            return 2;
        case 'success':
            return 3;
        case 'failure':
            return 3;
        case 'cancel':
            return 3;
    }
};
const orderService = {
    create: async (data) => {
        const order = await Order.create(data);
        if (order) {
            // Update infomation in User
            await User.updateOne(
                { _id: order.userId },
                { $push: { order: order._id } }
            );
            if (order.couponId) {
                // Update infomation in Coupon
                await Coupon.updateOne(
                    { _id: order.couponId },
                    { $push: { order: order._id } }
                );
            }

            // Update infomation in Address
            await Address.updateOne(
                { _id: order.addressId },
                { $push: { order: order._id } }
            );
            return order;
        }
    },

    getDataByUser: async (userId) => {
        const order = await Order.find({ userId })
            .populate('couponId')
            .populate('addressId')
            .populate('orderStatus')
            .populate({
                path: 'orderItem',
                populate: ['productId', 'reviewId'],
            });
        return order;
    },
    gets: async () => {
        const order = await Order.find()
            .populate('userId')
            .populate('couponId')
            .populate('addressId');
        return order;
    },

    getTotalProfit: async () => {
        const totalCount = await Order.find({
            'orderStatus.status': 'success',
        });
        return totalCount.reduce(function (accumulator, element) {
            return accumulator + element.amount;
        }, 0);
    },

    getTotal: async () => {
        const totalCount = await Order.countDocuments();
        return totalCount;
    },
    get: async (id) => {
        const order = await Order.findOne({ _id: id })
            .populate('couponId')
            .populate('addressId')
            .populate('userId')
            .populate('orderStatus')
            .populate({
                path: 'orderItem',
                populate: ['productId', 'reviewId'],
            });
        return order;
    },
    update: async (
        id,
        status,
        shippingDate,
        estimatedArrivalDate
    ) => {
        let order = await Order.findById(id);
        for (let orderItemId of order.orderItem) {
            const orderItem = await OrderItem.findById(orderItemId);
            let product = await Product.findById(orderItem.productId);
            switch (status) {
                case 'packaging':
                    await Product.findOneAndUpdate(
                        {
                            _id: product.id,
                        },
                        {
                            stockQuantity:
                                product.stockQuantity -
                                orderItem.quantity,
                        }
                    );
                    break;
                case 'failure':
                    await Product.findOneAndUpdate(
                        {
                            _id: product.id,
                        },
                        {
                            stockQuantity:
                                product.stockQuantity +
                                orderItem.quantity,
                        }
                    );
                    break;
            }
        }
        order = await Order.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    shippingDate,
                    estimatedArrivalDate,
                },
                $push: {
                    orderStatus: {
                        status,
                        step: getStep(status),
                    },
                },
            },
            { new: true }
        );
        return order;
    },
};
export default orderService;
