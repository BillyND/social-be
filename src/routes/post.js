const express = require("express");
const verifyJWT = require("../middleWare/verifyJWT");
const postController = require("../controllers/postController");

const router = express.Router();

router.post("/create-post", verifyJWT, postController.createArticle);

router.put("/update-post", verifyJWT, postController.updateArticle);

router.delete("/delete-post", verifyJWT, postController.deleteArticle);

router.get("/posts/:email", postController.getArticleByAuthor);

router.get("/posts", postController.getAllArticles);

router.post("/posts/like", verifyJWT, postController.likeArticle);

module.exports = router;
