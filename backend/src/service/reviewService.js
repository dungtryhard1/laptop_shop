import OrderItem from '../models/OrderItem.js';
import Review from '../models/Review.js';

const reviewService = {
    create: async (data) => {
        const review = await Review.create(data);
        if (review) {
            await OrderItem.findOneAndUpdate(
                { _id: data.orderItemId },
                { $set: { reviewId: review._id } }
            );
        }
        return review;
    },
};
export default reviewService;
