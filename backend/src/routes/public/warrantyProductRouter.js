import { Router } from 'express';
import warrantyProductController from '../../controller/public/warrantyProductController.js';

const warrantyProductRouter = Router();

warrantyProductRouter.get('/', warrantyProductController.gets);

export default warrantyProductRouter;
