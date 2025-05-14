const {Order, ObjectId, User, GuestUser} = require("../db");

async function gelAllOrders(req, res, next) {

  const orders = await Order.find().populate('items._id').populate('users');

  if (!orders) {
    res.send({ "result": false, orders: [] });
  } else {
    res.send({ "result": true, orders: orders });
  }
}

async function getOrderById(req, res, next) {
  const { id } = req.params;

  try {
    const order = await Order.findOne({ _id: new ObjectId(id) }).populate('items._id').populate('users')

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
    const orders = await Order.find({ users: new ObjectId(id)}).populate('items._id').populate('users')
    res.send({ result: true, data: orders })
  } catch (error) {
    res.send({ result: false, data: [] })
  }
}
async function addNewOrder(req, res, next) {
  const { body: order } = req;
	let guestUser = {};

  if (req._auth) {
    const { id } = req._auth;
  }

  if (!order) {
    return res.send({ "result" : false, data: 'No incoming data!' });
  }

	console.log(order)
	if (!order.users) {
		guestUser = new GuestUser({
			name: order.deliveryInfo.receiver.name,
			lastName: order.deliveryInfo.receiver.lastName,
			surName: order.deliveryInfo.receiver.surName,
			phone: order.deliveryInfo.receiver.phone,
			email: order.deliveryInfo.receiver.email,
			address: {
				city: order.deliveryInfo.address.city,
				street: order.deliveryInfo.address.street,
				house: order.deliveryInfo.address.house,
				apartment: order.deliveryInfo.address.apartment,
				zipCode: order.deliveryInfo.address.zipCode
			},
			isGuest: true
		})

		await guestUser.save();
	} else {
		guestUser = {};
	}

  try {
    const newOrder = await new Order({
			...order,
			users: order.users ? order.users : guestUser._id
		});
    const result = await newOrder.save();

		if (!order.users) {
			await GuestUser.findByIdAndUpdate(guestUser._id, {
				$push: {
					orders: { _id: result._id }
				}
			}, { new: true, runValidators: true});
		} else {
			console.log('result', result)
			await User.findByIdAndUpdate(order.users, {
				$push: {
					orders: { _id: result._id }
				},
			}, { new: true, runValidators: true});
		}

    const data = await Order.findOne({ _id: new ObjectId(result._id)}).populate('items._id').populate('users')

    res.send({ "result" : true, data: data });
  } catch (error) {
    res.send({ "result" : false, data: error });
  }
}
async function updateOrderData(req, res, next) {
  const { body: order } = req;
  const { id } = req.params;

  try {
    const updatedOrder = await Order
			.findByIdAndUpdate({_id: new ObjectId(id)}, { $set: order }, { new: true, runValidators: true})
			.populate('items._id')
			.populate('users')

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
    ).populate('items._id').populate('users');

    res.status(200).send({result: true, data: updatedOrder });
  } catch (error) {
    console.log(error)
    res.status(404).send({result: false, data: `Error: ${error}`})
  }
}
async function removeOrder(req, res, next) {
  const { orderId: id } = req.params;

  try {
    await Order.findOneAndDelete({ _id: new ObjectId(id)} );
		const remainingOrders = await Order.find().populate('items._id').populate('users');
    res.status(200).send({result: true, data: remainingOrders });

  } catch (error) {
    res.status(404).send({result: false, data: `Delete error: ${error}`})
  }
}
async function removeOrderItemById(req, res, next) {
  const { orderId, itemId, color } = req.params;

  try {
    const result = await Order.findOneAndUpdate(
      { _id: new ObjectId(orderId)  },
      { $pull:
          { items: { _id: new ObjectId(itemId), checkedColor: color } }
      },
      { new: true }
    ).populate('items._id').populate('users');

    res.status(200).send({result: true, data: result });

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
