const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleWare = require("../middlewares/authMiddleware");

router.post('/register', async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    // find if user already exists
    if (userExists) {
      return res.status(200).send({ message: "User already exists", success: false })
    }

    const password = req.body.password;

    // generate salt
    const salt = await bcrypt.genSalt(10);
    // hashed the password with salt
    const hashedPassword = await bcrypt.hash(password, salt);
    // assigning the payload password with the hashed password
    req.body.password = hashedPassword;

    // instantiating new user based on userModel
    const newUser = new User(req.body);

    // saving the user to the database
    await newUser.save();
    res.status(200).send({ message: "User created successfully", success: true });

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error creating the user', success: false, error })
  }
})

router.post('/login', async (req, res) => {
  try {

    // find the user
    const user = await User.findOne({ email: req.body.email });

    // if user does not exist
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false })
    }

    // if user found
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    // if password si incorrect
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Password is incorrect", success: false });
    } else {
      // if password is correct

      // making a jwt for successful log in 
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
      res.status(200).send({ message: "Login successful", success: true, data: token })
    }

    // if there is something wrong with the connection
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error logging in", success: false, error })
  }
})

router.post('/getUserInfoById', authMiddleWare, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId })
    if (!user) {
      return res.status(200).send({ message: "User does not exist", success: false })
    } else {
      res.status(200).send({
        success: true,
        data: {
          name: user.name,
          email: user.email
        }
      })
    }
  } catch (error) {
    res.status(500).send({ message: "Error getting user info", success: false, error })
  }
})

module.exports = router;