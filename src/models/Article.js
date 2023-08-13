const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  body: String,
  image: String,
  comments: Array,
  likesCount: Number,
  author: String,
  createdAt: Date,
  updatedAt: Date,
  deleted: {
    type: Boolean,
    default: false,
  },
});

const Article = mongoose.model("article", articleSchema);

module.exports = Article;
