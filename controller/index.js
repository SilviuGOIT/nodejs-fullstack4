const { getAllUsers } = require("../service/index");

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

module.exports = { getUsersController };
