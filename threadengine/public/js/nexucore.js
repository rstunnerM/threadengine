// routes/nexucore.js
import express from "express";
const router = express.Router();

/**
 * POST /api/nexucore/prompt
 * Accepts a message and mode from the frontend, simulates NexuCore's AI response.
 */
router.post("/prompt", (req, res) => {
  const { message, mode } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Missing message in request body." });
  }

  // Simulated AI response (can later call OpenAI or internal logic)
  const response = {
    mode: mode || "default",
    reply: `🤖 NexuCore (${mode || "default"}) received: "${message}"`
  };

  res.json(response);
});

export default router;
