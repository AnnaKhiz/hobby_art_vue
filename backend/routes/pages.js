const express = require('express');
const router = express.Router();
const {  User, ObjectId } = require('../db');
const { hashPass, checkPass, generateJWt } = require('../utils/authEncoding');
const { protectedRoute } = require('../middleware/route');
const { parserJwt } = require('../middleware/auth');
router.get('/', async (req, res) => {
  res.send({ "result": "Server started here" })
})

router.get('/user/:id',  parserJwt, async (req, res) => {
  const { id } = req._auth;
  console.log(id)

  const user = await User.find( { _id: new ObjectId(id)});
  console.log(user)

  if (!user) {
    res.send({ "result": "User not found" })
  }
  res.send({"result": "User exist", "user": user})
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


router.get('/*', (req, res) => {
  res.redirect('/');
});

module.exports = { router };