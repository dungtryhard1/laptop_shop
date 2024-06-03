import express from 'express';
import categoryProductRouter from './categoryProductRouter.js';
import warrantyProductRouter from './warrantyProductRouter.js';
import supplierProductRouter from './supplierProductRouter.js';
import categoryBlogRouter from './categoryBlogRouter.js';
import productRouter from './productRouter.js';
import attributeTypeRouter from './attributeTypeRouter.js';
import attributeRouter from './attributeRouter.js';
import blogRouter from './blogRouter.js';
import couponRouter from './couponRouter.js';
import userRouter from './userRouter.js';
import orderRouter from './orderRouter.js';
import totalRouter from './totalRouter.js';

const adminRouter = express.Router();

adminRouter.use('/category-product', categoryProductRouter);
adminRouter.use('/warranty-product', warrantyProductRouter);
adminRouter.use('/supplier-product', supplierProductRouter);
adminRouter.use('/product', productRouter);
adminRouter.use('/category-blog', categoryBlogRouter);
adminRouter.use('/attribute-type', attributeTypeRouter);
adminRouter.use('/attribute', attributeRouter);
adminRouter.use('/blog', blogRouter);
adminRouter.use('/coupon', couponRouter);
adminRouter.use('/user', userRouter);
adminRouter.use('/order', orderRouter);
adminRouter.use('/total', totalRouter);

export default adminRouter;
