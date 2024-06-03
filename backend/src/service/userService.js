import User from '../models/User.js';

const userService = {
    gets: async () => {
        return await User.find();
    },
    findByEmail: async (email) => {
        return await User.findOne({
            email,
        });
    },
    findById: async (id) => {
        return await User.findById(id);
    },
    getAdmin: async (_id) => {
        return await User.findOne({
            _id,
        })
            .populate('address')
            .populate('order');
    },
    getsAdmin: async ({
        username,
        email,
        sortName,
        sortPrice,
        page,
        perPage,
    }) => {
        const query = {};

        // Search by name
        if (username) query.username = new RegExp(username, 'i');
        if (email) query.email = new RegExp(email, 'i');
        query.role = 'user';
        // Sorting
        const sortCriteria = {};
        if (sortName)
            sortCriteria.username = sortName === 'asc' ? 1 : -1;
        if (sortPrice)
            sortCriteria.price = sortPrice === 'asc' ? 1 : -1;
        // Pagination
        const pageNumber = page ? parseInt(page, 10) : 1;
        const pageSize = perPage ? parseInt(perPage, 10) : 10;
        const skip = (pageNumber - 1) * pageSize;
        const totalCount = await User.countDocuments(query);
        const users = await User.find(query)
            .sort(sortCriteria)
            .skip(skip)
            .limit(pageSize)
            .populate('address')
            .populate('order');
        return { users, totalCount };
    },
    findByUsername: async (username) => {
        return await User.findOne({
            username: username,
        });
    },

    create: async (username, email, phoneNumber, password) => {
        return await User.create({
            username,
            email,
            phoneNumber,
            password,
        });
    },
    updateOTP: async (id, otp) => {
        const user = await User.findById(id);
        user.set({
            confirmationCode: otp,
            confirmationCodExpired: new Date(),
        });
        return await user.save();
    },
    verifyCusses: async (id) => {
        const user = await User.findById(id);
        user.set({
            status: 'active',
            confirmationCode: '',
            confirmationCodExpired: '',
        });
        return await user.save();
    },

    update: async (id, data) => {
        const user = User.findOneAndUpdate({ _id: id }, data, {
            new: true,
        });
        return user;
    },
};

export default userService;
