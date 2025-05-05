const {User} = require("../db");

async function checkDuplicateUser(req, res, next) {
	const { login } = req.body;

	const user = await User.findOne( { login });

	if (user) {
		return res.send({"result": false, "status": 409});
	}
	next();
}

module.exports = { checkDuplicateUser }
