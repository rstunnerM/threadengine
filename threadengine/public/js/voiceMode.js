// voiceMode.js — ThreadEngine Voice Command Trigger

let recognition;
let isListening = false;

export function startVoiceRecognition() {
  if (!("webkitSpeechRecognition" in window)) {
    alert("Your browser doesn't support voice recognition.");
    return;
  }

  recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  recognition.onstart = () => {
    isListening = true;
    console.log("🎙️ Listening for command...");
  };

  recognition.onend = () => {
    isListening = false;
    console.log("🛑 Voice recognition stopped.");
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.trim();
    console.log("🧠 Heard:", transcript);
    handleVoiceCommand(transcript);
  };

  recognition.onerror = (e) => {
    console.error("Voice recognition error:", e);
  };

  recognition.start();
}

function handleVoiceCommand(text) {
  const lower = text.toLowerCase();

  // === 🎨 Generate Mode
  if (lower.startsWith("generate")) {
    const prompt = text.replace(/generate/i, "").trim();
    const htmlEditor = document.getElementById("htmlEditor");
    const generateBtn = document.getElementById("generateBtn");

    htmlEditor.value = prompt;
    generateBtn.click();
    return;
  }

  // === 🧠 Modify Mode
  if (lower.startsWith("modify")) {
    const instruction = text.replace(/modify/i, "").trim();
    const modInput = document.getElementById("modInstruction");
    const modBtn = document.getElementById("modBtn");

    modInput.value = instruction;
    modBtn.click();
    return;
  }

  // ✨ Fallback Command Example
  alert(`Voice command not recognized: "${text}"`);
}
