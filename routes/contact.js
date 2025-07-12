// routes/contact.js
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const axios = require("axios");
const Contact = require("../models/contact");



router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"ResearchReady Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Contact from ${name}`,
      html: `
        <h2>New Message from Contact Form</h2>
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
    
    
    res.status(200).json({ message: "Message saved and email sent." });

  } catch (error) {
    console.error("❌ Error in contact route:", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Failed to save or send message." });
    }
  }
});

module.exports = router;
