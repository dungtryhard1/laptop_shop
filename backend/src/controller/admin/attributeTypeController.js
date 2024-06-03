import CustomError from '../../outcomes/customError.js';
import NotFoundError from '../../outcomes/notFoundError.js';
import ResponseHandler from '../../outcomes/responseHandler.js';
import attributeTypeService from '../../service/attributeTypeService.js';
import checkStatus from '../../utils/checkStatus.js';
import getObjectShortened from '../../utils/getObjectShortened.js';

const attributeTypeController = {
    create: async (req, res, next) => {
        const { name, description } = req.body;
        try {
            const attributeType = await attributeTypeService.create(
                name,
                description
            );
            ResponseHandler(res, attributeType);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    gets: async (req, res, next) => {
        try {
            const attributeType = await attributeTypeService.gets();
            ResponseHandler(res, attributeType);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    get: async (req, res, next) => {
        try {
            const { id } = req.params;
            let attributeType = await attributeTypeService.get(id);
            if (checkStatus.remove(attributeType)) {
                next(new NotFoundError('Cannot find attributeType!'));
            } else {
                ResponseHandler(res, attributeType);
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;
            let attributeType = await attributeTypeService.get(id);
            if (checkStatus.remove(attributeType)) {
                next(new NotFoundError('Cannot find attributeType!'));
            } else {
                attributeType = getObjectShortened(attributeType);
                attributeType = await attributeTypeService.update(
                    id,
                    {
                        ...attributeType,
                        ...data,
                    }
                );
                ResponseHandler(res, attributeType);
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    remove: async (req, res, next) => {
        try {
            const { id } = req.params;
            let attributeType = await attributeTypeService.get(id);
            if (checkStatus.remove(attributeType)) {
                next(new NotFoundError('Cannot find attributeType!'));
            } else if (
                await attributeTypeService.remove(attributeType)
            ) {
                ResponseHandler(res, attributeType);
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
};
export default attributeTypeController;
