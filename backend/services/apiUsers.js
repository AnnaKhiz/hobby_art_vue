const { User, Page, ObjectId, Item, Order, Admin, Feedback} = require('../db');
const { checkPass, generateJWt, hashPass } = require("../utils/authEncoding");
const { getFeedbackList } = require("./apiFeedback");
const isProd = process.env.NODE_ENV === 'production';
async function getAllPages(req, res) {
	const { id } = req._auth;
	const user = await User
		.find( { _id: new ObjectId(id)})
		.populate('orders')
		.populate('comments')
		.populate('favorites._id');

	if (!user.length) {
		return res.send({ "result": false });
	}

	user[0].password = '';
	res.send({ "result": true, "user": user });
}

async function registerNewUser(req, res) {
	try {
		const { body: user } = req;

		const userInfo = {
			...user,
			birthDate: '',
			surName: user.surName || '',
			address: {},
			bonuses: 0,
			avatar: 'no_user.jpg',
			favorites: [],
			orders: [],
			comments: []
		}

		const newUser = await new User({
			...userInfo,
			isPasswordSubmit: true,
			password: await hashPass(userInfo.password)
		});

		const result = await newUser.save();

		req._auth = { role: 'user', id: result._id.toString() };

		const token = generateJWt(req._auth);

		res.cookie('token', token, {
				httpOnly: true,
				secure: isProd,
				sameSite: isProd ? 'None' : 'Lax',
				path: '/',
				expires: new Date(Date.now() + 86400000)
			});

		res.send({
			"result" : true,
			"id": result._id.toString()
		})

	} catch (error) {
		console.log(error)
		if (error.code === 11000) {
			res.status(401).send({'result': false});
		}
	}
}
async function logInUserPage(req, res, next) {
	const { login, password } = req.body;
	const user = await User.findOne( { login });

	if (!user) {
		return res.send({"result": false, "status": 404});
	}

	const result = await checkPass(password, user.password);

	if (!result) {
		return res.send({"result": false, message: "Wrong password", "status": 404});
	}
	const userFullData = await User
		.findOne( { _id: user._id})
		.populate('orders')
		.populate('comments')
		.populate('favorites._id');

	const authData = { role: "user", id: user._id.toString() };

	const token = generateJWt(authData);

	res.cookie('token', token, {
		httpOnly: true,
		secure: isProd,
		sameSite: isProd ? 'None' : 'Lax',
		path: '/',
		expires: new Date(Date.now() + 86400000)
	});

	res.send({
		result: true,
		id: user._id.toString(),
		user: userFullData,
		role: "user",
		status: 200
	});
	next();
}
async function logoutUserPage( req, res, next ) {
	res.clearCookie('token', {
		httpOnly: true,
		secure: isProd,
		sameSite: isProd ? 'None' : 'Lax',
		path: '/',
	});

	res.send({ "result": true });
	next();
}
async function updateUserInfo(req, res, next) {
	const { id } = req._auth;
	const { body: newUser } = req;

	if (newUser.password) {
		newUser.password = await hashPass(newUser.password)
	}

	const user = await User.find( { _id: new ObjectId(id)});

	if (!user) {
		res.send({"result" : "User not found"})
	}

	try {
		const updatedUser = await User.findByIdAndUpdate({ _id: new ObjectId(id)}, { $set: newUser }, { new: true, runValidators: true} )
		res.send({ "result": updatedUser })
	} catch (error) {
		console.log('update user error', error)
	}
}

async function toggleFavorites(req, res, next) {
	const { id } = req._auth;
	const { id: favoriteId, isLiked } = req.body;

	const user = await User.findById({ _id: new ObjectId(id)});

	if (!user) {
		res.send({result : false, data: "User not found"});
	}

	const isDuplicated = user.favorites.some(el => el._id.toString() === favoriteId);

	try {
		let updatedUser = {};

		if (isDuplicated) {
			// update user favorites - isLiked state
			updatedUser = await User.findOneAndUpdate(
				{ _id: new ObjectId(id), "favorites._id": new ObjectId(favoriteId) },
				{ $set: { "favorites.$.isLiked": isLiked } },
				{ new: true }
			).populate('favorites._id');

			// update items users - isFavorite state
			await Item.findOneAndUpdate(
				{ _id: new ObjectId(favoriteId), "users._id": new ObjectId(id) },
				{ $set: { "users.$.isFavorite": isLiked } },
				{ new: true }
			)

			return res.send({ "result": true, data: updatedUser })
		}
		// update user favorites - add favorite item to array
		updatedUser = await User.findByIdAndUpdate({
			_id: new ObjectId(id)},
			{ $push: { "favorites": { _id: new ObjectId(favoriteId), isLiked }}},
			{ new: true, runValidators: true}).populate('favorites._id')

		// update item users - add user item to array
		await Item.findOneAndUpdate({
				_id: new ObjectId(favoriteId)},
			{ $push: { "users": { _id: new ObjectId(id), isFavorite: isLiked } } },
			{ new: true, runValidators: true }
		)

		res.send({ "result": true, data: updatedUser })
	} catch (error) {
		console.log('Add favorite item to user error', error)
	}
}

