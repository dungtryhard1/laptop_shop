import Coupon from '../models/Coupon.js';
import baseService from './baseService.js';

const couponService = {
    create: async (data) => {
        const blog = await Coupon.create(data);
        if (blog) {
            return blog;
        }
    },
    gets: async () => {
        return await new baseService(Coupon).adminGets();
    },
    searchByCode: async (code) => {
        return await Coupon.findOne({
            code,
            isHidden: false,
            isDeleted: false,
        });
    },

    get: async (id) => {
        return await Coupon.findById(id);
    },
    findByCode: async (code) => {
        return await Coupon.findOne({ code });
    },
    update: async (id, data) => {
        const blog = await Coupon.findOneAndUpdate(
            { _id: id },
            data,
            {
                new: true,
            }
        );
        if (blog) {
            return blog;
        }
    },
    remove: async (_id) => {
        return await Coupon.findOneAndUpdate(
            { _id },
            { $set: { isDeleted: true } },
            { new: true }
        );
    },
};

export default couponService;
