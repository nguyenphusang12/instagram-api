const User = require("../models/User");

const argon2 = require("argon2");

const jwt = require("jsonwebtoken");

const convertToNonAccentVietnamese = require("../utils/convertToNonAccentVietnamese");

class AuthController {
  // [POST] /api/auth/login
  // @desc login user
  async login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username and/or password missing", success: false });
    }
    try {
      const user = await User.findOne({
        username: username.toLowerCase().trim(),
      });
      if (!user) {
        return res.status(400).json({
          message: "username or password incorrect !!",
          success: false,
        });
      }
      const passwordValidate = await argon2.verify(user.password, password);

      if (!passwordValidate) {
        return res.status(400).json({
          message: "username or password incorrect !!",
          success: false,
        });
      }
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.json({ messgae: "Login sucessfully!", accessToken, success: true });
    } catch (error) {
      console.log("Internal server error", error.message);
      res
        .status(500)
        .json({ message: "Internal server error", success: false });
    }
  }

  // [POST] api/auth/register
  // @desc register user
  async register(req, res) {
    const { username, password, confirmPassword, fullName, avt } = req.body;
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password not match", success: false });
    }
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username and/or password missing", success: false });
    }
    try {
      const user = await User.findOne({ username: username.trim() });

      if (user) {
        return res
          .status(400)
          .json({ message: "User name already use", success: false });
      }
      const hassPassword = await argon2.hash(password);
      const newUser = new User({
        username: username.toLowerCase().trim(),
        password: hassPassword,
        fullName: fullName.trim(),
        avt: avt ? avt : "avt-default.jpg",
        dts: convertToNonAccentVietnamese(fullName),
      });
      await newUser.save();
      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({
        message: "Create user successfully",
        success: true,
        accessToken,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  }

  // [GET] api/auth/
  // @desc check user logger
  async checkLogin(req, res) {
    try {
      const user = await User.findById(req.userId).select("-password");
      if (user) {
        return res.json({ success: true, user });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }
    } catch (error) {
      console.log("Internal server error!!", error.message);
      return res
        .status(500)
        .json({ message: "Internal server error!!", success: false });
    }
  }

  //[PUT] /api/auth/updateAvt
  // @desc update avt user
  async updateAvt(req, res) {
    try {
      await User.findOneAndUpdate({ _id: req.userId }, { avt: req.body.avt });
      return res.json({ message: "Update successfully", success: true });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error", success: false });
    }
  }
  //[POST] /api/auth/search
  // @desc search user
  async searchUser(req, res) {
    try {
      const user = await User.find({}).select([
        "fullName",
        "avt",
        "dts",
        "username",
      ]);

      return res.json({
        success: true,
        user: user.filter((u) =>
          u.dts.includes(convertToNonAccentVietnamese(req.body.value))
        ),
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", success: false });
    }
  }
  //[GET] /api/auth/:username
  //@desc get a user
  async getUser(req, res) {
    try {
      const user = await User.findOne({ username: req.params.username }).select(
        "-password"
      );
      if (user) {
        return res.json({ message: "Sucessfully", success: true, user });
      } else {
        return res.json({ success: false, message: "user not find" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error", success: false });
    }
  }
  //[POST] /api/auth/addFriend
  //@desc add friend
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.userId },
        { $push: { friends: req.body.friendId } },
        { new: true }
      ).select("-password");
      return res.json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false });
    }
  }
  //[POST] /api/auth/deletefriend
  //@desc delete friend
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.userId },
        { $pull: { friends: req.body.friendId } },
        { new: true }
      );
      return res.json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false });
    }
  }
  // [POST] /api/auth/addFollow
  // @desc add follow
  async addFollow(req, res) {
    try {
      await User.findOneAndUpdate(
        { username: req.body.username },
        {
          $push: { followers: req.userId },
        }
      );
      return res.json({ success: true });
    } catch (error) {
      return res.status(500).json({ success: false });
    }
  }

  // [POST] /api/auth/addFollow
  // @desc delete follow
  async deleteFollow(req, res) {
    try {
      await User.findOneAndUpdate(
        { username: req.body.username },
        {
          $pull: { followers: req.userId },
        }
      );
      return res.json({ success: true });
    } catch (error) {
      return res.status(500).json({ success: false });
    }
  }
}
module.exports = new AuthController();
