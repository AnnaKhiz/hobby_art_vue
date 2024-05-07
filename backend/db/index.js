const { dbUrl } = require('config');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

// const AdminSchema = new mongoose.Schema({
//   login: { type: String, unique: true },
//   password: String
// });

// const PostSchema = new mongoose.Schema({
//   name: { type: String, unique: true },
//   description: String,
//   date: String,
//   author: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'users'
//   },
//   comments: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'comments'
//   }]
// });

const UserSchema = new mongoose.Schema({
  name: { type: String},
  login: {type: String, unique: true},
  lastName: { type: String },
  surName: { type: String },
  birthDate: { type: String },
  phone: { type: String },
  email: { type: String, unique: true },
  address: { type: String },
  bonuses: { type: String },
  mailing: { type: Boolean },
  password: { type: String },
  passwordSubmit: {type: Boolean}
  // posts: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'posts'
  // }],
  // comments: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'comments'
  // }]
});

// const CommentSchema = new mongoose.Schema({
//   text: String,
//   date: String,
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'users'
//   },
//   post: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'posts'
//   }
// });


// PostSchema.pre('findOneAndDelete', async function(next) {
//   const query = this.getQuery();
//
//   try {
//     const post = await Post.findOne(query);
//
//     if (!post) {
//       return;
//     }
//
//     await mongoose.model('comments').deleteMany( { _id: { $in: post.comments }} );
//     next();
//   } catch (error) {
//     next(error);
//   }
// });


// UserSchema.pre('findOneAndDelete', async function(next) {
//   const query = this.getQuery();
//
//   try {
//     const user = await User.findOne(query);
//
//     if (!user) {
//       return;
//     }
//
//     await mongoose.model('posts').deleteMany({ _id: { $in: user.posts } });
//     await mongoose.model('comments').deleteMany({ _id: { $in: user.comments } });
//
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// const Admin = mongoose.model('admins', AdminSchema);
// const Post = mongoose.model('posts', PostSchema);
const User = mongoose.model('users', UserSchema);
// const Comment = mongoose.model('comments', CommentSchema);

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
};