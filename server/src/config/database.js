//key - mongodb+srv://gangadhar:vAdCexTpWw3ogKCn@cluster0.4dib3un.mongodb.net/

const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://gangadhar:vAdCexTpWw3ogKCn@cluster0.4dib3un.mongodb.net/student-progress"
  );
};
module.exports = connectDB;
