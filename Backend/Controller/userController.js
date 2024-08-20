const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

//create user register user
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //validation
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Plase fill fields",
      });
    }
    //exisiting user
    const exisiting_user = await userModel.findOne({ email });
    if (exisiting_user) {
      return res.status(401).send({
        success: false,
        message: "user already Exists",
      });
    }
    const hashpassword = await bcrypt.hash(password, 10);

    //save user
    const user = new userModel({ username, email, password: hashpassword });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "New user created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "error in register callback",
      success: false,
      error,
    });
  }
};

//get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "All user data",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500),
      send({
        success: false,
        message: "Error in get all user",
        error,
      });
  }
};

//login
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    //password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid Username or Password",
        error,
      });
    }

    return res.status(200).send({
      success: true,
      message: "Login sucessfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
