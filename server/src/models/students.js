const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: String,
  codeforcesHandle: { 
    type: String,
     required: true
     },
  currentRating: Number,
  maxRating: Number,
  dataLastUpdated: Date,
  emailRemindersSent: { 
    type: Number, 
    default: 0 
},
  emailNotificationsEnabled: {
     type: Boolean, 
    default: true 
},
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
