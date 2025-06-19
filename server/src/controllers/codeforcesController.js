const CfContest = require('../models/CFContest');
const CfSubmission = require("../models/CFSubmission");

const getContestByRange = async (req, res) => {
  try {
    const { id } = req.params;
    const range = req.query.range || "90d";

    // Validate range
    const days = parseInt(range.replace("d", ""));
    if (isNaN(days) || days <= 0) {
      return res.status(400).json({ message: "Invalid range query parameter" });
    }

    const fromDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const contests = await CfContest.find({
      studentId: id,
      contestDate: { $gte: fromDate },
    }).sort({ contestDate: 1 });

    const graphData = contests.map((c) => ({
      date: c.contestDate.toISOString().split("T")[0],
      rating: c.newRating,
    }));

    res.status(200).json({ graphData, contests });
  } catch (error) {
    console.error("Error fetching contest data:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getSubmissionStats = async(req, res) => {
  const {id} = req.params;
  const range = req.query.range || "30d";
     // Validate range
    const days = parseInt(range.replace("d", ""));
    if (isNaN(days) || days <= 0) {
      return res.status(400).json({ message: "Invalid range query parameter" });
    }

    const fromDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const submissions = await CfSubmission.find({studentId: id, submissionDate: {$gte: fromDate}})

    const totalSolved = submissions.length;

    //most difficult problem
    const sortedByRating = submissions.filter(s=>s.rating).sort((a,b)=>b.rating - a.rating);

    const mostDifficult = sortedByRating[0];

    //avg rating
    const avgRating = sortedByRating.reduce((sum, p)=>sum+p.rating, 0) / sortedByRating.length || 0

    //problems per day
    const dateMap = {};
    for(let sub of submissions) {
      const d = sub.submissionDate.toISOString().split("T")[0]  ;
      dateMap[d] = (dateMap[d] || 0) + 1;
    }
    const avgPerDay = totalSolved / days;

    //rating buckes (eg: 800-900)
    const ratingBuckets = {};
    for(let sub of submissions){
      if(!sub.rating) continue;
      const bucket = `${Math.floor(sub.rating /100)*100}-${Math.floor(sub.rating/100)*100+100}`;
      ratingBuckets[bucket] = (ratingBuckets[bucket] || 0) + 1;
    }

    res.json({
      totalSolved,
      avgRating: Math.round(avgRating),
      avgPerDay: parseFloat(avgPerDay.toFixed(2)),
      mostDifficult,
      ratingBuckets,
      heatmap: dateMap
    })
  
  }
module.exports = { getContestByRange, getSubmissionStats };
