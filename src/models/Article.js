const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  body: String,
  image: String,
  comments: Array,
  likesCount: Number,
  author: String,
  createdAt: Date,
  updatedAt: Date,
});

const Article = mongoose.model("articles", articleSchema);

module.exports = Article;
