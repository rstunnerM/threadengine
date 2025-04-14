// history.js — 🕘 Undo/Redo logic for ThreadEngine

let commandHistory = [];
let currentIndex = -1;

// Save new canvas state to history
function pushHistory(state) {
  commandHistory = commandHistory.slice(0, currentIndex + 1); // Trim future history if rewriting
  commandHistory.push(state);
  currentIndex++;
  updateHistoryDisplay();
}

// Undo to previous canvas state
function undoCommand() {
  if (currentIndex > 0) {
    currentIndex--;
    document.getElementById("designCanvas").innerHTML = commandHistory[currentIndex];
    updateHistoryDisplay();
  }
}

// Redo to next canvas state
function redoCommand() {
  if (currentIndex < commandHistory.length - 1) {
    currentIndex++;
    document.getElementById("designCanvas").innerHTML = commandHistory[currentIndex];
    updateHistoryDisplay();
  }
}

// Clear history log (but not the canvas)
function clearCommandHistory() {
  commandHistory = [];
  currentIndex = -1;
  document.getElementById("commandHistory").value = "";
}

// Display history in text box (optional UI panel)
function updateHistoryDisplay() {
  const display = document.getElementById("commandHistory");
  if (display) {
    display.value = commandHistory.map((item, i) =>
      `${i === currentIndex ? "➡️" : "  "} Step ${i + 1}\n${item.substring(0, 80)}...\n`
    ).join("\n");
  }
}
