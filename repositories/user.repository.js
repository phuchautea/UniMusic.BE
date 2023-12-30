const userModel = require("../models/user.model");

class userRepository {
	async createUser(userData) {
		return userModel.create(userData);
	}

	async getUserByUsername(username) {
		return userModel.findOne({ username });
	}

	async getUserById(userId) {
		return userModel.findById(userId);
	}
}

module.exports = new userRepository();
