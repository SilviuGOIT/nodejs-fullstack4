const { getAllUsers, createUser, checkUserDB } = require("../service/index");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const Jimp = require("jimp");
const secret = "Ceva_String"; // process.env.SECRET -> .env ( nu sta pe git) -> putem avea pe git, .envEXAMPLE ( secret = SECRET ....... ) Github Secrets,AWS Secrets
const getUsersController = async (req, res, next) => {
  try {
    const results = await getAllUsers();
    console.log(results, "results");
    res.status(200).json({
      status: "Success",
      code: 200,
      data: results,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      code: 404,
    });
    next(error);
  }
};

const registerUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await createUser({
      email,
      password,
    });

    const payload = { email: result.email };
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    res.status(201).json({
      status: "Success",
      data: { email: result.email, token },
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      error: error.message,
    });
  }
};

const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await checkUserDB({
      email,
      password,
    });

    const payload = { email: result.email };
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    res.status(201).json({
      status: "Success",
      data: { email: result.email, token },
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      error: error.message,
    });
  }
};

const uploadAvatarController = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const uniqFilename = `${Date.now()}${path.extname(req.file.originalname)}`;
    const destinationDir = path.join(__dirname, "../public/avatars");
    const destinationPath = path.join(destinationDir, uniqFilename);

    // Resize with Jimp
    const image = await Jimp.Jimp.read(req.file.path);
    await image.resize({
      w: 250,
      h: 250,
    });

    // Ensure target directory exists
    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir, { recursive: true });
    }

    // Move file
    fs.renameSync(req.file.path, destinationPath);

    // Update user avatar
    req.user.avatarUrl = `/avatars/${uniqFilename}`;
    await req.user.save();

    return res.status(200).json({ avatarUrl: req.user.avatarUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsersController,
  registerUserController,
  loginUserController,
  uploadAvatarController,
};
