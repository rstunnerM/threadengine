// routes/tools.js — ThreadEngine AI Tools (Explain / Debug / Refactor)

import express from "express";
import OpenAI from "openai";

const router = express.Router();

// ✅ Lazy-load OpenAI client only when needed
const getOpenAI = () => {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    console.error("❌ OPENAI_API_KEY is missing in environment.");
    throw new Error("Missing API key");
  }
  return new OpenAI({ apiKey: key });
};

// === Explain Code ===
router.post("/explain-code", async (req, res) => {
  const { language, code } = req.body;

  const systemPrompt = `You are an expert ${language} instructor. Explain the following code in clear, plain English. Use markdown with bullet points and examples if needed.`;

  try {
    const openai = getOpenAI();
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: code }
      ]
    });

    const explanation = completion.choices[0].message.content;
    res.json({ explanation });
  } catch (err) {
    console.error("❌ ExplainCode Error:", err);
    res.status(500).send("Code explanation failed.");
  }
});

// === Debug Code ===
router.post("/debug-code", async (req, res) => {
  const { language, code } = req.body;

  const systemPrompt = `You're an expert ${language} developer. Find and fix any bugs or bad practices in the following code. Explain what was wrong and return the corrected version.`;

  try {
    const openai = getOpenAI();
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: code }
      ]
    });

    const result = completion.choices[0].message.content;
    res.json({ debuggedCode: result });
  } catch (err) {
    console.error("❌ Debug tool failed:", err);
    res.status(500).send("Debugging failed.");
  }
});

// === Refactor Code ===
router.post("/refactor-code", async (req, res) => {
  const { language, goal, code } = req.body;

  const systemPrompt = `You are an expert ${language} developer. Refactor the code below to meet this goal: ${goal}. Keep it clean, modern, and readable.`;

  try {
    const openai = getOpenAI();
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: code }
      ]
    });

    const refactored = completion.choices[0].message.content;
    res.json({ refactoredCode: refactored });
  } catch (err) {
    console.error("❌ Refactor Error:", err);
    res.status(500).send("Refactor failed.");
  }
});

export default router;
