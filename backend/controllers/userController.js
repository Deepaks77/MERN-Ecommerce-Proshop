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

// @desc  Update user profile
//@route POST /api/users/profile
//@access private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if (req.body.password) {
    user.password = req.body.password;
  }
  const updatedUser = await user.save();
  if (updatedUser) {
    const { _id, name, email, isAdmin } = updatedUser;
    res.status(201).json({
      _id,
      name,
      email,
      isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data , please try again");
  }
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

// @desc  Get  all users
//@route GET /api/users/
//@access private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc  Get  user by id
//@route GET /api/users/:id
//@access private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) res.json(user);
  else {
    res.status(404);
    throw new Error("User did not found check your id");
  }
});

// @desc  Update User
//@route POST /api/users/:id
//@access private/Admin
const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();
    if (updatedUser) {
      const { _id, name, email, isAdmin } = updatedUser;
      res.status(201).json({
        _id,
        name,
        email,
        isAdmin,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data , please try again");
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc  delete  a yser
//@route DELETE /api/users/:id
//@access private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User Removed" });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
module.exports = {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUserById,
};
