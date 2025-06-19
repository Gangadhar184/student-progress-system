const cron = require("node-cron");
const Student = require('../models/Student');
const { saveOrUpdateCFProfile, fetchAndSaveContests, fetchAndSaveSubmissions } = require("../services/codeforcesServices");
const CfSubmission = require("../models/CFSubmission");
const { sendInactivityReminder } = require("../utils/emailService");

async function syncAllStudents(){
    console.log("running CF sync job");

    const students = await Student.find({cfHandle: {$exists: true, $ne: ""}});
    for(const student of students){
        try{
            const{_id, cfHandle} = student;

            await saveOrUpdateCFProfile(_id, cfHandle);
            await fetchAndSaveContests(_id, cfHandle);
            await fetchAndSaveSubmissions(_id, cfHandle);

            await Student.findByIdAndUpdate(_id, {lastSyncedAt: new Date()});

            await detectInactivity(student);
            console.log(`Synced ${cfHandle}`);
        }catch(error){
            console.error(`Failed syncing ${student.cfHandle}:`, error.message) ;
        }
        console.log("CF Sync JOB completed");
    }

   
}
 //schedule everyday
    const job = cron.schedule("0 2 * * *", syncAllStudents,{
        timezone: "Asia/Kolkata"
    })

async function detectInactivity(student){
    const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const recent = await CfSubmission.findOne({
        studentId: student._id,
        submissionDate: {$gte: fromDate},
    });
    if (!recent && student.emailRemindersEnabled) {
    // Send email
    await sendInactivityReminder(student.email, student.name);

    // Update reminder info
    student.inactiveReminderCount += 1;
    student.lastReminderAt = new Date();
    await student.save();

    console.log(`Reminder sent to ${student.name}`);
  }
}

module.exports = {job, syncAllStudents, detectInactivity};
