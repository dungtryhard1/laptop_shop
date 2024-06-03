import AttributeKey from '../models/AttributeKey.js';

/* eslint-disable no-undef */
const attributeTypeService = {
    create: async (name, description) => {
        return await AttributeKey.create({
            name,
            description: description ?? '',
        });
    },
    gets: async () => {
        return await AttributeKey.find({
            isDeleted: false,
        });
    },
    getsPublic: async () => {
        return await AttributeKey.find({
            isDeleted: false,
            isHidden: false,
        });
    },
    get: async (id) => {
        return await AttributeKey.findOne({ _id: id });
    },
    update: async (_id, data) => {
        return await AttributeKey.findOneAndUpdate({ _id }, data, {
            new: true,
        });
    },
    remove: async (attributeType) => {
        return await AttributeKey.findOneAndUpdate(
            { _id: attributeType._id },
            { $set: { isDeleted: true } },
            { new: true }
        );
    },
};

export default attributeTypeService;
