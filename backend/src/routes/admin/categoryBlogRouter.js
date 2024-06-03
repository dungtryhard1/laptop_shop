import { Router } from 'express';
import validate from '../../middlewares/validate.js';
import categoryBlogController from '../../controller/admin/categoryBlogController.js';
import categoryBlogValidator from '../../validators/Admin/categoryBlogValidator.js';

const categoryBlogRouter = Router();

// create
categoryBlogRouter.post(
    '/',
    validate(categoryBlogValidator.create),
    categoryBlogController.create
);
categoryBlogRouter.get('/', categoryBlogController.gets);
categoryBlogRouter.get('/:id', categoryBlogController.get);
categoryBlogRouter.put(
    '/:id',
    validate(categoryBlogValidator.update),
    categoryBlogController.update
);
categoryBlogRouter.delete('/:id', categoryBlogController.remove);

export default categoryBlogRouter;
