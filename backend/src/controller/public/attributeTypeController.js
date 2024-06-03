import ResponseHandler from '../../outcomes/responseHandler.js';
import CustomError from '../../outcomes/customError.js';
import attributeTypeService from '../../service/attributeTypeService.js';
import attributeService from '../../service/attributeService.js';

const attributeTypeController = {
    gets: async (rep, res, next) => {
        try {
            const attributeType =
                await attributeTypeService.getsPublic();
            for (
                let index = 0;
                index < attributeType.length;
                index++
            ) {
                const element = attributeType[index];
                attributeType[index] = {
                    ...attributeType[index]._doc,
                    attribute: await attributeService.getByKey(
                        element._id
                    ),
                };
            }
            ResponseHandler(res, attributeType);
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
};
export default attributeTypeController;
