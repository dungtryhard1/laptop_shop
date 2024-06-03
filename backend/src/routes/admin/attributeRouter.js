import { Router } from 'express';
import attributeController from '../../controller/admin/attributeController.js';

const attributeRouter = Router();

// create
attributeRouter.get('/', attributeController.gets);

export default attributeRouter;
