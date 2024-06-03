import NotFoundError from '../../outcomes/notFoundError.js';
import couponService from '../../service/couponService.js';
import productService from '../../service/productService.js';
import userService from '../../service/userService.js';
import checkStatus from '../../utils/checkStatus.js';

const checkCoupon = async (id) => {
    const data = await couponService.get(id);
    return checkStatus.remove(data);
};

const blogMiddlewares = {
    create: async (req, res, next) => {
        const data = req.body;
        const messages = [];
        //  check couponId
        if (data.couponId) {
            if (await checkCoupon(data.couponId)) {
                messages.push('Cannot find coupon!');
            }
        }

        const user = await userService.findById(data.userId);
        // check user
        if (checkStatus.remove(user)) {
            messages.push('Cannot find user!');
        }

        //  check address
        if (!user.address.includes(data.addressId)) {
            messages.push('Cannot find address!');
        }

        // check have attributeKey
        for (let orderItem of data.orderItem) {
            const product = await productService.get(
                orderItem.productId
            );
            if (checkStatus.remove(product)) {
                messages.push('Cannot find product!');
                break;
            } else if (product.stockQuantity < orderItem.quantity) {
                messages.push(
                    `${product.name} quantity is not enough!`
                );
                break;
            }
        }

        //  check shippingDate and estimatedArrivalDate
        if (data.shippingDate > data.estimatedArrivalDate) {
            messages.push(
                'shippingDate must before estimatedArrivalDate!'
            );
        }

        if (messages.length === 0) {
            next();
        } else {
            next(new NotFoundError(messages));
        }
    },
};
export default blogMiddlewares;
