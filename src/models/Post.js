const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  body: String,
  image: String,
  comments: Array,
  likesCount: Number,
  likes: Array,
  author: String,
  createdAt: Date,
  updatedAt: Date,
  deleted: {
    type: Boolean,
    default: false,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
