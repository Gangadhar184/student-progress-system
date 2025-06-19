const mongoose = require('mongoose');

const cfSubmissionSchema = new mongoose.Schema({
    studentId: {type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true},
    handle: {type: String, required: true},
    problemId: String,
    contestId: Number,
    index: String,
    name: String,
    rating: Number,
    tags: [String],
    verdict: String,
    programmingLanguage: String,
    submissionDate: Date
})
const cfSubmission = mongoose.model("cfSubmission", cfSubmissionSchema);

module.exports = cfSubmission;
