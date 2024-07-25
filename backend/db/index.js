const { dbUrl } = require('config');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  itemCode: { type: String },
  date: { type: String },
  timeCreated: { type: String},
  dateCompleted: { type: String},
  total: { type: Number},
  totalItems: { type: Number},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'items'
  }]
})
const ItemSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  photo: { type: String },
  price: { type: Number },
  restBalance: { type: Number },
  isSold: { type: Boolean },
  isDiscount: { type: Boolean },
  discountPercentage: { type: Number },
  color: [{ type: String }],
  rating: { type: Number },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comments'
  }],
})
const UserSchema = new mongoose.Schema({
  name: { type: String },
  login: {type: String, unique: true },
  lastName: { type: String },
  surName: { type: String },
  birthDate: { type: String },
  phone: { type: String },
  email: { type: String, unique: true },
  address: { type: String },
  bonuses: { type: String },
  mailing: { type: Boolean },
  password: { type: String },
  isPasswordSubmit: { type: Boolean },
  favorites: { type: Array },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'orders'
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comments'
  }],
});
const CommentSchema = new mongoose.Schema({
  text: { type: String },
  date: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'items'
  }
});

UserSchema.pre('findOneAndDelete', async function(next) {
  const query = this.getQuery();

  try {
    const comment = await Comment.findOne(query);

    if (!comment) return;

    const order = await Order.findOne(query);

    if (!order) return;

    await mongoose.model('comments').deleteMany({ _id: { $in: user.comments }})
    await mongoose.model('orders').deleteMany({ _id: { $in: user.orders }})

  } catch (error) {
    next(error);
  }

})

ItemSchema.pre('findOneAndDelete', async function(next) {
  const query = this.getQuery();
  try {
    const item = await Item.findOne(query);

    if (!item) return;

    await mongoose.model('comments').deleteMany({ _id: { $in: item.comments }})
  } catch (error) {
    next(error);
  }
})

const Item = mongoose.model('items', ItemSchema);
const User = mongoose.model('users', UserSchema);
const Order = mongoose.model('orders', OrderSchema);
const Comment = mongoose.model('comments', CommentSchema);

async function init() {
  try {
    await mongoose.connect('mongodb://localhost:27017', { dbName: 'hobby-art' });
    console.log('Mongo DB connected');
  } catch (error) {
    console.log('Mongo DB did not connected');
    console.log(error);
    process.exit(1);
  }
}

init();

module.exports = {
  ObjectId,
  User,
  Order,
  Comment,
  Item
};
