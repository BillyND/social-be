const express = require("express");
const articleController = require("../controllers/articleController");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

// router.get("/articles", articleController.);
router.post("/create-article", verifyJWT, articleController.createArticle);

module.exports = router;
