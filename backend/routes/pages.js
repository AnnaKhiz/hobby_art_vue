const express = require('express');
const router = express.Router();
const {  User, ObjectId, Order, Comment, Item, Admin } = require('../db');
const { hashPass, checkPass, generateJWt } = require('../utils/authEncoding');
const { protectedRoute } = require('../middleware/route');
const { parserJwt } = require('../middleware/auth');
const path = require("path");
router.get('/', async (req, res) => {
  res.send({ "result": "Server started here" })
})

router.get('/user', parserJwt, async (req, res) => {
  console.log(req._auth)

  const { id } = req._auth;
  console.log(id)

  const user = await User.find( { _id: new ObjectId(id)});

  if (!user) {
    res.send({ "result": false })
  }
  console.log(user)
  user[0].password = ''
  console.log('user', user)
  res.send({"result": true, "user": user })




  // const { id } = req._auth;
  // const user = await User.find( { _id: new ObjectId(id)});
  //
  // if (!user) {
  //   res.send({ "result": false })
  // } else {
  //   user[0].password = ''
  //   console.log('user', user)
  //   res.send({"result": true, "user": user })
  // }
})

router.get('/user/logout',  (req, res, next) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    path: "/",

  });
  res.send({"result": "successful"})
  next()
})
router.post('/user/login', async (req, res, next) => {
  const { login, password } = req.body;

  console.log( login, password )

  const admin = await Admin.findOne( { login })

  if (admin) {
    const result = await checkPass(password, admin.password);

    if (!result) {
      return res.send({ "result": "Wrong password"})
    }

    req._auth = { role: 'user', id: admin._id.toString() };
    const authData = { role: "admin", id: admin._id.toString() };
    const token = generateJWt(authData);
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      path: "/"
    } )

    res.send({ id: admin._id.toString(), role: "admin" })

  } else {
    const user = await User.findOne( { login });

    if (!user) {
      return res.send({'result': false, 'status': 404});
    }

    const result = await checkPass(password, user.password);

    if (!result) {
      return res.send({'result': 'Wrong password', 'status': 404});
    }

    const authData = { role: 'user', id: user._id.toString() };

    const token = generateJWt(authData);

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      path: "/"
    });

    // res.redirect(`/user/${user._id.toString()}`)

    res.send({result: true, id: user._id.toString(), role: "user", status: 200});
    next();
  }

})


router.post('/register', async (req, res) => {
  try {
    const { body: user } = req;

    const userInfo = {
      ...user,
      birthDate: '',
      address: '',
      bonuses: 0,
      favorites: [],
      orders: [],
      comments: []
    }

    console.log('userInfo', userInfo)

    const newUser = await new User({
      ...userInfo,
      isPasswordSubmit: true,
      password: await hashPass(userInfo.password)
    });

    const result = await newUser.save();

    console.log(result)

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
      // .redirect(`http://localhost:8080/user/${result._id.toString()}`)


    console.log(`token` + token)
    // res.send({"result" : "New user added", "id": result._id.toString(), "token": token})

  } catch (error) {
    console.log(error)
    if (error.code === 11000) {
      res.status(401).send({'result': 'User with this email already exist'});
    }
  }
})

// ADMIN PAGE
router.get('/admin', parserJwt, protectedRoute(['admin']), async (req,res) => {

  console.log('req._auth 2', req._auth)
  const { role } = req._auth;

  if (!role) {
    return res.send({"result": false, role: role})
  }

  const users = await User.find().populate('orders').populate('comments');
  const items = await Item.find().populate('comments');
  const comments = await Comment.find().populate('users').populate('items');
  const orders = await Order.find().populate('users').populate('items')

  res.send({"result": true, role: role})

  // res.redirect('http://localhost:8080/admin/login')
  // res.render('admin_home', { users, items, comments, orders, role });
  // res.render('/admin', { users, items, comments, orders, role });

});

router.patch('/user/edit', parserJwt, async (req, res, next) => {
  const { id } = req._auth;
  const { body: newUser } = req;

  if (newUser.password) {
    newUser.password = await hashPass(newUser.password)
  }

  console.log('user object for editing', newUser)

  const user = await User.find( { _id: new ObjectId(id)});

  if (!user) {
    res.send({"result" : "User not found"})
  }

  try {
    const updatedUser = await User.findOneAndUpdate({ _id: new ObjectId(id)}, newUser, { new: true })
    res.send({"result": updatedUser})
  } catch (error) {
    console.log('update user error', error)
  }
})

// router.get('/admin/login', async (req, res, next) => {
//   res.send({"result": true})
//
//
// })

router.post('/admin/login', async (req, res, next) => {
  const { login, password } = req.body;

  console.log( login, password )

  const admin = await Admin.findOne( { login })


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
  } )

  res.send({ id: admin._id.toString(), role: "admin" })

})


router.get('/admin/logout',  (req, res, next) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    path: "/admin",

  });
  res.send({"result": true})
  next()
})
// router.get('/admin/login', (req, res) => {
//   res.sendFile(path.resolve(path.join(__dirname, '../../frontend/dist'), 'index.html'));
// });


module.exports = { router };
