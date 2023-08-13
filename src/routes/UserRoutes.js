const express = require("express");
const userController = require("../controllers/userController");
const verifyJWT = require("../middleWare/verifyJWT");

const router = express.Router();

router.get("/users", userController.getAllUser);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/change-password", verifyJWT, userController.changePassword);
router.post("/delete-user", verifyJWT, userController.softDeleteUser);

module.exports = router;
