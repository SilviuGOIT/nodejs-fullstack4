const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routerApi = require("./routes/index");
// npm -> dotenv
app.use(express.json());
app.use("/api", routerApi);
// cream o functie prin care o sa ne conectam la cluster nostru care contine BD
const db_url = "mongodb+srv://silviu:test@cluster0.f7oded6.mongodb.net/";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    });
    console.log("MongoDB connection success");
    app.listen(4000, () => {
      console.log(`Example app listening on port 4000`);
    });
  } catch (error) {
    console.log("MongoDB connection failed: ", error);
  }
};

connectToMongoDB();

// noSQL -> baza de date non-relationale -> MongoDB
// SQL -> model fix si o structura fixa + relatiile dintre tabele -> postrgreSQL -> sequelize
