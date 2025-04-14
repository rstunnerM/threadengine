// routes/devmode.js — Express route handler for DevMode session exports

import express from "express";
import fs from "fs";
const router = express.Router();

router.post("/save-session", (req, res) => {
  const session = req.body;

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `devmode-session-${timestamp}.json`;
  const filePath = `./public/sessions/${filename}`;

  fs.mkdirSync("./public/sessions", { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(session, null, 2));

  res.json({
    message: "✅ Session saved",
    downloadUrl: `/sessions/${filename}`
  });
});

export default router;
