import CustomError from '../../outcomes/customError.js';
import NotFoundError from '../../outcomes/notFoundError.js';
import ResponseHandler from '../../outcomes/responseHandler.js';
import couponService from '../../service/couponService.js';
import orderItemService from '../../service/orderItemService.js';
import orderService from '../../service/orderService.js';
import productService from '../../service/productService.js';
import checkStatus from '../../utils/checkStatus.js';

const orderController = {
    create: async (req, res, next) => {
        try {
            const data = req.body;
            data.userId = req.userId;
            data.orderStatus = [
                {
                    status: 'processing',
                    step: 0,
                },
            ];
            data.amount = 0;
            for (let orderItem of data.orderItem) {
                const product = await productService.get(
                    orderItem.productId
                );
                if (!checkStatus.remove(product)) {
                    if (product.stockQuantity < orderItem.quantity) {
                        next(
                            new CustomError(
                                'Product quantity is not enough',
                                400
                            )
                        );
                    } else {
                        data.amount =
                            data.amount +
                            product.price * orderItem.quantity;
                    }
                } else {
                    next(new NotFoundError('Cannot find product!'));
                }
                if (data.couponId) {
                    const coupon = await couponService.get(
                        data.couponId
                    );
                    if (!checkStatus.remove(coupon)) {
                        data.amount *= 1 - coupon.discountPercent;
                    } else {
                        next(
                            new NotFoundError(
                                'Cannot find or apply coupon!'
                            )
                        );
                    }
                }
            }
            const { orderItem } = data;
            delete data.orderItem;
            let order = await orderService.create(data);
            await orderItemService.create(order._id, orderItem);
            order = await orderService.get(order._id);
            ResponseHandler(res, order);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    get: async (req, res, next) => {
        try {
            const { id } = req.params;
            const order = await orderService.get(id);
            ResponseHandler(res, order);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    gets: async (req, res, next) => {
        try {
            const { userId } = req;
            const order = await orderService.getDataByUser(userId);
            ResponseHandler(res, order);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    cancel: async (req, res, next) => {
        try {
            const { id } = req.params;
            let order = await orderService.get(id);
            const numberStatus = order.orderStatus.filter(
                (item) => item.step === '0'
            );
            if (numberStatus.length === order.orderStatus.length) {
                order = await orderService.update(
                    id,
                    'cancel',
                    order.shippingDate,
                    order.estimatedArrivalDate
                );
                ResponseHandler(res, order);
            } else {
                next(new CustomError('Oder has been processed', 400));
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
};
export default orderController;
