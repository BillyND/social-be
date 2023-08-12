const express = require("express");
const { getAllUser, registerUser } = require("../controllers/userController");
const router = express.Router();

router.get("/user", getAllUser);
router.post("/register", registerUser);
// router.post("/update-user", updateBoard);
// router.post("/delete-user", deleteBoard);

module.exports = router;
