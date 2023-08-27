const express = require("express");
// const verifyJWT = require("../middleWare/verifyJWT");
const postController = require("../controllers/postController");

const router = express.Router();

router.post("/create-post", postController.createPost);

router.put("/update-post", postController.updatePost);

router.delete("/delete-post", postController.deletePost);

router.get("/posts/:email", postController.getPostByAuthor);

router.get("/posts", postController.getAllPosts);

router.post("/posts/like", postController.likePost);

module.exports = router;
