const express = require("express");
const articleController = require("../controllers/articleController");
const verifyJWT = require("../middleWare/verifyJWT");

const router = express.Router();

router.post("/create-article", verifyJWT, articleController.createArticle);

router.put(
  "/update-article/:articleId",
  verifyJWT,
  articleController.updateArticle
);

router.delete(
  "/delete-article/:articleId",
  verifyJWT,
  articleController.deleteArticle
);

router.get("/all-articles", articleController.getAllArticles);

router.get("/all-articles/:email", articleController.getArticleByAuthor);

module.exports = router;
