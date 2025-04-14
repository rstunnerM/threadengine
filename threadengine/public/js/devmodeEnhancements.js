// devmodeEnhancements.js — Feature Expansions for ThreadEngine GPT Developer Mode

// 🧠 Persistent Memory Window
let devMemoryLog = [];

function openMemoryWindow() {
  const memory = devMemoryLog.join("\n• ");
  alert("🧠 Developer Memory Log:\n\n• " + (memory || "Nothing stored yet."));
}

function logToMemory(note) {
  if (!note) return;
  devMemoryLog.push(note);
  updateCommandHistory("🧠 Logged to memory: " + note);
}

// ♻️ Self-Refinement Suggestions
async function runSelfRefinement() {
  const html = document.getElementById("htmlEditor").value;
  const css = document.getElementById("cssEditor").value;
  const js = document.getElementById("jsEditor").value;

  const output = document.getElementById("gptQuestions");
  output.value = "♻️ Asking GPT for refinement suggestions...";

  try {
    const res = await fetch("/devmode/suggestion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestType: "refactor-review",
        html,
        css,
        js
      })
    });

    const data = await res.json();
    output.value = data.suggestion || "⚠️ No refinements suggested.";
  } catch (err) {
    output.value = "❌ Error during self-refinement.";
    console.error("Refinement Error:", err);
  }
}

// 🎨 GPT-Chosen UI Improvements
async function runUiSuggestions() {
  const html = document.getElementById("htmlEditor").value;
  const output = document.getElementById("gptQuestions");
  output.value = "🎨 Gathering UI improvement ideas...";

  try {
    const res = await fetch("/devmode/suggestion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestType: "ui-improve",
        html,
        role: "product-designer"
      })
    });

    const data = await res.json();
    output.value = data.suggestion || "🧐 No UI improvements found.";
  } catch (err) {
    output.value = "❌ UI suggestion error.";
    console.error("UI Suggestion Error:", err);
  }
}

// 🧩 Debug Trace Walkthroughs
async function traceDebugFlow() {
  const jsCode = document.getElementById("jsEditor").value;
  const output = document.getElementById("gptQuestions");
  output.value = "🧩 Creating walkthrough...";

  try {
    const res = await fetch("/devmode/suggestion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestType: "debug-trace",
        js: jsCode
      })
    });

    const data = await res.json();
    output.value = data.suggestion || "🧪 No logic trace returned.";
  } catch (err) {
    output.value = "❌ Debug trace failed.";
    console.error("Debug Trace Error:", err);
  }
}

// 🎙️ Embedded Voice Assistant Mode (Prototype)
function activateVoiceMode() {
  alert("🎙️ Voice Assistant Mode will soon use your prompts to activate actions. Stay tuned!");
  updateCommandHistory("🎙️ Voice Assistant activated (prototype)");
}
