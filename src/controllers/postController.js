const Post = require("../models/Post");
const User = require("../models/User");

const createArticle = async (req, res) => {
  try {
    const { body, image } = req.body.post;
    const email = req.body.email;
    const trimmedEmail = email?.trim(); // Trim email input

    const author = await User.findOne({ email: trimmedEmail });

    if (!author) {
      return res.status(404).json({
        errCode: 2,
        message: "Author not found!",
      });
    }

    const newArticle = {
      body,
      image,
      author: author._id,
      createdAt: new Date(),
    };

    const createdArticle = await Post.create(newArticle);

    return res.status(201).json({
      errCode: 0,
      message: "Post created successfully!",
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

const deleteArticle = async (req, res) => {
  try {
    const postId = req.params.postId; // Assuming you pass post ID as a parameter
    const email = req.body.email;
    const trimmedEmail = email?.trim(); // Trim email input

    const author = await User.findOne({ email: trimmedEmail });

    if (!author) {
      return res.status(404).json({
        errCode: 2,
        message: "Author not found!",
      });
    }

    const deletedArticle = await Post.findOneAndDelete({
      _id: postId,
      author: author._id,
    });

    if (!deletedArticle) {
      return res.status(404).json({
        errCode: 3,
        message: "Post not found or you don't have permission to delete it.",
      });
    }

    return res.status(200).json({
      errCode: 0,
      message: "Post deleted successfully!",
      data: deletedArticle,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      message: "Internal server error!",
      error: error.message,
    });
  }
};

const updateArticle = async (req, res) => {
  try {
    const { body, image } = req.body.post;
    const trimmedBody = body?.trim(); // Trim body input
    const trimmedImage = image?.trim(); // Trim image input

    const postId = req.params.postId?.trim(); // Trim postId input
    const email = req.body.email;
    const trimmedEmail = email?.trim(); // Trim email input

    const author = await User.findOne({ email: trimmedEmail });

    if (!author) {
      return res.status(404).json({
        errCode: 2,
        message: "Author not found!",
      });
    }

    const updatedArticle = await Post.findOneAndUpdate(
      {
        _id: postId,
        author: author._id,
      },
      {
        body: trimmedBody,
        image: trimmedImage,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({
        errCode: 3,
        message: "Post not found or you don't have permission to edit it.",
      });
    }

    return res.status(200).json({
      errCode: 0,
      message: "Post updated successfully!",
      data: updatedArticle,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      message: "Internal server error!",
      error: error.message,
    });
  }
};

const getAllArticles = async (req, res) => {
  try {
    const posts = await Post.find().sort({
      updatedAt: -1,
      createdAt: -1,
    });

    return res.status(200).json({
      errCode: 0,
      message: "Articles retrieved successfully!",
      data: posts,
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
  const email = req.params.email; // Use req.body.email to get the author's email
  const trimmedEmail = email?.trim(); // Trim email input

  try {
    const author = await User.findOne({ email: trimmedEmail });

    if (!author) {
      return res.status(404).json({
        errCode: 2,
        message: "Author not found!",
      });
    }

    let postsByAuthor = await Post.find({ author: author._id }).sort({
      createdAt: -1,
    });

    // If no updatedAt is available, sort by createdAt
    if (postsByAuthor.length === 0) {
      postsByAuthor = await Post.find({ author: author._id }).sort({
        createdAt: -1,
      });
    }

    return res.status(200).json({
      errCode: 0,
      message: "Articles by author retrieved successfully!",
      data: postsByAuthor,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      message: "Internal server error!",
      error: error.message,
    });
  }
};

const likeArticle = async (req, res) => {
  try {
    const postId = req.body.postId; // Use req.body.postId to get the post ID
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: "Post already liked" });
    }

    post.likes.push(userId);
    await post.save();

    res.status(200).json({ message: "Post liked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createArticle,
  deleteArticle,
  updateArticle,
  getAllArticles,
  getArticleByAuthor,
  likeArticle,
};
