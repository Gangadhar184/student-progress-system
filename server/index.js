const express = require("express");
const connectDB = require("./src/config/database.js");
const app = express();
const studentRoutes = require("./src/routes/studentRoutes.js");

app.use(express.json());

app.use("/students", studentRoutes);

connectDB()
  .then(() => {
    console.log("database connection established");
    app.listen(7777, () => {
      console.log("server is working on this port");
    });
  })
  .catch((err) => {
    console.log("database cannot connect " + err.message);
  });
