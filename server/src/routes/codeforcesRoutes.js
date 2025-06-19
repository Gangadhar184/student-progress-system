const express = require("express");
const router = express.Router();

const {getContestByRange, getSubmissionStats} = require("../controllers/codeforcesController");

router.get("/:id/contests", getContestByRange);
router.get("/:id/submissions", getSubmissionStats);

module.exports = router;

