const { User, Page, ObjectId, Item, Comment, Order, Admin} = require('../db');
const {checkPass, generateJWt, hashPass} = require("../utils/authEncoding");

async function getAllPages(req, res) {
    const { id } = req._auth;
    const user = await User.find( { _id: new ObjectId(id)});

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

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        path: "/"
      })
      .send({"result" : "New user added", "id": result._id.toString()})

  } catch (error) {
    console.log(error)
    if (error.code === 11000) {
      res.status(401).send({'result': 'User with this email already exist'});
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
    return res.send({"result": false, message: "Wrong passwword", "status": 404});
  }

  const authData = { role: "user", id: user._id.toString() };

  const token = generateJWt(authData);

  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    path: "/"
  });

  res.send({ result: true, id: user._id.toString(), role: "user", status: 200 });
  next();
}
async function logoutUserPage( req, res, next ) {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    path: "/",
  });

  res.send({ "result": "successful" });
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

// admin
async function uploadAdminPage(req,res) {
  const { role } = req._auth;

  if (!role) {
    return res.send({"result": false, role: role})
  }

  const users = await User.find().populate('orders').populate('comments');
  const items = await Item.find().populate('comments');
  const comments = await Comment.find().populate('users').populate('items');
  const orders = await Order.find().populate('users').populate('items._id')

  res.send({"result": true, role: role, data: [users, orders, items]})
}
async function logInToAdminPanel(req, res, next) {
  const { login, password } = req.body;

  const admin = await Admin.findOne( { login });

  const result = await checkPass(password, admin.password);

  if (!result) {
    return res.send({ "result": false})
  }

  req._auth = { role: 'user', id: admin._id.toString() };
  const authData = { role: "admin", id: admin._id.toString() };
  const token = generateJWt(authData);

  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    path: "/admin"
  })

  res.send({ id: admin._id.toString(), role: "admin" });
}

async function logoutFromAdminPanel(req, res, next) {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    path: "/admin",
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
  logoutFromAdminPanel
};
