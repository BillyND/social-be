const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: String,
  email: String,
  password: String,
  name: String,
});

const Users = mongoose.model("users", userSchema);

module.exports = Users;
