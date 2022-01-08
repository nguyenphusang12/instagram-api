const path = require("path");
const fs = require("fs");
class UploadController {
  // [POST] /api/uploadfile/
  // @desc upload an img
  upload(req, res, next) {
    if (req.file) {
      return res.json({ success: true, file: req.file });
    }
    res.status(400).json({ message: "upload failed!", success: false });
  }
  // [GET] /api/uploadfile/:name
  // @desc get an img
  getImg(req, res) {
    const { name } = req.params;

    if (name) {
      return res.sendFile(path.resolve(`./public/${name}`));
    }
  }
  // [DELETE] /api/uploadfile/:name
  // @desc delete an img
  delete(req, res) {
    const imgPath = path.join(__dirname, `../../public/${req.params.name}`);
    fs.unlinkSync(imgPath);
  }
}

module.exports = new UploadController();
