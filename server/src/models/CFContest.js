const mongoose = require("mongoose");

const cfContestSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  handle: { type: String, required: true },
  contestId: Number,
  contestName: String,
  rank: Number,
  oldRating: Number,
  newRating: Number,
  ratingChange: Number,
  contestDate: Date,
});

const CfContest = mongoose.model('CfContest', cfContestSchema);

module.exports = CfContest;
