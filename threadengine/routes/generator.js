// routes/generator.js — ThreadEngine HTML/Component/Image Generator

import express from "express";
import OpenAI from "openai";

const router = express.Router();

// ✅ Safe lazy load of OpenAI after .env is loaded
const getOpenAI = () => {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    console.error("❌ OPENAI_API_KEY is missing in .env");
    throw new Error("Missing OpenAI API key");
  }
  return new OpenAI({ apiKey: key });
};

// === HTML Generator ===
router.post("/generate", async (req, res) => {
  const { prompt, useAIImage } = req.body;
  const fullPrompt = useAIImage ? `${prompt} Include placeholder images.` : prompt;

  try {
    const openai = getOpenAI();
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You generate HTML/CSS/JS. Use markdown-style code blocks." },
        { role: "user", content: fullPrompt }
      ]
    });
    res.json({ html: completion.choices[0].message.content });
  } catch (err) {
    console.error("HTML Gen Error:", err);
    res.status(500).send("Error generating HTML.");
  }
});

// === Image Generator ===
router.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;

  try {
    const openai = getOpenAI();
    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      size: "1024x1024"
    });
    res.json({ url: image.data[0].url });
  } catch (err) {
    console.error("Image Error:", err);
    res.status(500).send("Image generation failed.");
  }
});

// === Component Generator ===
router.post("/generate-component", async (req, res) => {
  const { framework, prompt } = req.body;
  const systemContent = framework === "vue"
    ? "Generate a Vue 3 SFC using Composition API. Output must be copy-paste ready."
    : "Generate a React component using hooks. Output must be copy-paste ready.";

  try {
    const openai = getOpenAI();
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemContent },
        { role: "user", content: prompt }
      ]
    });
    res.json({ code: completion.choices[0].message.content });
  } catch (err) {
    console.error("Component Gen Error:", err);
    res.status(500).send("Component generation failed.");
  }
});

// === Canvas Modifier ===
router.post("/modify-canvas", async (req, res) => {
  const { html, instruction } = req.body;

  try {
    const openai = getOpenAI();
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You're a UI modifier assistant. Modify the HTML per instructions." },
        { role: "user", content: `HTML:\n${html}\n\nInstruction:\n${instruction}` }
      ]
    });
    res.json({ modifiedHTML: completion.choices[0].message.content });
  } catch (err) {
    console.error("Modify Error:", err);
    res.status(500).send("Modification failed.");
  }
});

export default router;
