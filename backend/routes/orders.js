const express = require('express');
const router = express.Router();
const { parserJwt } = require('../middleware/auth');
const {
  gelAllOrders,
  addNewOrder,
  updateOrderData,
  updateOrderItemById,
  removeOrder,
  removeOrderItemById,
  getOrderById
  } = require('../services/apiOrders');

router.get('/', gelAllOrders );
router.get('/:id', getOrderById);

router.post('/add',  parserJwt, addNewOrder );

router.patch('/update/:id',updateOrderData );
router.patch('/update/:orderId/:itemId', updateOrderItemById );

router.delete('/remove/:orderId', removeOrder );
router.delete('/remove/:orderId/:itemId', removeOrderItemById);

module.exports = { router };
