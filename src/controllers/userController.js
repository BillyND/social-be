var bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { regexEmail, regexPassword } = require("../constant");
const User = require("../models/User");

const userController = {
  //GET A USER
  // getUserById: async (req, res) => {
  //   try {
  //     const user = await User.findById(req.params.id);
  //     res.status(200).json(user);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },
  // //REGISTER
  // registerUser: async (req, res) => {
  //   // try {
  //   // const { email, password } = req?.body;
  //   // const trimmedEmail = email?.trim();
  //   // const trimmedPassword = password?.trim();
  //   // const isEmailValid = trimmedEmail && regexEmail.test(trimmedEmail);
  //   // const isPasswordValid =
  //   //   trimmedPassword && trimmedPassword.match(regexPassword);
  //   // if (!isEmailValid) {
  //   //   return res.status(400).json({
  //   //     errCode: 1,
  //   //     message: "Invalid email format!",
  //   //   });
  //   // }
  //   // if (!isPasswordValid) {
  //   //   return res.status(400).json({
  //   //     errCode: 1,
  //   //     message: "Password must be at least 6 characters long.",
  //   //   });
  //   // }
  //   // const salt = await bcrypt.genSaltSync(10);
  //   // const hashPassword = await bcrypt.hashSync(trimmedPassword, salt);
  //   // const atIndex = trimmedEmail.indexOf("@");
  //   // const userName = atIndex !== -1 ? trimmedEmail.substring(0, atIndex) : "";
  //   // const newUser = {
  //   //   email: trimmedEmail,
  //   //   password: hashPassword,
  //   //   username: userName,
  //   // };
  //   // const existingUser = await User.findOne({ email: trimmedEmail });
  //   // if (existingUser) {
  //   //   return res.status(409).json({
  //   //     errCode: 1,
  //   //     message: "Email already exists!",
  //   //   });
  //   // }
  //   // const createdUser = await User.create(newUser);
  //   // return res.status(201).json({
  //   //   errCode: 0,
  //   //   message: "Registration successful!",
  //   //   data: createdUser,
  //   // });
  //   // } catch (error) {
  //   //   return res.status(500).json({
  //   //     errCode: 1,
  //   //     message: "Internal server error!",
  //   //     error: error.message,
  //   //   });
  //   // }
  // },
  // loginUser: async (req, res) => {
  //   try {
  //     const { email, password } = req.body;
  //     const trimmedEmail = email?.trim(); // Trim email input
  //     if (!trimmedEmail || !password) {
  //       return res.status(400).json({
  //         errCode: 1,
  //         message: "Please provide both email and password.",
  //       });
  //     }
  //     const user = await User.findOne({ email: trimmedEmail });
  //     if (!user) {
  //       return res.status(401).json({
  //         errCode: 1,
  //         message: "Invalid email or password.",
  //       });
  //     }
  //     const isPasswordValid = bcrypt.compareSync(password, user.password);
  //     if (!isPasswordValid) {
  //       return res.status(401).json({
  //         errCode: 1,
  //         message: "Invalid email or password.",
  //       });
  //     }
  //     const token = jwt.sign(
  //       { userId: user.id, userEmail: user.email },
  //       process.env.ACCESS_TOKEN_SECRET,
  //       {
  //         expiresIn: "1h",
  //       }
  //     );
  //     return res.status(200).json({
  //       errCode: 0,
  //       message: "Login successful!",
  //       token: token,
  //     });
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     return res.status(500).json({
  //       errCode: 1,
  //       message: "Internal server error.",
  //       error: error.message,
  //     });
  //   }
  // },
  // changePassword: async (req, res) => {
  //   try {
  //     const { email, oldPassword, newPassword } = req.body;
  //     const trimmedEmail = email?.trim(); // Trim email input
  //     if (!trimmedEmail || !oldPassword || !newPassword) {
  //       return res.status(400).json({
  //         errCode: 1,
  //         message: "Please provide email, oldPassword, and newPassword.",
  //       });
  //     }
  //     if (!regexEmail.test(trimmedEmail)) {
  //       return res.status(400).json({
  //         errCode: 1,
  //         message: "Invalid email format!",
  //       });
  //     }
  //     if (!newPassword.match(regexPassword)) {
  //       return res.status(400).json({
  //         errCode: 1,
  //         message: "Password must be at least 6 characters long.",
  //       });
  //     }
  //     const user = await User.findOne({ email: trimmedEmail });
  //     if (!user) {
  //       return res.status(404).json({
  //         errCode: 1,
  //         message: "User not found.",
  //       });
  //     }
  //     const isOldPasswordValid = bcrypt.compareSync(oldPassword, user.password);
  //     if (!isOldPasswordValid) {
  //       return res.status(401).json({
  //         errCode: 1,
  //         message: "Invalid old password.",
  //       });
  //     }
  //     const isSamePassword = bcrypt.compareSync(newPassword, user.password);
  //     if (isSamePassword) {
  //       return res.status(400).json({
  //         errCode: 1,
  //         message: "New password must be different from old password.",
  //       });
  //     }
  //     const hashNewPassword = await bcrypt.hashSync(newPassword, 10);
  //     user.password = hashNewPassword;
  //     user.updatedAt = new Date(); // Update updatedAt field
  //     await user.save();
  //     return res.status(200).json({
  //       errCode: 0,
  //       message: "Password changed successfully.",
  //     });
  //   } catch (error) {
  //     console.error("Change password error:", error);
  //     return res.status(500).json({
  //       errCode: 1,
  //       message: "Internal server error.",
  //       error: error.message,
  //     });
  //   }
  // },
};

module.exports = userController;
