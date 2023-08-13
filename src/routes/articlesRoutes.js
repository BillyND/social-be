const express = require("express");
// const verifyJWT = require("../middleWare/verifyJWT");
const {
  // createArticle,
  // updateArticle,
  // deleteArticle,
  getAllArticles,
  getArticleByAuthor,
} = require("../controllers/articleController");

const router = express.Router();

// router.post("/create-article", verifyJWT, createArticle);

// router.put("/update-article/:articleId", verifyJWT, updateArticle);

// router.delete("/delete-article/:articleId", verifyJWT, deleteArticle);

router.get("/all-articles/:email", getArticleByAuthor);

router.get("/all-articles", getAllArticles);

router.get("/test", (req, res) => {
  res.send("Test article routes");
});

module.exports = router;
