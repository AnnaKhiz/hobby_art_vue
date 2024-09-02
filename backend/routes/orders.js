const express = require('express');
const router = express.Router();
const {  User, ObjectId, Order, Comment, Item, Admin } = require('../db');
const { hashPass, checkPass, generateJWt } = require('../utils/authEncoding');
const { protectedRoute } = require('../middleware/route');
const { parserJwt } = require('../middleware/auth');
const path = require("path");


router.get('/', async (req, res, next) => {
  const orders = await Order.find().populate('items._id')

  if (!orders) {
    res.send({ "result": false, orders: [] });
  } else {
    res.send({ "result": true, orders: orders })
  }
})

router.post('/add',  parserJwt, async (req, res, next) => {
  const { body: order } = req;


  if (req._auth) {
    const { id } = req._auth;
    console.log(id)
  }

  if (!order) {
    return res.send({ "result" : false, data: 'No incoming data!' })
  }

  try {
    const newOrder = await new Order(order)

    const result = await newOrder.save()

    res.send({ "result" : true, data: result })
  } catch (error) {
    res.send({ "result" : false, data: error })
  }
})

router.patch('/update/:id',async (req, res, next) => {
  const { body: order } = req;
  const { id } = req.params;

  try {
    const updatedOrder = await Order.findByIdAndUpdate({_id: new ObjectId(id)}, { $set: order }, { new: true, runValidators: true})

    res.status(200).send({result: true, data: updatedOrder });
  } catch (error) {
    console.log(error)
    res.status(404).send({result: false, data: `Error: ${error}`})
  }

})

router.patch('/update/:orderId/:itemId',async (req, res, next) => {
  const { body: itemsInfo } = req;
  const { orderId, itemId } = req.params;

  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: new ObjectId(orderId), "items._id": new ObjectId(itemId) },
    { $set: {
                      "items.$.quantity": itemsInfo.quantity,
                      "items.$.price": itemsInfo.price,
                      totalPrice: itemsInfo.totalPrice,
                      totalQuantity: itemsInfo.totalQuantity
                    }
            },
    { new: true, runValidators: true}
    );

    res.status(200).send({result: true, data: updatedOrder });
  } catch (error) {
    console.log(error)
    res.status(404).send({result: false, data: `Error: ${error}`})
  }

})

router.delete('/remove/:orderId', async (req, res, next) => {
  const { orderId: id } = req.params;

  try {
    await Order.findOneAndDelete({ _id: new ObjectId(id)} )
    res.status(200).send({result: true });

  } catch (error) {
    res.status(404).send({result: false, data: `Delete error: ${error}`})
  }
})

module.exports = { router };
