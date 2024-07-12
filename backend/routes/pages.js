const express = require('express');
const router = express.Router();
const {  User, ObjectId } = require('../db');
const { hashPass, checkPass, generateJWt } = require('../utils/authEncoding');
const { protectedRoute } = require('../middleware/route');
const { parserJwt } = require('../middleware/auth');
const path = require("path");
router.get('/', async (req, res) => {
  res.send({ "result": "Server started here" })
})

router.get('/user/:id', parserJwt, async (req, res) => {
  const { userId: id } = req._auth;
  console.log(id)
  const user = await User.find( { _id: new ObjectId(id)});

  if (!user) {
    res.send({ "result": false })
  } else {
    res.send({"result": true, "user": user })
  }

})

router.post('/user/login', async (req, res, next) => {
  const { login, password } = req.body;

  console.log( login, password )

  const user = await User.findOne( { login });

  if (!user) {
    return res.send({'result': 'User with such login not found', 'status': 404});
  }

  const result = await checkPass(password, user.password);
  if (!result) {
    return res.send({'result': 'Wrong password', 'status': 404});
  }

  const authData = { role: 'user', userId: user._id.toString() };

  const token = generateJWt(authData);

  res.cookie('token', token, { httpOnly: true });

  // res.redirect(`/user/${user._id.toString()}`)

  res.send({'id': user._id.toString(), 'role': 'user', 'status': 200});
  next();
})


router.post('/register', async (req, res) => {
  try {
    const { body: user } = req;

    const userInfo = {
      ...user,
      birthDate: '',
      address: '',
      bonuses: '',
    }

    const newUser = await new User({
      ...userInfo,
      passwordSubmit: true,
      password: await hashPass(userInfo.password)
    });

    const result = await newUser.save();

    console.log(result)

    req._auth = { role: 'user', id: result._id.toString() };

    const token = generateJWt(req._auth);

    res
      .cookie('token', token, { httpOnly: true })
      .send({"result" : "New user added", "id": result._id.toString(), "token": token})
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


// router.get('/*', parserJwt, async (req, res) => {
//   const { userId: id } = req._auth;
//   console.log(id)
//   const user = await User.find( { _id: new ObjectId(id)});
//
//   if (!user) {
//     res.clearCookie('token');
//     res.redirect('/');
//   } else {
//     res.send({"result": true, "user": user })
//   }
//
// });

module.exports = { router };
