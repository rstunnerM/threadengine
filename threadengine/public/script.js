// script.js — ThreadEngine Bootstrap Loader

// ====== 🔗 Modular Imports ======
import {
  pushHistory,
  undoChange,
  redoChange,
  updateCommandHistory,
  saveToSessionHistory,
  getSessionHistory
} from './utils/history.js';

import {
  applyCustomCode,
  insertLayout,
  addElement,
  addToCanvas,
  uploadImage,
  changeFontFamily,
  changeFontSize,
  changeFontColor,
  formatText,
  enablePaintMode,
  clearFormatting,
  exportCanvasZip,
  setView
} from './utils/editorTools.js';

import {
  sendPrompt,
  acceptAISuggestion,
  rejectAISuggestion,
  showSessionHistory
} from './gpt/prompt.js';

import {
  startDevFlow,
  applyGptSuggestion,
  copyGptSuggestion,
  clearGptSuggestion,
  respondToGpt
} from './gpt/devmode.js';

import {
  openGhostwire,
  closeGhostwire,
  acceptGhostSuggestion,
  refreshGhostwire,
  toggleGhostwireFold,
  startDrag,
  dragPanel,
  stopDrag
} from './ui/ghostwire.js';

import { startVoiceRecognition } from './js/voiceMode.js'; // 🎙️ Voice Command Trigger

// ====== 🎨 Optional Inlined Styles (Toolbar UI) ======
const style = document.createElement('style');
style.innerHTML = `
#textToolbar button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 6px;
  font-size: 14px;
  margin: 0 2px;
  color: #333;
  border-radius: 4px;
}
#textToolbar button:hover {
  background-color: #e0e0e0;
}`;
document.head.appendChild(style);

// ====== 🧪 Dev Mode Toggle ======
function toggleDevMode() {
  const devMode = document.getElementById("devMode");
  if (devMode) {
    devMode.style.display = devMode.style.display === "none" ? "block" : "none";
  }
}

// ====== 🎨 Canvas Color Picker ======
document.getElementById('canvasColorPicker')?.addEventListener('input', function () {
  document.getElementById('designCanvas').style.backgroundColor = this.value;
});

// ====== 🧠 AI Generate / Modify Flow Integration ======
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("designCanvas");
  const htmlEditor = document.getElementById("htmlEditor");
  const cssEditor = document.getElementById("cssEditor");
  const jsEditor = document.getElementById("jsEditor");
  const generateBtn = document.getElementById("generateBtn");
  const modInput = document.getElementById("modInstruction");
  const modBtn = document.getElementById("modBtn");
  const modLogList = document.getElementById("modLogList");
  const useAIImage = document.getElementById("use-ai-image");

  // 🎤 Trigger voice recognition with Ctrl + V
  document.body.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === "v") {
      startVoiceRecognition();
    }
  });

  // Sync canvas when HTML editor changes
  htmlEditor?.addEventListener("input", () => {
    canvas.innerHTML = htmlEditor.value;
  });

  // === ✨ AI GENERATE ===
  generateBtn?.addEventListener("click", async () => {
    const prompt = htmlEditor.value.trim() || "Create a sleek futuristic login form interface with floating labels.";
    const wantsImage = useAIImage?.checked;

    generateBtn.innerText = "🔄 Generating...";
    generateBtn.disabled = true;

    try {
      const res = await fetch("/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, useAIImage: wantsImage })
      });

      const { html } = await res.json();
      const injected = extractCode(html);

      canvas.innerHTML = injected;
      htmlEditor.value = injected;
    } catch (err) {
      console.error("AI Gen Failed:", err);
      alert("Something went wrong with generation.");
    }

    generateBtn.innerText = "✨ Generate UI with AI";
    generateBtn.disabled = false;
  });

  // === 🧠 MODIFY HTML WITH AI ===
  modBtn?.addEventListener("click", async () => {
    const instruction = modInput?.value?.trim();
    if (!instruction || !canvas.innerHTML) return alert("Give me something to work with.");

    modBtn.innerText = "🔄 Modifying...";
    modBtn.disabled = true;

    try {
      const res = await fetch("/modify-canvas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: canvas.innerHTML, instruction })
      });

      const { modifiedHTML } = await res.json();
      const updated = extractCode(modifiedHTML);

      canvas.innerHTML = updated;
      htmlEditor.value = updated;

      // Log it
      const log = document.createElement("li");
      log.textContent = `🧠 ${instruction}`;
      modLogList?.appendChild(log);
    } catch (err) {
      console.error("Mod error:", err);
      alert("Something went wrong with the modification.");
    }

    modBtn.innerText = "🧠 Modify with AI";
    modBtn.disabled = false;
  });

  // Markdown Code Extractor
  function extractCode(content) {
    const match = content.match(/```(?:html)?\s*([\s\S]*?)```/);
    return match ? match[1].trim() : content;
  }
});

// ====== 🔁 Undo/Redo Shortcuts ======
document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key === "z") undoChange();
  if (e.ctrlKey && e.key === "y") redoChange();
});

// ====== ✅ Exports ======
export {
  pushHistory,
  undoChange,
  redoChange,
  updateCommandHistory,
  saveToSessionHistory,
  getSessionHistory,
  applyCustomCode,
  insertLayout,
  addElement,
  addToCanvas,
  uploadImage,
  changeFontFamily,
  changeFontSize,
  changeFontColor,
  formatText,
  enablePaintMode,
  clearFormatting,
  exportCanvasZip,
  setView,
  sendPrompt,
  acceptAISuggestion,
  rejectAISuggestion,
  showSessionHistory,
  startDevFlow,
  applyGptSuggestion,
  copyGptSuggestion,
  clearGptSuggestion,
  respondToGpt,
  openGhostwire,
  closeGhostwire,
  acceptGhostSuggestion,
  refreshGhostwire,
  toggleGhostwireFold,
  startDrag,
  dragPanel,
  stopDrag,
  toggleDevMode
};
