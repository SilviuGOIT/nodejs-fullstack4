const { getAllUsers, createUser, checkUserDB } = require("../service/index");

const jwt = require("jsonwebtoken");
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

module.exports = {
  getUsersController,
  registerUserController,
  loginUserController,
};
