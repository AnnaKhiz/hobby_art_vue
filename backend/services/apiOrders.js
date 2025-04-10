const {Order, ObjectId} = require("../db");

async function gelAllOrders(req, res, next) {

  const orders = await Order.find().populate('items._id')

  if (!orders) {
    res.send({ "result": false, orders: [] });
  } else {
    res.send({ "result": true, orders: orders });
  }
}

async function getOrderById(req, res, next) {
  const { id } = req.params;

  try {
    const order = await Order.findOne({ _id: new ObjectId(id) }).populate('items._id')

    res.status(200).send({result: true, data: order });
  } catch (error) {
    console.log(error)
    res.status(404).send({result: false, data: `Error: ${error}`})
  }
}


async function getUserOrdersById(req, res, next) {
  console.log('req auth', req._auth)
  const { id } = req._auth;
  console.log(id)

  try {
    const orders = await Order.find({ users: new ObjectId(id)}).populate('items._id')
    console.log(orders)
    res.send({ result: true, data: orders })
  } catch (error) {
    res.send({ result: false, data: [] })
  }
}
async function addNewOrder(req, res, next) {
  const { body: order } = req;

  if (req._auth) {
    const { id } = req._auth;
  }

  if (!order) {
    return res.send({ "result" : false, data: 'No incoming data!' });
  }

  try {
    const newOrder = await new Order(order);
    const result = await newOrder.save();
    const data = await Order.findOne({ _id: new ObjectId(result._id)}).populate('items._id')

    res.send({ "result" : true, data: data });
  } catch (error) {
    res.send({ "result" : false, data: error });
  }
}
async function updateOrderData(req, res, next) {
  const { body: order } = req;
  const { id } = req.params;

  try {
    const updatedOrder = await Order.findByIdAndUpdate({_id: new ObjectId(id)}, { $set: order }, { new: true, runValidators: true})

    res.status(200).send({result: true, data: updatedOrder });
  } catch (error) {
    console.log(error)
    res.status(404).send({result: false, data: `Error: ${error}`})
  }
}
async function updateOrderItemById(req, res, next) {
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
}
async function removeOrder(req, res, next) {
  const { orderId: id } = req.params;

  try {
    await Order.findOneAndDelete({ _id: new ObjectId(id)} )
    res.status(200).send({result: true });

  } catch (error) {
    res.status(404).send({result: false, data: `Delete error: ${error}`})
  }
}
async function removeOrderItemById(req, res, next) {
  const { orderId, itemId } = req.params;

  try {
    await Order.findOneAndUpdate(
      { _id: new ObjectId(orderId)  },
      { $pull:
          { items: { _id: new ObjectId(itemId) } }
      },
      { new: true }
    );

    res.status(200).send({result: true });

  } catch (error) {
    res.status(404).send({result: false, data: `Delete error: ${error}`})
  }
}

module.exports = {
  gelAllOrders,
  addNewOrder,
  updateOrderData,
  updateOrderItemById,
  removeOrder,
  removeOrderItemById,
  getUserOrdersById,
  getOrderById,
}
