//key - mongodb+srv://gangadhar:vAdCexTpWw3ogKCn@cluster0.4dib3un.mongodb.net/


const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
         await mongoose.connect('mongodb+srv://gangadhar:vAdCexTpWw3ogKCn@cluster0.4dib3un.mongodb.net/student-progress');
         console.log("database connection established")
    }catch(error){
        console.log(error.message);
        process.exit(1);
    }
   
}

module.exports = connectDB;
