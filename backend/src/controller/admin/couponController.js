import CustomError from '../../outcomes/customError.js';
import NotFoundError from '../../outcomes/notFoundError.js';
import ResponseHandler from '../../outcomes/responseHandler.js';
import couponService from '../../service/couponService.js';
import checkStatus from '../../utils/checkStatus.js';
import getObjectShortened from '../../utils/getObjectShortened.js';

const couponController = {
    create: async (req, res, next) => {
        const data = req.body;
        try {
            let coupon = couponService.findByCode(data.code);
            if (!coupon) {
                next(
                    new CustomError(
                        { code: 'Not duplication code' },
                        400
                    )
                );
            } else {
                coupon = await couponService.create(data);
                if (coupon) {
                    ResponseHandler(res, coupon);
                }
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },

    gets: async (req, res, next) => {
        try {
            const coupon = await couponService.gets();
            ResponseHandler(res, coupon);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },

    get: async (req, res, next) => {
        try {
            const { id } = req.params;
            let coupon = await couponService.get(id);
            if (checkStatus.remove(coupon)) {
                next(new NotFoundError('Cannot find coupon!'));
            } else {
                ResponseHandler(res, coupon);
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },

    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;
            let coupon = await couponService.get(id);
            if (!coupon) {
                next(new NotFoundError('Cannot find coupon!'));
            } else {
                coupon = getObjectShortened(coupon);
                coupon = await couponService.update(id, {
                    ...coupon,
                    ...data,
                });
                ResponseHandler(res, coupon);
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    remove: async (req, res, next) => {
        try {
            const { id } = req.params;
            let coupon = await couponService.get(id);
            if (checkStatus.remove(coupon)) {
                next(new NotFoundError('Cannot find coupon!'));
            } else if (await couponService.remove(id)) {
                ResponseHandler(res, coupon);
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
};
export default couponController;
