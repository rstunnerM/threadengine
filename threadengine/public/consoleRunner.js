import { loadProjectContext } from './utils.js';

export async function runGptConsole() {
  const input = document.getElementById("gptConsole").value.trim();
  const output = document.getElementById("gptConsoleOutput");
  if (!input) {
    showToast("Enter a prompt before running GPT console.", "warning");
    return;
  }

  output.textContent = "🤖 Thinking...";
  const context = await loadProjectContext();

  const res = await fetch("/api/nexucore/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: input, context, mode: "debug-console" })
  });

  const data = await res.json();
  output.textContent = data.reply || "⚠️ No response from NexuCore.";
}
