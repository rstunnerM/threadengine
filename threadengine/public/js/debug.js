// debug.js — 🐞 GPT Bug Analyzer for ThreadEngine

// Triggered when clicking the 🧠 Analyze Bug button
async function analyzeBugWithGpt() {
    const debugPrompt = document.getElementById("debugPrompt").value;
    const html = document.getElementById("htmlEditor").value;
    const css = document.getElementById("cssEditor").value;
    const js = document.getElementById("jsEditor").value;
    const contextCode = `HTML:\n${html}\n\nCSS:\n${css}\n\nJS:\n${js}`;
  
    const debugBox = document.getElementById("debugSuggestionsBox");
    const suggestions = document.getElementById("debugSuggestions");
  
    debugBox.style.display = "block";
    suggestions.value = "🔎 GPT is analyzing your issue...";
  
    try {
      const res = await fetch("http://localhost:3000/devmode/flow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contextCode,
          userInput: debugPrompt
        })
      });
  
      const data = await res.json();
      suggestions.value = data.reply || "No issues found, or GPT had no suggestions.";
    } catch (err) {
      console.error("GPT Debug Error:", err);
      suggestions.value = "⚠️ An error occurred during debugging.";
    }
  }
  
  // Utility: Copy debug suggestion to clipboard
  function copyDebugSuggestion() {
    const debugText = document.getElementById("debugSuggestions");
    debugText.select();
    document.execCommand("copy");
    alert("📋 Debug suggestion copied!");
  }
  
  // Utility: Clear debug suggestion box
  function clearDebugSuggestion() {
    document.getElementById("debugSuggestions").value = "";
    document.getElementById("debugSuggestionsBox").style.display = "none";
  }
  