// Developer prompt handling

import { loadProjectContext } from './utils.js';

export async function startDevFlow() {
  const prompt = document.getElementById("devFlowPrompt").value;
  const output = document.getElementById("gptQuestions");

  if (!prompt.trim()) {
    showToast("Please enter a developer prompt.", "warning");
    return;
  }

  const context = await loadProjectContext();

  const response = await fetch("/api/nexucore/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, context, mode: "developer" })
  });

  const result = await response.json();

  if (result.reply) {
    document.getElementById("gptQuestionsBox").style.display = "block";
    output.value = result.reply;
  } else {
    showToast("No GPT response returned.", "error");
  }
}

export function applyGptSuggestion() {
  const suggestion = document.getElementById("gptQuestions").value;
  const htmlEditor = document.getElementById("htmlEditor");
  htmlEditor.value += `\n\n<!-- 💡 Applied GPT Suggestion -->\n${suggestion}`;
  applyCustomCode();
  updateCommandHistory("✅ Applied GPT suggestion");
}

export function copyGptSuggestion() {
  const suggestion = document.getElementById("gptQuestions").value;
  navigator.clipboard.writeText(suggestion).then(() => {
    alert("📋 GPT suggestion copied to clipboard!");
  });
}

export function clearGptSuggestion() {
  document.getElementById("gptQuestions").value = "";
  document.getElementById("gptQuestionsBox").style.display = "none";
  updateCommandHistory("🧽 Cleared GPT Developer suggestion box");
}
