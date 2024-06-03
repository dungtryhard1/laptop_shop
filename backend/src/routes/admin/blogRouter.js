import { Router } from 'express';
import blogValidator from '../../validators/Admin/blogValidator.js';
import blogController from '../../controller/admin/blogController.js';
import validate from '../../middlewares/validate.js';
import parser from '../../lib/cloudinary.js';

const blogRouter = Router();

// create
blogRouter.post(
    '/',
    parser.array('images'),
    validate(blogValidator.create),
    blogController.create
);
blogRouter.get('/', blogController.gets);
blogRouter.get('/:id', blogController.get);
blogRouter.put(
    '/:id',
    parser.array('images'),
    validate(blogValidator.update),
    blogController.update
);
blogRouter.delete('/:id', blogController.remove);

export default blogRouter;
