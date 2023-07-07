const mongoose = require('mongoose');

const UserPost = new mongoose.Schema({
  title: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  body: String,
  isActive: {
    default: true,
    type: Boolean
  },
  latitude: String,
  longitude: String,
});

const Post = mongoose.model('Post', UserPost);
module.exports = Post