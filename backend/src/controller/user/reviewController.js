import CustomError from '../../outcomes/customError.js';
import NotFoundError from '../../outcomes/notFoundError.js';
import ResponseHandler from '../../outcomes/responseHandler.js';
import orderItemService from '../../service/orderItemService.js';
import reviewService from '../../service/reviewService.js';
import checkStatus from '../../utils/checkStatus.js';

const convertFormatImage = (files) => {
    return files.map((image, index) => {
        return {
            url: image.path,
            publicId: image.filename,
            caption: image.name,
            isMain: index === 0,
        };
    });
};

const reviewController = {
    create: async (req, res, next) => {
        try {
            const data = req.body;
            data.orderItemId = req.params.id;
            data.userId = req.userId;
            let images = req?.files
                ? convertFormatImage(req.files)
                : null;
            if (images) {
                data.images = images;
            }

            const orderItem = await orderItemService.get(
                data.orderItemId
            );

            if (await checkStatus.remove(orderItem)) {
                next(
                    new NotFoundError('Cannot find supplierProduct!')
                );
            } else if (
                orderItem.orderId.orderStatus.find(
                    (item) => item.status === 'success'
                )
            ) {
                const review = await reviewService.create(data);
                ResponseHandler(res, review);
            } else {
                next(new CustomError('Order not success!', 400));
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
};

export default reviewController;
