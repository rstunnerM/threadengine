// /gpt/prompt.js

import { pushHistory, updateCommandHistory, saveToSessionHistory, getSessionHistory } from '../server/utils/history.js';
import { applyCustomCode } from './editorTools.js';

export async function sendPrompt() {
  const prompt = document.getElementById("prompt").value;
  const useAIImage = document.getElementById("useAIImage").checked;
  const previewBox = document.getElementById("aiSuggestionPreview");
  const previewTextarea = document.getElementById("aiPreview");

  previewBox.style.display = "none";
  previewTextarea.value = "Thinking...";

  try {
    const res = await fetch("http://localhost:3000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, useAIImage })
    });

    const data = await res.json();
    const suggestion = data.html || "No HTML returned from AI.";
    updateCommandHistory(`AI generated layout from prompt: "${prompt}"`);
    previewTextarea.value = suggestion;
    previewBox.style.display = "block";

    saveToSessionHistory({ prompt, suggestion });
  } catch (err) {
    console.error(err);
    previewTextarea.value = "Error connecting to server.";
    previewBox.style.display = "block";
  }
}

export function acceptAISuggestion() {
  const suggestion = document.getElementById("aiPreview").value;
  const canvas = document.getElementById("designCanvas");
  const htmlEditor = document.getElementById("htmlEditor");
  const cssEditor = document.getElementById("cssEditor");
  const jsEditor = document.getElementById("jsEditor");

  const htmlMatch = suggestion.match(/```html([\s\S]*?)```/);
  const cssMatch = suggestion.match(/```css([\s\S]*?)```/);
  const jsMatch = suggestion.match(/```js([\s\S]*?)```/);

  if (htmlMatch) {
    const html = htmlMatch[1].trim();
    canvas.innerHTML = html;
    htmlEditor.value = html;
    pushHistory(html);
  }

  if (cssMatch) cssEditor.value = cssMatch[1].trim();
  if (jsMatch) jsEditor.value = jsMatch[1].trim();

  updateCommandHistory("✅ AI suggestion accepted and applied to canvas.");
  applyCustomCode();
  document.getElementById("aiSuggestionPreview").style.display = "none";
}

export function rejectAISuggestion() {
  document.getElementById("aiSuggestionPreview").style.display = "none";
}

export function showSessionHistory() {
  const history = getSessionHistory();
  console.log("Current Session History:", history);
  alert(JSON.stringify(history, null, 2));
}
