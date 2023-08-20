const express = require("express");
const verifyJWT = require("../middleWare/verifyJWT");
const {
  createArticle,
  updateArticle,
  deleteArticle,
  getAllArticles,
  getArticleByAuthor,
  likeArticle,
} = require("../controllers/postController");

const router = express.Router();

router.post("/create-post", verifyJWT, createArticle);

router.put("/update-post", verifyJWT, updateArticle);

router.delete("/delete-post", verifyJWT, deleteArticle);

router.get("/posts/:email", getArticleByAuthor);

router.get("/posts", getAllArticles);

router.post("/posts/like", verifyJWT, likeArticle);

module.exports = router;
