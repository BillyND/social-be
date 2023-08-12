const bcrypt = require("bcrypt");
const Users = require("../modals/User");

const getAllUser = async (req, res) => {
  try {
    const resGetAll = await Users.find({});
    return res.status(200).json({
      errCode: 0,
      message: "Get all user success!",
      total: resGetAll?.length || 0,
      data: resGetAll,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      message: "Server error!",
      error: error,
    });
  }
};

const registerUser = async (req, res) => {
  const saltRounds = 10;
  const id = "userId-" + Date.now();
  const email = req?.body?.email?.trim();
  const password = req?.body?.password?.trim();
  try {
    const validateEmail = email?.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    const validatePassword = password?.match(
      /^[a-zA-Z0-9!@#$%^&*)(+=._-]{6,}$/g
    );
    if (!email || !validateEmail) {
      return res.status(200).json({
        errCode: 1,
        message: "Email Invalidate!",
      });
    }

    if (!password || !validatePassword) {
      return res.status(200).json({
        errCode: 1,
        message: "Password Invalidate!",
      });
    }

    const hashPassword = await bcrypt.hash(password, saltRounds);
    const options = {
      id: id,
      email: email,
      password: hashPassword,
      name: "",
    };

    const isAlreadyExistUser = await Users.findOne({ email: email });
    if (isAlreadyExistUser) {
      return res.status(200).json({
        errCode: 1,
        message: "Email already exists!",
      });
    }

    const resRegister = await Users.create(options);

    return res.status(200).json({
      errCode: 0,
      message: "Register success!",
      data: resRegister,
    });
  } catch (error) {
    console.log(">>erroe", error);
    return res.status(500).json({
      errCode: 1,
      message: "Server error!",
      error: error,
    });
  }
};

module.exports = { getAllUser, registerUser };
