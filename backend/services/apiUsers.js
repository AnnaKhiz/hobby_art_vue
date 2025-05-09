const { User, Page, ObjectId, Item, Comment, Order, Admin} = require('../db');
const { checkPass, generateJWt, hashPass } = require("../utils/authEncoding");
const isProd = process.env.NODE_ENV === 'production';
async function deleteOneUser(req, res) {
  const { id } = req.params;
  const result = await User.findOneAndDelete({ _id: new ObjectId(id) });

  !result
    ? res.status(404).send({ 'result': 'User not found' })
    : res.status(200).send(result);
}
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

// admin
async function uploadAdminPage(req,res) {
	const { role } = req._auth;

	if (!role) {
		return res.send({"result": false, role: role})
	}

	const users = await User.find().populate('orders').populate('comments').populate('favorites._id');
	const items = await Item.find().populate('comments').populate('users._id');
	const comments = await Comment.find().populate('users').populate('items');
	const orders = await Order.find().populate('users').populate('items._id');

	res.send({"result": true, role: role, data: [users, orders, items]})
}
async function logInToAdminPanel(req, res, next) {
	const { login, password } = req.body;
	console.log(login, password)

	const admin = await Admin.findOne( { login });

	const result = await checkPass(password, admin.password);

	if (!result) {
		return res.send({ result: false})
	}

	req._auth = { role: 'user', id: admin._id.toString() };
	const authData = { role: "admin", id: admin._id.toString() };
	const token = generateJWt(authData);

	res.cookie('token', token, {
		httpOnly: true,
		secure: isProd,
		sameSite: isProd ? 'None' : 'Lax',
		path: '/admin',
		expires: new Date(Date.now() + 86400000)
	})

	res.send({ result: true, id: admin._id.toString(), role: "admin" });
}

async function logoutFromAdminPanel(req, res, next) {
	res.clearCookie('token', {
		httpOnly: true,
		secure: isProd,
		sameSite: isProd ? 'None' : 'Lax',
		path: '/admin',
		expires: new Date(Date.now() + 86400000)
	});

	res.send({ "result": true });
	next();
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
	toggleFavorites
};
