const express = require('express');
const router = express.Router();
const {  User, ObjectId, Order, Comment, Item, Admin } = require('../db');
const { hashPass, checkPass, generateJWt } = require('../utils/authEncoding');
const { protectedRoute } = require('../middleware/route');
const { parserJwt } = require('../middleware/auth');
const path = require("path");

router.get('/', async (req, res, next) => {
  const items = await Item.find();

  if (!items) {
    res.send({ "result": false, items: [] });
  } else {
    res.send({ "result": true, items: items })
  }
})
router.post('/add', async (req, res, next) => {
  const { body: item } = req;

  if (!item) return;

  try {
    const newItem = await new Item(item)

    const result = await newItem.save()

    res.send({ "result" : true, data: result })
  } catch (error) {
    res.send({ "result" : false, data: error })
  }
})



module.exports = { router };
