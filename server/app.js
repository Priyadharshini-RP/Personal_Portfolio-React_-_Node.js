
const express = require("express");
const cors = require("cors");
const dns = require("node:dns");

// Use Google DNS for MongoDB Atlas SRV lookup
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json({ limit: "20kb" }));

// Contact message schema
const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 80
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 120
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 2000
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ContactMessage =
  mongoose.models.ContactMessage ||
  mongoose.model("ContactMessage", messageSchema);

// MongoDB connection
let connectionPromise;

async function connectDatabase() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not configured. Add it to your .env file."
    );
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 15000
      })
      .catch((error) => {
        connectionPromise = null;
        throw error;
      });
  }

  await connectionPromise;
}

// Health check
app.get("/api/health", async (req, res) => {
  try {
    await connectDatabase();

    res.json({
      status: "ok",
      database: "connected",
      message: "Portfolio API is running"
    });
  } catch (error) {
    console.error("Database connection error:", error.message);

    res.status(503).json({
      status: "error",
      database: "disconnected",
      message: "Database connection failed."
    });
  }
});

// Contact form API
app.post("/api/contact", async (req, res) => {
  try {
    const {
      name = "",
      email = "",
      message = ""
    } = req.body || {};

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string"
    ) {
      return res.status(400).json({
        message: "Invalid form data."
      });
    }

    if (!name.trim() || !email.trim() || !message.trim()) {
      return res.status(400).json({
        message: "Please complete all fields."
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({
        message: "Please enter a valid email address."
      });
    }

    if (name.trim().length < 2 || message.trim().length < 10) {
      return res.status(400).json({
        message:
          "Name must have at least 2 characters and message at least 10 characters."
      });
    }

    await connectDatabase();

    await ContactMessage.create({
      name: name.trim(),
      email: email.trim(),
      message: message.trim()
    });

    return res.status(201).json({
      message: "Thank you! Your message has been saved successfully."
    });

  } catch (error) {
    console.error("Contact form error:", error.message);

    return res.status(500).json({
      message: "Could not save your message. Please try again later."
    });
  }
});

module.exports = app;