const Post = require("../models/Post");
const User = require("../models/User");

const postController = {
  createPost: async (req, res) => {
    try {
      const { body, image } = req.body.post;
      const email = req.body.email;
      const trimmedEmail = email.trim(); // Trim email input

      const author = await User.findOne({ email: trimmedEmail });

      if (!author) {
        return res.status(404).json({
          errCode: 2,
          message: "Author not found!",
        });
      }

      const newPost = {
        body,
        image,
        author: author._id,
        createdAt: new Date(),
      };

      const createdPost = await Post.create(newPost);

      return res.status(201).json({
        errCode: 0,
        message: "Post created successfully!",
        data: createdPost,
      });
    } catch (error) {
      return res.status(500).json({
        errCode: 1,
        message: "Internal server error!",
        error: error.message,
      });
    }
  },

  deletePost: async (req, res) => {
    try {
      const postId = req.params.postId; // Assuming you pass post ID as a parameter
      const email = req.body.email;
      const trimmedEmail = email.trim(); // Trim email input

      const author = await User.findOne({ email: trimmedEmail });

      if (!author) {
        return res.status(404).json({
          errCode: 2,
          message: "Author not found!",
        });
      }

      const deletedPost = await Post.findOneAndDelete({
        _id: postId,
        author: author._id,
      });

      if (!deletedPost) {
        return res.status(404).json({
          errCode: 3,
          message: "Post not found or you don't have permission to delete it.",
        });
      }

      return res.status(200).json({
        errCode: 0,
        message: "Post deleted successfully!",
        data: deletedPost,
      });
    } catch (error) {
      return res.status(500).json({
        errCode: 1,
        message: "Internal server error!",
        error: error.message,
      });
    }
  },

  updatePost: async (req, res) => {
    try {
      const { body, image } = req.body.post;
      const trimmedBody = body.trim(); // Trim body input
      const trimmedImage = image.trim(); // Trim image input

      const postId = req.params.postId.trim(); // Trim postId input
      const email = req.body.email;
      const trimmedEmail = email.trim(); // Trim email input

      const author = await User.findOne({ email: trimmedEmail });

      if (!author) {
        return res.status(404).json({
          errCode: 2,
          message: "Author not found!",
        });
      }

      const updatedPost = await Post.findOneAndUpdate(
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

      if (!updatedPost) {
        return res.status(404).json({
          errCode: 3,
          message: "Post not found or you don't have permission to edit it.",
        });
      }

      return res.status(200).json({
        errCode: 0,
        message: "Post updated successfully!",
        data: updatedPost,
      });
    } catch (error) {
      return res.status(500).json({
        errCode: 1,
        message: "Internal server error!",
        error: error.message,
      });
    }
  },

  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find().sort({
        updatedAt: -1,
        createdAt: -1,
      });

      return res.status(200).json({
        errCode: 0,
        message: "Posts retrieved successfully!",
        data: posts,
      });
    } catch (error) {
      return res.status(500).json({
        errCode: 1,
        message: "Internal server error!",
        error: error.message,
      });
    }
  },

  getPostByAuthor: async (req, res) => {
    const email = req.params.email; // Use req.body.email to get the author's email
    const trimmedEmail = email.trim(); // Trim email input

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
        message: "Posts by author retrieved successfully!",
        data: postsByAuthor,
      });
    } catch (error) {
      return res.status(500).json({
        errCode: 1,
        message: "Internal server error!",
        error: error.message,
      });
    }
  },

  likePost: async (req, res) => {
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
  },
};

module.exports = postController;
