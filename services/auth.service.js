const userService = require("./user.service");
const bcrypt = require("bcrypt");

class authService {
	async authenticateUser(username, password) {
		const user = await userService.getUserByUsername(username);

		if (!user) {
			return null;
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		return isPasswordValid ? user : null;
	}
}

module.exports = new authService();
