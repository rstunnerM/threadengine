// ========== GHOSTWIRE PANEL LOGIC ==========

// 📂 Open panel with optional default message
function openGhostwire(suggestion = "💡 ThreadEngine is thinking...") {
  const panel = document.getElementById("ghostwirePanel");
  const content = document.getElementById("ghostwireContent");
  content.innerText = suggestion;
  panel.style.display = "block";
}

// ❌ Close the Ghostwire panel
function closeGhostwire() {
  document.getElementById("ghostwirePanel").style.display = "none";
}

// ✅ Accept suggestion and apply to HTML editor
function acceptGhostSuggestion() {
  const suggestion = document.getElementById("ghostwireContent").innerText;
  const htmlEditor = document.getElementById("htmlEditor");
  htmlEditor.value += `\n\n<!-- 👻 Ghostwire Suggestion -->\n${suggestion}`;
  applyCustomCode();
  pushHistory(document.getElementById("designCanvas").innerHTML);
  closeGhostwire();
}

// 📋 Copy suggestion to clipboard
function copyGhostwireSuggestion() {
  const content = document.getElementById("ghostwireContent").innerText;
  navigator.clipboard.writeText(content).then(() => {
    alert("📋 Copied Ghostwire suggestion!");
  });
}

// 🔄 Refresh based on dropdown category
async function refreshGhostwire() {
  const currentHTML = document.getElementById("htmlEditor").value;
  const suggestionType = document.getElementById("ghostwireType").value;
  const content = document.getElementById("ghostwireContent");

  content.innerText = "⚙️ Generating suggestion...";

  try {
    const res = await fetch("http://localhost:3000/devmode/suggestion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        html: currentHTML,
        category: suggestionType
      })
    });

    const data = await res.json();
    content.innerText = data.suggestion || "No suggestions returned.";
  } catch (err) {
    console.error("Ghostwire Fetch Error:", err);
    content.innerText = "❌ Error fetching suggestion.";
  }
}

// ➖/➕ Fold & Expand Toggle
let isGhostwireFolded = false;
function toggleGhostwireFold() {
  const body = document.getElementById("ghostwireBody");
  const toggleBtn = document.querySelector(".ghostwire-toggle");
  if (!body || !toggleBtn) return;
  isGhostwireFolded = !isGhostwireFolded;
  body.style.display = isGhostwireFolded ? "none" : "block";
  toggleBtn.textContent = isGhostwireFolded ? "+" : "—";
}

// 🖱️ Dragging Logic
let isDragging = false, offsetX, offsetY;

function startDrag(e) {
  const panel = document.getElementById("ghostwirePanel");
  isDragging = true;
  offsetX = e.clientX - panel.getBoundingClientRect().left;
  offsetY = e.clientY - panel.getBoundingClientRect().top;
  document.addEventListener("mousemove", dragPanel);
  document.addEventListener("mouseup", stopDrag);
}

function dragPanel(e) {
  if (!isDragging) return;
  const panel = document.getElementById("ghostwirePanel");
  panel.style.left = `${e.clientX - offsetX}px`;
  panel.style.top = `${e.clientY - offsetY}px`;
  panel.style.bottom = "auto";
  panel.style.right = "auto";
}

function stopDrag() {
  isDragging = false;
  document.removeEventListener("mousemove", dragPanel);
  document.removeEventListener("mouseup", stopDrag);
}
