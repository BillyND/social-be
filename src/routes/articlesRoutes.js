const express = require("express");
const verifyJWT = require("../middleWare/verifyJWT");
const {
  createArticle,
  updateArticle,
  deleteArticle,
  getAllArticles,
  getArticleByAuthor,
  likeArticle,
} = require("../controllers/articleController");

const router = express.Router();

router.post("/create-article", verifyJWT, createArticle);

router.put("/update-article", verifyJWT, updateArticle);

router.delete("/delete-article", verifyJWT, deleteArticle);

router.get("/articles-by-email", getArticleByAuthor);

router.get("/all-articles", getAllArticles);

router.post("/articles/like", verifyJWT, likeArticle);

module.exports = router;
