const Article = require("../modals/Article");
const Users = require("../modals/User");

const createArticle = async (req, res) => {
  try {
    const { body, image } = req.body.article;
    const email = req.body.email;
    const trimmedEmail = email?.trim(); // Trim email input

    const author = await Users.findOne({ email: trimmedEmail });

    const newArticle = {
      body,
      image,
      author: author._id,
      createdAt: new Date(),
    };

    const createdArticle = await Article.create(newArticle);

    return res.status(201).json({
      errCode: 0,
      message: "Article created successfully!",
      data: createdArticle,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      message: "Internal server error!",
      error: error.message,
    });
  }
};

module.exports = { createArticle };
