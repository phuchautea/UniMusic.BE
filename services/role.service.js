const roleRepository = require("../repositories/role.repository");

class RoleService {
    async getAllRoles() {
        return roleRepository.getAll();
    }

    async getRoleByName(name) {
        return roleRepository.getRoleByName(name);
    }

    async getRoleById(id) {
        return roleRepository.getRoleById(id);
    }

    async getRolesList(page, perPage) {
        return roleRepository.getRolesList(page, perPage);
    }

}

module.exports = new RoleService();