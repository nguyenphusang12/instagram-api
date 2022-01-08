const express = require("express");

const router = express.Router();

const User = require("../app/models/User");

//[GET] /api/user/?
//@desc get a user by id or username
router.get("/", async (req, res) => {
  const userId = req.query.id;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findOne({ _id: userId }).select("-password")
      : await User.findOne({ username: username }).select("-password");
    if (user) return res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error, success: false });
  }
});

module.exports = router;
