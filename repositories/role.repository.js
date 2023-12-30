const roleModel = require("../models/role.model");

class RoleRepository {
    async getAll() {
        return roleModel.find();
    }

    async getRoleByName(name) {
        return roleModel.findOne({ name: name });
    }

    async getRoleById(id) {
        return roleModel.findOne({ _id: id });
    }

    async getRolesList(page, perPage) {
        const pageNum = parseInt(page, 10);
        const perPageNum = parseInt(perPage, 10);
        const skip = (pageNum - 1) * perPageNum;

        const roles = await roleModel.find({}).skip(skip).limit(perPageNum);
        const totalCount = await roleModel.countDocuments();
        const totalPages = Math.ceil(totalCount / perPageNum);
        const isLastPage = pageNum >= totalPages;

        return {
            roles,
            totalCount,
            totalPages,
            isLastPage,
        };
    }
}

module.exports = new RoleRepository();