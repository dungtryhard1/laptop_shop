import CustomError from '../../outcomes/customError.js';
import ResponseHandler from '../../outcomes/responseHandler.js';
import couponService from '../../service/couponService.js';

const couponController = {
    search: async (req, res, next) => {
        try {
            const { code } = req.params;
            const coupon = await couponService.searchByCode(code);

            ResponseHandler(res, coupon);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
};
export default couponController;
