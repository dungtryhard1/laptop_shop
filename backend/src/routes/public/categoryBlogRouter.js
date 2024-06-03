import { Router } from 'express';
import categoryBlogController from '../../controller/public/categoryBlogController.js';

const categoryBlogRouter = Router();

categoryBlogRouter.get('/', categoryBlogController.gets);

export default categoryBlogRouter;
