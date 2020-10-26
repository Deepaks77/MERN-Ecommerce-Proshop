const User = require("../models/userModel");
const asyncHandler = require("express-async-handler"); //used to avoid writing try catch in async await call
const generateToken = require("../utils/generateJWToken");
// @desc  Auth user & get Token
//@route POST /api/users/login
//@access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByCredentials(email, password);
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
});

// @desc  Auth user profile
//@route GET /api/users/profile
//@access private
const getUserProfile = asyncHandler(async (req, res) => {
  const { _id, name, email, isAdmin } = req.user;
  res.json({
    _id,
    name,
    email,
    isAdmin,
  });
});

// @desc  Register a User
//@route POST /api/users/
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const newUser = new User({ name, email, password });
  try {
    const createdNewUser = await newUser.save();
    if (createdNewUser) {
      const { _id, name, email, isAdmin } = createdNewUser;
      res.status(201).json({
        _id,
        name,
        email,
        isAdmin,
        token: generateToken(createdNewUser._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data , please try again");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = {
  authUser,
  getUserProfile,
  registerUser,
};
