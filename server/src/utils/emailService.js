const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail"    ,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const sendInactivityReminder = async(email, name) => {
    const mailOptions = {
    from: `"CF Tracker" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: " You're falling behind on Codeforces!",
    html: `
      <p>Hi ${name},</p>
      <p>We noticed you haven’t solved any Codeforces problems in the last 7 days.</p>
      <p>Time to get back on track </p>
      <p>— Student Progress Tracker</p>
    `
  };

  await transporter.sendMail(mailOptions);
}
module.exports = {sendInactivityReminder};
