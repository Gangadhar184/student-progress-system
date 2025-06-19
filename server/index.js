const express = require("express");
const connectDB = require("./src/config/connectDB");
const studentRoutes = require("./src/routes/studentRoutes");

const app = express();

connectDB();

app.use(express.json());
app.use("/students", studentRoutes)



app.listen(7777, () => {
  console.log("server is running on port");
});
