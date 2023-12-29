const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/jwt.config");

const authenticateJWT =
	(options = {}) =>
	(req, res, next) => {
		const token = req.header("Authorization");

		if (!token) {
			if (options.optional) {
				// No token provided, but authentication is optional
				return next();
			} else {
				return res
					.status(401)
					.json({ message: "Unauthorized - Missing token" });
			}
		}

		jwt.verify(token, secretKey, (err, user) => {
			if (err) {
				return res
					.status(403)
					.json({ message: "Forbidden - Invalid token" });
			}

			// Check if the user has the required role if specified
			if (options.requiredRole && user.role !== options.requiredRole) {
				return res
					.status(403)
					.json({ message: "Forbidden - Insufficient privileges" });
			}

			req.user = user;
			next();
		});
	};

module.exports = authenticateJWT;
