// routes/admin.js
const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

// GET all saved contact messages
router.get("/messages", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error("❌ Admin route failed:", err.message);
    res.status(500).json({ error: "Failed to load messages." });
  }
});

module.exports = router;
