const express = require("express");
const router = express.Router();

//importam un controler
const { getUsersController } = require("../controller/index");

router.get("/account", getUsersController);

module.exports = router;
