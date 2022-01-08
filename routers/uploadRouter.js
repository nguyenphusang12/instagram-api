const express = require("express");
const router = express.Router();
const uploadController = require("../app/controllers/UploadController");
const upload = require("../app/models/ModelMulter");
// [POST] /api/uploadfile/
// @desc upload an img
router.post("/", upload.single("postImg"), uploadController.upload);

// [GET] /api/uploadfile/:name
// @desc get an img
router.get("/:name", uploadController.getImg);

// [DELETE] /api/uploadfile/:name
// @desc delete an img
router.delete("/:name", uploadController.delete);

module.exports = router;
