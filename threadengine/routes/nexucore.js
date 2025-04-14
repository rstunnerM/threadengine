// routes/nexucore.js
import express from "express";
const router = express.Router();

router.post("/prompt", (req, res) => {
  const { message, mode } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Missing message in request body." });
  }

  // Fake AI response
  res.json({
    reply: `🤖 NexuCore (${mode || "default"}) received: "${message}"`
  });
});

export default router;
