import CustomError from '../../outcomes/customError.js';
import ResponseHandler from '../../outcomes/responseHandler.js';
import userService from '../../service/userService.js';
import getObjectShortened from '../../utils/getObjectShortened.js';

const userController = {
    gets: async (req, res, next) => {
        try {
            const data = req.query;
            const users = await userService.getsAdmin(data);
            ResponseHandler(res, users);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    get: async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await userService.getAdmin(id);
            ResponseHandler(res, user);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    active: async (req, res, next) => {
        try {
            const { id } = req.params;
            let user = await userService.findById(id);
            if (user.status === 'active') {
                user.status = 'block';
            } else {
                user.status = 'active';
            }
            user = getObjectShortened(user);
            user = await userService.update(id, user);
            ResponseHandler(res, user);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
};
export default userController;
