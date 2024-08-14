const express = require('express');
const router = express.Router();
const {  User, ObjectId, Order, Comment, Item, Admin } = require('../db');
const { hashPass, checkPass, generateJWt } = require('../utils/authEncoding');
const { protectedRoute } = require('../middleware/route');
const { parserJwt } = require('../middleware/auth');
const path = require("path");


router.get('/',async (req, res, next) => {
  const orders = await Order.find();

  if (!orders) {
    res.send({ "result": false, orders: [] });
  } else {
    res.send({ "result": true, orders: orders })
  }
})

router.post('/add',  parserJwt, async (req, res, next) => {
  const { body: order } = req;
  const { id } = req._auth;
  console.log(id)

  if (!order) {
    return res.send({ "result" : false, data: 'No incoming data!' })
  }

  if (!id) {
    order.user = {}
  }

  try {
    const newOrder = await new Order(order)

    const result = await newOrder.save()

    res.send({ "result" : true, data: result })
  } catch (error) {
    res.send({ "result" : false, data: error })
  }
})

module.exports = { router };
