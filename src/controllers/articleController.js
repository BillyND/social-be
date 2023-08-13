const Article = require("../models/Article");
const User = require("../models/User");

// const createArticle = async (req, res) => {
//   try {
//     const { body, image } = req.body.article;
//     const email = req.body.email;
//     const trimmedEmail = email?.trim(); // Trim email input

//     const author = await Users.findOne({ email: trimmedEmail });

//     if (!author) {
//       return res.status(404).json({
//         errCode: 2,
//         message: "Author not found!",
//       });
//     }

//     const newArticle = {
//       body,
//       image,
//       author: author._id,
//       createdAt: new Date(),
//     };

//     const createdArticle = await Article.create(newArticle);

//     return res.status(201).json({
//       errCode: 0,
//       message: "Article created successfully!",
//       data: createdArticle,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       errCode: 1,
//       message: "Internal server error!",
//       error: error.message,
//     });
//   }
// };

// const deleteArticle = async (req, res) => {
//   try {
//     const articleId = req.params.articleId; // Assuming you pass article ID as a parameter
//     const email = req.body.email;
//     const trimmedEmail = email?.trim(); // Trim email input

//     const author = await Users.findOne({ email: trimmedEmail });

//     if (!author) {
//       return res.status(404).json({
//         errCode: 2,
//         message: "Author not found!",
//       });
//     }

//     const deletedArticle = await Article.findOneAndDelete({
//       _id: articleId,
//       author: author._id,
//     });

//     if (!deletedArticle) {
//       return res.status(404).json({
//         errCode: 3,
//         message: "Article not found or you don't have permission to delete it.",
//       });
//     }

//     return res.status(200).json({
//       errCode: 0,
//       message: "Article deleted successfully!",
//       data: deletedArticle,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       errCode: 1,
//       message: "Internal server error!",
//       error: error.message,
//     });
//   }
// };

// const updateArticle = async (req, res) => {
//   try {
//     const { body, image } = req.body.article;
//     const trimmedBody = body?.trim(); // Trim body input
//     const trimmedImage = image?.trim(); // Trim image input

//     const articleId = req.params.articleId?.trim(); // Trim articleId input
//     const email = req.body.email;
//     const trimmedEmail = email?.trim(); // Trim email input

//     const author = await Users.findOne({ email: trimmedEmail });

//     if (!author) {
//       return res.status(404).json({
//         errCode: 2,
//         message: "Author not found!",
//       });
//     }

//     const updatedArticle = await Article.findOneAndUpdate(
//       {
//         _id: articleId,
//         author: author._id,
//       },
//       {
//         body: trimmedBody,
//         image: trimmedImage,
//         updatedAt: new Date(),
//       },
//       { new: true }
//     );

//     if (!updatedArticle) {
//       return res.status(404).json({
//         errCode: 3,
//         message: "Article not found or you don't have permission to edit it.",
//       });
//     }

//     return res.status(200).json({
//       errCode: 0,
//       message: "Article updated successfully!",
//       data: updatedArticle,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       errCode: 1,
//       message: "Internal server error!",
//       error: error.message,
//     });
//   }
// };

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({
      updatedAt: -1,
      createdAt: -1,
    });

    return res.status(200).json({
      errCode: 0,
      message: "Articles retrieved successfully!",
      data: articles,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      message: "Internal server error!",
      error: error.message,
    });
  }
};

const getArticleByAuthor = async (req, res) => {
  try {
    const email = req.params.email; // Use params.email to get the author's email
    const trimmedEmail = email?.trim(); // Trim email input

    const author = await Users.findOne({ email: trimmedEmail });

    if (!author) {
      return res.status(404).json({
        errCode: 2,
        message: "Author not found!",
      });
    }

    let articlesByAuthor = await Article.find({ author: author._id }).sort({
      createdAt: -1,
    });

    // If no updatedAt is available, sort by createdAt
    if (articlesByAuthor.length === 0) {
      articlesByAuthor = await Article.find({ author: author._id }).sort({
        createdAt: -1,
      });
    }

    return res.status(200).json({
      errCode: 0,
      message: "Articles by author retrieved successfully!",
      data: articlesByAuthor,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      message: "Internal server error!",
      error: error.message,
    });
  }
};

module.exports = {
  // createArticle,
  // deleteArticle,
  // updateArticle,
  getAllArticles,
  getArticleByAuthor,
};
