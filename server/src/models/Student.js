const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    cfHandle: {
      type: String,
      required: true,
    },
    emailOptOut: {
      type: Boolean,
      default: false,
    },
    lastSyncedAt: {
      type: Date,
    },
    inactiveReminderCount: { type: Number, default: 0 },
    lastReminderAt: { type: Date },
    emailRemindersEnabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
