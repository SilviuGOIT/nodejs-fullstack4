// definim modelul nostru de Tabel "User"
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const user = new Schema({
  nume: { type: "string", required: [true], minLength: 2 },
  prenume: { type: "string", required: [true], minLength: 2 },
  oras: { type: "string", required: [true], minLength: 2 },
});

const User = mongoose.model("users", user);
module.exports = User;
