// server.js
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./db");

const app = express();
const PORT = 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import Routes
const contactRoutes = require("./routes/contact");
const requestRoutes = require("./routes/request");
const adminRoutes = require("./routes/admin");

// Mount Routes
app.use("/contact", contactRoutes);           // POST /contact
app.use("/request-access", requestRoutes);    // POST /request-access
app.use("/admin", adminRoutes);               // GET /admin/messages

// Server Listener
app.listen(PORT, () => {
  console.log("✅ server.js loaded...");
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
           


app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());  // 
app.use(bodyParser.urlencoded({ extended: true }));


/*---app.post("/request-access", async (req, res) => {
  const { name, email, message, project } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
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
    res.status(200).json({ message: "Your request has been sent successfully." });
  } catch (error) {
    console.error("❌ Email Error:", error.message);
    res.status(500).json({ message: "Failed to send your request. Try again later." });
  }
});---*/


app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

/*---app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // ✅ Save to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // ✅ Send email
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

    // ✅ Send response AFTER both DB + Email succeed
    res.status(200).json({ message: "Message saved and email sent." });

  } catch (error) {
    console.error("❌ Full error in /contact:", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Failed to save or send message." });
    }
  }
  
});---*/

// Admin route to retrieve all messages
app.get("/admin/messages", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    console.log("📨 Messages retrieved:", messages);
    res.json(messages);
  } catch (err) {
    console.error("❌ Failed to load messages:", err);
    res.status(500).json({ error: "Failed to load messages." });
  }
});

