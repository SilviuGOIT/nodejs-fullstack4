const express = require("express");
const router = express.Router();
const multer = require("multer");
const { auth } = require("../middleware/auth");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/avatars");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage }); //fileFilter

//importam un controler
const {
  getUsersController,
  registerUserController,
  loginUserController,
  uploadAvatarController,
} = require("../controller/index");

router.get("/account", getUsersController);
router.post("/account/register", registerUserController);
router.get("/account/login", loginUserController);

router.put("/avatars", auth, upload.single("avatar"), uploadAvatarController);

module.exports = router;
