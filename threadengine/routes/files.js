// /routes/files.js
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// === READ a file safely ===
router.get("/read/:filename", (req, res) => {
  const safeName = req.params.filename.replace(/[^a-zA-Z0-9_.\-]/g, "");
  const fullPath = path.join(__dirname, "..", "public", safeName);

  if (!fs.existsSync(fullPath)) {
    return res.status(404).send("File not found");
  }

  const content = fs.readFileSync(fullPath, "utf8");
  res.send(content);
});

// === WRITE to a file securely ===
router.post("/write/:filename", express.text({ type: "*/*" }), (req, res) => {
  const safeName = req.params.filename.replace(/[^a-zA-Z0-9_.\-]/g, "");
  const fullPath = path.join(__dirname, "..", "public", safeName);
  const content = req.body;

  try {
    fs.writeFileSync(fullPath, content, "utf8");
    res.send(`✅ File "${safeName}" saved successfully.`);
  } catch (err) {
    console.error("Write Error:", err);
    res.status(500).send("Failed to write file.");
  }
});

// Optional placeholder
router.get("/loadProjectContext", (req, res) => {
  res.send("Loaded project context.");
});

export default router;
