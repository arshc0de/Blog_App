const express = require("express");
const {
  getAllUsers,
  registerController,
  loginController,
} = require("../Controller/userController");
//router objcet
const router = express.Router();
//getAllUsers
router.get("/all-user", getAllUsers);

//create user || POST
router.post("/register", registerController);

//login
router.post("/login", loginController);

module.exports = router;
