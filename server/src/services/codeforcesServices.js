const axios = require("axios");

const CfProfile = require("../models/CFProfile");

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
        (await CfProfile).createConnection({...data, studentId})
    }
}

module.exports = {fetchCodeforcesProfile, saveOrUpdateCFProfile}
