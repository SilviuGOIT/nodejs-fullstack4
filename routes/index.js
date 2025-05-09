const express = require("express");
const router = express.Router();

//importam un controler
const {
  getUsersController,
  registerUserController,
  loginUserController,
} = require("../controller/index");

router.get("/account", getUsersController);
router.post("/account/register", registerUserController);
router.get("/account/login", loginUserController);

router.get("/accounts/tutors", auth, getTutorsController);
module.exports = router;
