const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const protect = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      token = authHeader.replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        res.status(401);
        throw new Error("Not Authorized,No Token");
      }
      req.user = user;
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not Authorized , Token Failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized,No Token");
  }
});

module.exports = protect;
