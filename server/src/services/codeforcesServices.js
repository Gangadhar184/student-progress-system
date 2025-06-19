const axios = require("axios");

const CfProfile = require("../models/CFProfile");
const CfContest = require("../models/CFContest");
const CfSubmission = require("../models/CFSubmission");

async function fetchCodeforcesProfile(handle) {
  try {
    const res = await axios.get(
      `https://codeforces.com/api/user.info?handles=${handle}`
    );
    const user = res.data.result[0];

    return {
      handle: user.handle,
      currentRating: user.rating || 0,
      maxRating: user.maxRating || 0,
      rank: user.rank || "unrated",
      maxRank: user.maxRank || "unrated",
      avatar: user.avatar,
      organization: user.organization || "N/A",
      lastFetchedAt: new Date(),
    };
  } catch (error) {
    console.error(
      "Error fetching CF profile:",
      error.response?.data || err.message
    );
    throw new Error("Invalid Codeforces handle or CF API error");
  }
}


async function saveOrUpdateCFProfile(studentId, handle) {
    const data = await fetchCodeforcesProfile(handle);
    const existing = await CfProfile.findOne({studentId});
    if(existing) {
        await CfProfile.updateOne({studentId}, {...data});
    }else{
      await CfProfile.create({...data, studentId})
    }
}

async function fetchAndSaveContests(studentId, handle) {
  try {
    const res = await axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`);
    const contests = res.data.result;

    console.log(`Fetched ${contests.length} contests for ${handle}`);

    await CfContest.deleteMany({ studentId });

    const entries = contests.map(entry => ({
      studentId,
      handle,
      contestId: entry.contestId,
      contestName: entry.contestName,
      rank: entry.rank,
      oldRating: entry.oldRating,
      newRating: entry.newRating,
      ratingChange: entry.newRating - entry.oldRating,
      contestDate: new Date(entry.ratingUpdateTimeSeconds * 1000),
    }));

    await CfContest.insertMany(entries);
  } catch (err) {
    console.error("Error fetching/saving contests:", err.response?.data || err.message);
  }
};

async function fetchAndSaveSubmissions(studentId, handle){
  const res = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}&count=1000`);
  const submissions = res.data.result;
  await CfSubmission.deleteMany({studentId});

  //to avoid duplicate AC's
  const solvedSet = new Set();
  const entries = submissions.filter(sub=>sub.verdict === "OK"&& sub.problem).map(sub=>{
    const pid = `${sub.problem.contestId}-${sub.problem.index}`;
    if(solvedSet.has(pid)) return null;
    solvedSet.add(pid);
    return{
      studentId,
      handle,
      problemId: pid,
      contestId: sub.contestId,
      index: sub.problem.index,
      name: sub.problem.name,
      rating: sub.problem.rating || null,
      tags: sub.problem.tags || [],
      verdict: sub.verdict,
      programmingLanguage: sub.programmingLanguage,
      submissionDate: new Date(sub.creationTimeSeconds * 1000)
    }
  }).filter(Boolean);

  await CfSubmission.insertMany(entries)  ;
}


module.exports = {fetchCodeforcesProfile, saveOrUpdateCFProfile, fetchAndSaveContests, fetchAndSaveSubmissions};
