const mongoose = require('mongoose');

const cfProfileSchema = new mongoose.Schema({
    studentId : {
        type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true
    },
    handle: {
        type: String,
        required: true,
    },
    currentRating: Number,
    maxRating: Number,
    rank: String,
    maxRank: String,
    organization: String,
    avatar: String,
    lastFetchedAt: Date
}, {timeStamps: true});

const CfProfile = mongoose.model('CfProfile', cfProfileSchema);

module.exports = CfProfile;

