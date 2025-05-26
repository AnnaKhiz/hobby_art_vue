const { dbUrl } = require('config');
const { ObjectId, Timestamp} = require('mongodb');
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  login: { type: String, unique: true },
  password: String
});

const OrderSchema = new mongoose.Schema({
  date: {type: String},
  dateCompleted: {type: String},
  totalPrice: {type: Number},
  totalQuantity: {type: Number},
	isOrderCopy: {type: Boolean, required: false},
  deliveryInfo: {
    address: {
      city: {type: String},
      street: {type: String},
      house: {type: String},
      apartment: {type: Number},
      zipCode: {type: Number}
    },
    deliveryMethod: {type: String},
    paymentMethod: {type: String},
    receiver: {
      name: {type: String},
      lastName: {type: String},
      surName: {type: String},
      phone: {type: String},
      email: {type: String},
      isMailing: {type: Boolean}
    },
    userComment: {type: String}
  },
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    default: null,
    // type: new mongoose.Schema({
    //   _id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'users',
    //   },
    // }, { _id: false }),
    // default: {}
  },
  items: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'items',
      },
      price: {type: Number},
      quantity: {type: Number},
      checkedColor: {type: String}
    }
  ]
})

const ItemSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  photo: { type: String },
  price: { type: Number },
  restBalance: { type: Number },
  length: { type: Number },
  brand: { text: String, value: String },
  composition: { text: String, value: String },
  width: { type: Number },
  type: { text: String, value: String },
  isSold: { type: Boolean },
  isDiscount: { type: Boolean },
	isSelected: {type: Boolean},
  discountPercentage: { type: Number },
  color: [
    { text: String, value: String }
  ],
  rating: { type: Number },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comments'
  }],
	users: [
		{
		_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'users',
		},
		isFavorite: {type: Boolean},
	}]
})
const UserSchema = new mongoose.Schema({
  name: { type: String },
  login: {type: String, unique: true },
  lastName: { type: String },
  surName: { type: String },
  birthDate: { type: String },
	avatar: {type: String},
  phone: { type: String },
  email: { type: String, unique: true },
  address: {
    city: {type: String},
    street: {type: String},
    house: {type: String},
    apartment: {type: Number},
    zipCode: {type: Number}
  },
  bonuses: { type: Number },
  mailing: { type: Boolean },
  password: { type: String },
  isPasswordSubmit: { type: Boolean },
  favorites: [
		{
			_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'items',
			},
			isLiked: {type: Boolean}
		},
	],
  orders: [
		{
			_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'orders'
			}
		}],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comments'
  }],
	isGuest: {type: Boolean, required: false }
});
const GuestUserSchema = new mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		default: () => new mongoose.Types.ObjectId()
	},
	name: { type: String },
	login: {
		type: String,
		unique: true,
		required: false,
		default: function() {
			return this._id.toString();
		}
	},
	lastName: { type: String },
	surName: { type: String },
	birthDate: { type: String, required: false },
	phone: { type: String },
	email: { type: String },
	address: {
		city: {type: String},
		street: {type: String},
		house: {type: String},
		apartment: {type: Number},
		zipCode: {type: Number}
	},
	bonuses: { type: Number, required: false },
	mailing: { type: Boolean, required: false },
	password: { type: String, required: false },
	isPasswordSubmit: { type: Boolean, required: false },
	favorites: { type: Array, required: false },
	orders: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'orders',
	}],
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'comments',
		required: false
	}],
	isGuest: {type: Boolean, required: true }
});
const CommentSchema = new mongoose.Schema({
  text: { type: String },
  date: { type: String },
	rating: { type: Number},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'items'
  }
});
const FeedbackSchema = new mongoose.Schema({
	text: { type: String },
	date: { type: String },
	name: { type: String},
	rating: { type: Number},
	user: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	}],
})

UserSchema.pre('findOneAndDelete', async function(next) {
  const query = this.getQuery();

  try {
		const user = await User.findOne(query);

    if (!user) return;

    await mongoose.model('feedback').deleteMany({ _id: { $in: user.comments }})
    await mongoose.model('orders').deleteMany({ _id: { $in: user.orders }})
		await mongoose.model('items').deleteMany({ _id: { $in: user.favorites }})

  } catch (error) {
    next(error);
  }

})

ItemSchema.pre('findOneAndDelete', async function(next) {
  const query = this.getQuery();
  try {
    const item = await Item.findOne(query);

    if (!item) return;

    await mongoose.model('feedback').deleteMany({ _id: { $in: item.comments }})
		await mongoose.model('users').deleteMany({ _id: { $in: item.users }})
  } catch (error) {
    next(error);
  }
})

const Item = mongoose.model('items', ItemSchema);
const User = mongoose.model('users', UserSchema);
const GuestUser = mongoose.model('guest-user', GuestUserSchema);
const Order = mongoose.model('orders', OrderSchema);
const Comment = mongoose.model('comments', CommentSchema);
const Feedback = mongoose.model('feedback', FeedbackSchema);
const Admin = mongoose.model('admins', AdminSchema);

async function init() {
  try {
    await mongoose.connect(dbUrl, { dbName: 'hobby-art' });
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
  Item,
  Admin,
	GuestUser,
	Feedback
};
