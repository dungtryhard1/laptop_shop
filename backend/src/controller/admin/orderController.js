import CustomError from '../../outcomes/customError.js';
import ResponseHandler from '../../outcomes/responseHandler.js';
import orderItemService from '../../service/orderItemService.js';
import orderService from '../../service/orderService.js';

const orderController = {
    get: async (req, res, next) => {
        try {
            const { id } = req.params;
            const order = await orderService.get(id);
            ResponseHandler(res, order);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    getTotalRating: async (req, res, next) => {
        try {
            const order = await orderItemService.getTotalRating();
            ResponseHandler(res, order);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    getTotalProfit: async (req, res, next) => {
        try {
            const order = await orderService.getTotalProfit();
            ResponseHandler(res, order);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    gets: async (req, res, next) => {
        try {
            const order = await orderService.gets();
            ResponseHandler(res, order);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    getTotal: async (req, res, next) => {
        try {
            const order = await orderService.getTotal();
            ResponseHandler(res, order);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { status, shippingDate, estimatedArrivalDate } =
                req.body;
            let order = await orderService.get(id);
            const numberStatus = order.orderStatus.filter(
                (item) => item.step !== 3
            );
            if (!numberStatus) {
                next(new CustomError('Status order finish', 400));
            } else {
                const nextStatusMap = {
                    packaging: 'processing',
                    transfer: 'packaging',
                    success: 'transfer',
                    failure: 'transfer',
                };
                if (
                    order.orderStatus.slice(-1)[0].status ===
                    nextStatusMap[status]
                ) {
                    order = await orderService.update(
                        id,
                        status,
                        shippingDate,
                        estimatedArrivalDate
                    );
                }
                ResponseHandler(res, order);
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
};
export default orderController;
