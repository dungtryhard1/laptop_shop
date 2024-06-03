class baseService {
    constructor(model) {
        this.model = model;
    }
    async adminGet(id, field) {
        if (field) {
            return await this.model
                .findOne({
                    _id: id,
                    isDeleted: false,
                })
                .populate(field);
        } else {
            return await this.model.findOne({
                _id: id,
                isDeleted: false,
            });
        }
    }
    async userGet(id, field) {
        if (field) {
            return await this.model
                .findOne({
                    _id: id,
                    isDeleted: false,
                    isHidden: false,
                })
                .populate(field);
        } else {
            return await this.model.findOne({
                _id: id,
                isDeleted: false,
                isHidden: false,
            });
        }
    }
    async adminGets(field) {
        if (field) {
            return await this.model
                .find({ isDeleted: false })
                .populate(field);
        } else {
            return await this.model.find({ isDeleted: false });
        }
    }
    async userGets(field) {
        if (field) {
            return await this.model
                .find({
                    isDeleted: false,
                    isHidden: false,
                })
                .populate(field);
        } else {
            return await this.model.find({
                isDeleted: false,
                isHidden: false,
            });
        }
    }
    async update(id, data) {
        return await this.model.findOneAndUpdate({ _id: id }, data, {
            new: true,
        });
    }
    async remove(id) {
        return await this.model.findOneAndUpdate(
            { _id: id },
            { $set: { isDeleted: true } },
            { new: true }
        );
    }
}
export default baseService;
