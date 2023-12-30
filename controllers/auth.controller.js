const userService = require("../services/user.service");
const authService = require("../services/auth.service");
const roleService = require("../services/role.service");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/jwt.config");

class authController {
	async register(req, res) {
		try {
			const userData = req.body;
			const role = 'user';
			const newUser = await userService.createUser(userData, role);
			res.json({
				user: newUser,
				message: "User registered successfully",
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal server error" });
		}
	}

	async login(req, res) {
		try {
			const { username, password } = req.body;
			const user = await authService.authenticateUser(username, password);

			if (!user) {
				return res.status(401).json({ message: "Invalid credentials" });
			}

			const role = await roleService.getRoleById(user.role);
            const roleName = role ? role.name : null;

			const token = jwt.sign({ userId: user._id, email: user.email, role: roleName }, secretKey, {
				expiresIn: "1h",
			});

			res.json({ user, token });
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal server error" });
		}
	}
}

module.exports = new authController();
