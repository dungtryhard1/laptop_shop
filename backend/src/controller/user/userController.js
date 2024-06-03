import CustomError from '../../outcomes/customError.js';
import NotFoundError from '../../outcomes/notFoundError.js';
import ResponseHandler from '../../outcomes/responseHandler.js';
import userService from '../../service/userService.js';
import checkStatus from '../../utils/checkStatus.js';
import getObjectShortened from '../../utils/getObjectShortened.js';

const userController = {
    get: async (req, res, next) => {
        try {
            const { id } = req.params;
            let user = await userService.findById(id);
            if (checkStatus.remove(user)) {
                next(new NotFoundError('Cannot find user!'));
            } else {
                ResponseHandler(res, user);
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;
            let user = await userService.findById(id);
            if (checkStatus.remove(user)) {
                next(new NotFoundError('Cannot find user!'));
            } else {
                user = getObjectShortened(user);
                user = await userService.update(id, {
                    ...user,
                    ...data,
                });
                ResponseHandler(res, user);
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
};

export default userController;
