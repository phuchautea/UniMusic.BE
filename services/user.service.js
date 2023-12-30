const userRepository = require("../repositories/user.repository");
const roleService = require("../services/role.service");
const bcrypt = require("bcrypt");

class userService {
	async createUser(userData, role) {
		const { username, password, email } = userData;

		const hashedPassword = await bcrypt.hash(password, 10);

		const userRole = await roleService.getRoleByName(role);

		const user = await userRepository.createUser({
			username,
			password: hashedPassword,
			email,
			role: userRole._id,
		});

		return user;
	}

	async getUserByUsername(username) {
		return userRepository.getUserByUsername(username);
	}

	async getUserById(userId) {
		return userRepository.getUserById(userId);
	}
}

module.exports = new userService();
