// routes/devmode.api.js
import express from "express";
import OpenAI from "openai";

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// === DevMode Code Assistant ===
router.post("/code", async (req, res) => {
  const { requestType, contextCode, devPrompt } = req.body;
  const systemPrompt = requestType === "debug-assist"
    ? "You're an AI debugger. Diagnose and suggest fixes."
    : "You're a coding assistant. Suggest feature improvements in HTML/CSS/JS.";

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Code:\n${contextCode}` },
        { role: "user", content: `Prompt:\n${devPrompt}` }
      ]
    });
    res.json({ update: completion.choices[0].message.content });
  } catch (err) {
    console.error("DevMode Error:", err);
    res.status(500).send("Developer assistant failed.");
  }
});

// === DevMode Flow Assistant ===
router.post("/flow", async (req, res) => {
  const { contextCode, userInput } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You're a helpful coding teammate. Be insightful and proactive." },
        { role: "user", content: `Code:\n${contextCode}` },
        { role: "user", content: `Goal:\n${userInput}` }
      ]
    });
    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error("DevFlow Error:", err);
    res.status(500).send("Dev assistant failed.");
  }
});

export default router;
