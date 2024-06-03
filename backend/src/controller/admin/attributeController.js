import ResponseHandler from '../../outcomes/responseHandler.js';
import CustomError from '../../outcomes/customError.js';
import attributeService from '../../service/attributeService.js';

const attributeController = {
    gets: async (rep, res, next) => {
        try {
            const attribute = await attributeService.gets();
            ResponseHandler(res, attribute);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
};
export default attributeController;
