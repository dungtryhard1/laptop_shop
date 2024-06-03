import { Router } from 'express';
import blogController from '../../controller/public/blogController.js';

const blogRouter = Router();

blogRouter.get('/', blogController.gets);
blogRouter.get('/:id', blogController.get);

export default blogRouter;
