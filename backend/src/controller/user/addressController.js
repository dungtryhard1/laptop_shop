import CustomError from '../../outcomes/customError.js';
import NotFoundError from '../../outcomes/notFoundError.js';
import ResponseHandler from '../../outcomes/responseHandler.js';
import addressService from '../../service/addressService.js';
import userService from '../../service/userService.js';
import checkStatus from '../../utils/checkStatus.js';
import getObjectShortened from '../../utils/getObjectShortened.js';

const addressController = {
    create: async (req, res, next) => {
        const data = req.body;
        data.userId = req.userId;
        try {
            let user = await userService.findById(data.userId);
            if (!user) {
                next(new NotFoundError('Cannot find user!'));
            } else {
                const blog = await addressService.create(data);
                if (blog) {
                    ResponseHandler(res, blog);
                }
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    gets: async (req, res, next) => {
        try {
            const address = await addressService.getsOfUser(
                req.userId
            );
            ResponseHandler(res, address);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    get: async (req, res, next) => {
        try {
            const { id } = req.params;
            let address = await addressService.get(id);
            if (checkStatus.remove(address)) {
                next(new NotFoundError('Cannot find address!'));
            } else {
                ResponseHandler(res, address);
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;
            data.userId = req.userId;
            let address = await addressService.get(id);
            if (checkStatus.remove(address)) {
                next(new NotFoundError('Cannot find address!'));
            } else if (data?.userId) {
                let user = await userService.findById(data.userId);
                if (checkStatus.remove(user)) {
                    next(new NotFoundError('Cannot find user!'));
                }
            }
            address = getObjectShortened(address);
            address = await addressService.update(id, {
                ...address,
                ...data,
                createdAt: null,
            });
            ResponseHandler(res, address);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    remove: async (req, res, next) => {
        try {
            const { id } = req.params;
            let address = await addressService.get(id);
            if (checkStatus.remove(address)) {
                next(new NotFoundError('Cannot find address!'));
            } else if (await addressService.remove(id)) {
                ResponseHandler(res, address);
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
};
export default addressController;
