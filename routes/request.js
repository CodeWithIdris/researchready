// routes/request.js
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const axios = require("axios"); // ✅ Add this line



router.post("/", async (req, res) => {
  const { name, email, message, project } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"ResearchReady Requests" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      replyTo: email,
      subject: `Document Access Request: ${project}`,
      html: `
        <h2>Document Access Request</h2>
        <p><strong>Project:</strong> ${project}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `
    };


    await transporter.sendMail(mailOptions);
    console.log("📡 Sending Slack message...");
    await axios.post(process.env.SLACK_WEBHOOK, {
        text: `📥 New Contact Submission\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`
    });
    console.log("✅ Slack message sent.");

    res.status(200).json({ message: "Your request has been sent successfully." });

  } catch (error) {
    console.error("❌ Request Access Route Error:", error.message);
    if (!res.headersSent) {
      res.status(500).json({ message: "Failed to send your request." });
    }
  }
});

module.exports = router;
