import { Router } from 'express';
import categoryProductController from '../../controller/public/categoryProductController.js';

const categoryProductRouter = Router();

categoryProductRouter.get('/', categoryProductController.gets);

export default categoryProductRouter;
