import { Router } from 'express';
import attributeController from '../../controller/public/attributeController.js';

const attributeRouter = Router();

// create
attributeRouter.get('/', attributeController.gets);

export default attributeRouter;
