import { Router } from 'express';
import supplierProductController from '../../controller/public/supplierProductController.js';

const supplierProductRouter = Router();

supplierProductRouter.get('/', supplierProductController.gets);

export default supplierProductRouter;
