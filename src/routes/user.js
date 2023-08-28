const express = require("express");
const userController = require("../controllers/userController");
const verifyJWT = require("../middleWare/verifyJWT");

const router = express.Router();

//GET A USER
router.get("/users/:id", userController.getUserById);

//LOGIN
router.post("/login", userController.loginUser);

//REGISTER
router.post("/register", userController.registerUser);

//CHANGE PASSWORD
router.post("/change-password", userController.changePassword);
// router.post("/delete-user", userController.softDeleteUser);

module.exports = router;
