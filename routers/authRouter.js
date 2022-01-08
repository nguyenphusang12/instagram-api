const express = require("express");

const verifyToken = require("../app/middlewares/verifyToken");

const authController = require("../app/controllers/AuthController");

const router = express.Router();

router.post("/login", authController.login);

router.post("/register", authController.register);

router.put("/updateAvt", verifyToken, authController.updateAvt);

router.post("/search", authController.searchUser);

router.post("/addfriend", verifyToken, authController.addFriend);

router.post("/deletefriend", verifyToken, authController.deleteFriend);

router.post("/addfollow", verifyToken, authController.addFollow);

router.post("/deletefollow", verifyToken, authController.deleteFollow);

router.get("/:username", authController.getUser);

router.get("/", verifyToken, authController.checkLogin);

module.exports = router;
