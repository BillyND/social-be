const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      default: "New User",
    },
    about: {
      type: String,
      default: "I'm a new user",
    },
    age: {
      type: Number,
      minlength: 14,
      default: 99,
    },
    email: {
      type: String,
      required: [true, "Required"],
      maxlength: [50, "Must be 50 characters or less"],
      unique: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Required"],
      // select: false,
      minlength: [6, "Must be 6 characters or more"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
      default:
        "https://preview.redd.it/rrz3hmsxcll71.png?width=640&crop=smart&auto=webp&s=87cc5ed38d8f088ef9fffef7a4c5756b64309d6a",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    favorites: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
