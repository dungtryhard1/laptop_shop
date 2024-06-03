import { Router } from 'express';
import reviewController from '../../controller/user/reviewController.js';
import validate from '../../middlewares/validate.js';
import reviewValidator from '../../validators/User/reviewValidator.js';
import parser from '../../lib/cloudinary.js';

const reviewRouter = Router();
reviewRouter.post(
    '/:id',
    parser.array('images'),
    validate(reviewValidator.create),
    reviewController.create
);
export default reviewRouter;