// ADMIN
async function uploadAdminPage(req,res) {
	const { role } = req._auth;

	if (!role) {
		return res.send({"result": false, role: role})
	}

	const users = await User.find().populate('orders').populate('comments').populate('favorites._id');
	const items = await Item.find().populate('comments').populate('users._id');
	const orders = await Order.find().populate('users').populate('items._id');

	res.send({"result": true, role: role, data: [users, orders, items]})
}
async function logInToAdminPanel(req, res, next) {
	const { login, password } = req.body;

	const admin = await Admin.findOne( { login });

	const result = await checkPass(password, admin.password);

	if (!result) {
		return res.send({ result: false })
	}

	req._auth = { role: 'admin', id: admin._id.toString() };

	const authData = { role: "admin", id: admin._id.toString() };
	const token = generateJWt(authData);

	res.cookie('token', token, {
		httpOnly: true,
		secure: isProd,
		sameSite: isProd ? 'None' : 'Lax',
		path: '/',
		expires: new Date(Date.now() + 86400000)
	})

	res.send({ result: true, id: admin._id.toString(), role: "admin" });
}

async function logoutFromAdminPanel(req, res, next) {
	res.clearCookie('token', {
		httpOnly: true,
		secure: isProd,
		sameSite: isProd ? 'None' : 'Lax',
		path: '/',
		expires: new Date(Date.now() + 86400000)
	});

	res.send({ "result": true });
	next();
}

async function getAllUsers(req, res) {
	const { role } = req._auth;

	if (!role) {
		return res.send({"result": false, "users": [], role: role});
	}

	try {
		const users = await User
			.find()
			.populate('orders._id')
			.populate('comments')
			.populate('favorites._id');

		if (!users.length) {
			return res.send({ "result": false, "users": [] });
		}

		res.send({ "result": true, "users": users });
	} catch (error) {
		console.error('Error getting users list', error);
		res.status(404).send({ "result": false, "users": [] });
	}

}

async function deleteOneUser(req, res) {
	const { role } = req._auth;

	if (!role) {
		return res.send({result: false, users: [], role: role});
	}

	const { id } = req.params;

	try {
		const result = await User.findOneAndDelete({ _id: new ObjectId(id) });
		res.send({ result: true, users: result });
	} catch (error) {
		console.error('Error removing user', error);
		res.status(404).send({ result: false, users: [] });
	}
}

async function getAllFeedbacks(req, res) {
	const { role } = req._auth;

	if (!role) {
		return res.send({"result": false, "users": [], role: role});
	}

	try {
		const result = await Feedback.find().populate('user');
		res.send({result: true, data: result})
	} catch (error) {
		console.log('Error in getting feedbacks', error);
		res.status(404).send({result: false, data: []});
	}
}
async function updateFeedbackText(req, res) {
	const { id } = req.params;
	const { body: feedback } = req;

	try {
		const result = await Feedback.findOneAndUpdate(
			{ _id: new ObjectId(id)},
			{ $set: feedback },
			{ new: true, runValidators: true} )
			.populate('user');

		if (!result) {
			return res.send({result: true, data: []});
		}

		res.send({result: true, data: result})
	} catch (error) {
		console.log('Error updating feedback by ID', error);
		res.status(404).send({result: false, data: []})
	}
}
async function deleteFeedbackById(req, res) {
	const { role } = req._auth;

	if (!role) {
		return res.send({result: false, data: [], role: role});
	}
	const { id } = req.params;

	try {
		const result = await Feedback.findOneAndDelete({ _id: new ObjectId(id)}).populate('user');
		console.log(result)

		if (!result) {
			return res.send({result: true, data: {}});
		}

		res.send({result: true, data: result});
	} catch (error) {
		console.log('Error deleting feedback by ID', error);
		res.status(404).send({result: false, data: {}});
	}

}

module.exports = {
	getAllPages,
	registerNewUser,
	logInUserPage,
	logoutUserPage,
	uploadAdminPage,
	updateUserInfo,
	logInToAdminPanel,
	logoutFromAdminPanel,
	deleteOneUser,
	toggleFavorites,
	getAllUsers,
	getAllFeedbacks,
	deleteFeedbackById,
	updateFeedbackText
};
