const express = require("express");
// const verifyJWT = require("../middleWare/verifyJWT");
const postController = require("../controllers/postController");

const router = express.Router();

router.post("/create-post", postController.createArticle);

router.put("/update-post", postController.updateArticle);

router.delete("/delete-post", postController.deleteArticle);

router.get("/posts/:email", postController.getArticleByAuthor);

router.get("/posts", postController.getAllArticles);

router.post("/posts/like", postController.likeArticle);

module.exports = router;
