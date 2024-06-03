import Address from '../models/Address.js';
import User from '../models/User.js';

/* eslint-disable no-undef */
const addressService = {
    create: async (data) => {
        const address = await Address.create(data);
        if (address) {
            // Update infomation in User
            await User.updateOne(
                { _id: data.userId },
                { $push: { address: address._id } },
                { new: true }
            );
            return address;
        }
    },
    getsOfUser: async (userId) => {
        return await Address.find({ userId });
    },
    gets: async () => {
        return await Address.find().populate('userId');
    },
    get: async (id) => {
        return await Address.findById(id);
    },
    update: async (_id, data) => {
        const preAddress = await Address.findById(_id);
        const address = await Address.findOneAndUpdate(
            { _id },
            data,
            { new: true }
        );
        if (address) {
            if (address.userId !== preAddress.userId) {
                // Add address in user
                await User.updateOne(
                    { _id: address.userId },
                    { $push: { address: address._id } }
                );
                return address;
            }
        }
    },
    remove: async (data) => {
        return await Address.findOneAndUpdate(
            { _id: data._id },
            { $set: { isDeleted: true } },
            { new: true }
        );
    },
};

export default addressService;
