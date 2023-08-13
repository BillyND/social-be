const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/User");

const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexPassword = /^[a-zA-Z0-9!@#$%^&*)(+=._-]{6,}$/g; // At least 6 characters

const getAllUser = async (req, res) => {
  try {
    const allUsers = await Users.find({});
    return res.status(200).json({
      success: true,
      message: "All users fetched successfully.",
      totalUsers: allUsers.length,
      users: allUsers,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const { email, password } = req?.body;
    const trimmedEmail = email?.trim();
    const trimmedPassword = password?.trim();

    const isEmailValid = trimmedEmail && regexEmail.test(trimmedEmail);
    const isPasswordValid =
      trimmedPassword && trimmedPassword.match(regexPassword);

    if (!isEmailValid) {
      return res.status(400).json({
        errCode: 1,
        message: "Invalid email format!",
      });
    }

    if (!isPasswordValid) {
      return res.status(400).json({
        errCode: 1,
        message: "Password must be at least 6 characters long.",
      });
    }

    const hashPassword = await bcrypt.hash(trimmedPassword, 10);

    const atIndex = trimmedEmail.indexOf("@");
    const userName = atIndex !== -1 ? trimmedEmail.substring(0, atIndex) : "";

    const newUser = {
      email: trimmedEmail,
      password: hashPassword,
      name: userName,
      createdAt: new Date(),
    };

    const existingUser = await Users.findOne({ email: trimmedEmail });
    if (existingUser) {
      return res.status(409).json({
        errCode: 1,
        message: "Email already exists!",
      });
    }

    const createdUser = await Users.create(newUser);

    return res.status(201).json({
      errCode: 0,
      message: "Registration successful!",
      data: createdUser,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      message: "Internal server error!",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const trimmedEmail = email?.trim(); // Trim email input

    if (!trimmedEmail || !password) {
      return res.status(400).json({
        errCode: 1,
        message: "Please provide both email and password.",
      });
    }

    const user = await Users.findOne({ email: trimmedEmail });

    if (!user) {
      return res.status(401).json({
        errCode: 1,
        message: "Invalid email or password.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        errCode: 1,
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      { userId: user.id, userEmail: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      errCode: 0,
      message: "Login successful!",
      token: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      errCode: 1,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    const trimmedEmail = email?.trim(); // Trim email input

    if (!trimmedEmail || !oldPassword || !newPassword) {
      return res.status(400).json({
        errCode: 1,
        message: "Please provide email, oldPassword, and newPassword.",
      });
    }

    if (!regexEmail.test(trimmedEmail)) {
      return res.status(400).json({
        errCode: 1,
        message: "Invalid email format!",
      });
    }

    if (!newPassword.match(regexPassword)) {
      return res.status(400).json({
        errCode: 1,
        message: "Password must be at least 6 characters long.",
      });
    }

    const user = await Users.findOne({ email: trimmedEmail });

    if (!user) {
      return res.status(404).json({
        errCode: 1,
        message: "User not found.",
      });
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isOldPasswordValid) {
      return res.status(401).json({
        errCode: 1,
        message: "Invalid old password.",
      });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);

    if (isSamePassword) {
      return res.status(400).json({
        errCode: 1,
        message: "New password must be different from old password.",
      });
    }

    const hashNewPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashNewPassword;
    user.updatedAt = new Date(); // Update updatedAt field
    await user.save();

    return res.status(200).json({
      errCode: 0,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({
      errCode: 1,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const softDeleteUser = async (req, res) => {
  try {
    const { email } = req.body;

    const trimmedEmail = email?.trim(); // Trim email input

    if (!trimmedEmail) {
      return res.status(400).json({
        errCode: 1,
        message: "Please provide email.",
      });
    }

    if (!regexEmail.test(trimmedEmail)) {
      return res.status(400).json({
        errCode: 1,
        message: "Invalid email format!",
      });
    }

    const user = await Users.findOne({ email: trimmedEmail });

    if (!user) {
      return res.status(404).json({
        errCode: 1,
        message: "User not found.",
      });
    }

    user.deleted = true; // Mark the user as deleted
    await user.save();

    return res.status(200).json({
      errCode: 0,
      message: "User marked as deleted.",
    });
  } catch (error) {
    console.error("Soft delete user error:", error);
    return res.status(500).json({
      errCode: 1,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUser,
  registerUser,
  loginUser,
  changePassword,
  softDeleteUser,
};
