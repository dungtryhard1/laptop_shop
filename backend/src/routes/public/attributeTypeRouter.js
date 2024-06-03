import { Router } from 'express';
import attributeTypeController from '../../controller/public/attributeTypeController.js';

const attributeTypeRouter = Router();

// create
attributeTypeRouter.get('/', attributeTypeController.gets);

export default attributeTypeRouter;
