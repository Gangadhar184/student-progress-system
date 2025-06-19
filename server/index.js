const express = require("express");
const connectDB = require("./src/config/connectDB");
const studentRoutes = require("./src/routes/studentRoutes");
const codeforcesRoutes = require("./src/routes/codeforcesRoutes");
const {job} = require("./src/cron/codeforcesSync");

const app = express();

connectDB();

job.start();

app.use(express.json());
app.use("/students", studentRoutes);
app.use("/students", codeforcesRoutes);



app.listen(7777, () => {
  console.log("server is running on port");
});
