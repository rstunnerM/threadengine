// Visual Effects & GPT Assistant Integration for ThreadEngine
// Contains settings toggles, shimmer effect, GPT suggestion box logic, and view management.
// == SETTINGS AND VISUAL EFFECTS MANAGER ==

// Settings state
const settings = {
  galaxy: true,
  aurora: false,
  nebula: false,
  stars: true,
};

// Inject settings button UI
function createSettingsToggleButton() {
  const btn = document.createElement("button");
  btn.innerHTML = "⚙️";
  btn.className = "settings-toggle";
  btn.title = "ThreadEngine Visual Settings";
  btn.onclick = toggleSettingsPanel;
  document.body.appendChild(btn);
}

// Create panel UI
function createSettingsPanel() {
  const panel = document.createElement("div");
  panel.id = "settingsPanel";
  panel.className = "floating-settings";
  panel.innerHTML = `
    <h3>✨ Visual Settings</h3>
    <label><input type="checkbox" id="toggleGalaxy" checked> Galaxy Background</label>
    <label><input type="checkbox" id="toggleAurora"> Aurora Waves</label>
    <label><input type="checkbox" id="toggleNebula"> Nebula Fog</label>
    <label><input type="checkbox" id="toggleStars" checked> Shooting Stars</label>
    <button onclick="closeSettingsPanel()">Close</button>
  `;
  document.body.appendChild(panel);

  document.getElementById("toggleGalaxy").addEventListener("change", e => toggleEffect("galaxy", e.target.checked));
  document.getElementById("toggleAurora").addEventListener("change", e => toggleEffect("aurora", e.target.checked));
  document.getElementById("toggleNebula").addEventListener("change", e => toggleEffect("nebula", e.target.checked));
  document.getElementById("toggleStars").addEventListener("change", e => toggleEffect("stars", e.target.checked));
}

function toggleSettingsPanel() {
  const panel = document.getElementById("settingsPanel");
  panel.style.display = panel.style.display === "block" ? "none" : "block";
}

function closeSettingsPanel() {
  document.getElementById("settingsPanel").style.display = "none";
}

// Toggle visual effects
function toggleEffect(effect, enabled) {
  settings[effect] = enabled;
  document.body.classList.toggle(`${effect}-enabled`, enabled);

  const galaxyElements = document.querySelectorAll(".stars, .twinkling, .comets");

  if (effect === "galaxy") {
    galaxyElements.forEach(el => el.style.display = enabled ? "block" : "none");
  }
  if (effect === "aurora") {
    toggleAuroraEffect(enabled);
  }
  if (effect === "nebula") {
    toggleNebulaEffect(enabled);
  }
  if (effect === "stars") {
    toggleShootingStars(enabled);
  }
}

// Enable/Disable Aurora
function toggleAuroraEffect(enabled) {
  let aurora = document.getElementById("auroraEffect");
  if (!aurora && enabled) {
    aurora = document.createElement("div");
    aurora.id = "auroraEffect";
    aurora.className = "aurora-layer";
    document.body.appendChild(aurora);
  } else if (aurora && !enabled) {
    aurora.remove();
  }
}

// Enable/Disable Nebula
function toggleNebulaEffect(enabled) {
  let nebula = document.getElementById("nebulaEffect");
  if (!nebula && enabled) {
    nebula = document.createElement("div");
    nebula.id = "nebulaEffect";
    nebula.className = "nebula-layer";
    document.body.appendChild(nebula);
  } else if (nebula && !enabled) {
    nebula.remove();
  }
}

// Enable/Disable Shooting Stars
function toggleShootingStars(enabled) {
  const existing = document.querySelectorAll(".shooting-star");
  if (enabled && existing.length === 0) {
    for (let i = 0; i < 3; i++) {
      const star = document.createElement("div");
      star.className = "shooting-star";
      document.body.appendChild(star);
    }
  } else if (!enabled) {
    existing.forEach(star => star.remove());
  }
}

// Auto GPT responder
function setupGptTextInterceptors() {
  const observer = new MutationObserver(() => {
    const textareas = document.querySelectorAll("textarea");
    textareas.forEach(textarea => {
      if (!textarea.dataset.gptHooked) {
        textarea.addEventListener("input", () => handleGptSuggestion(textarea));
        textarea.dataset.gptHooked = true;
      }
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

async function handleGptSuggestion(textarea) {
  const value = textarea.value.trim();
  if (!value || value.length < 10) return;

  const response = await fetch("http://localhost:3000/devmode/assist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: value })
  });

  const data = await response.json();
  if (data?.response && !value.includes(data.response)) {
    const canvas = document.getElementById("designCanvas");
    const previewBox = document.createElement("div");
    previewBox.className = "gpt-preview-box";
    previewBox.innerHTML = `
      <div class="gpt-preview-suggestion">
        <h4>💡 GPT Suggestion</h4>
        <pre>${data.response}</pre>
        <div class="gpt-preview-actions">
          <button onclick="acceptGptCanvasSuggestion(this)">✅ Accept</button>
          <button onclick="this.parentElement.parentElement.remove()">❌ Dismiss</button>
        </div>
      </div>
    `;
    canvas.appendChild(previewBox);
  }
}

function acceptGptCanvasSuggestion(btn) {
  const code = btn.parentElement.previousElementSibling.innerText;
  document.getElementById("htmlEditor").value += `\n\n<!-- GPT Suggestion -->\n${code}`;
  applyCustomCode();
  btn.closest(".gpt-preview-box").remove();
}

// == INITIALIZE ==
document.addEventListener("DOMContentLoaded", () => {
  createSettingsToggleButton();
  createSettingsPanel();
  setupGptTextInterceptors();

  // Apply effects on load based on default state
  Object.entries(settings).forEach(([key, val]) => toggleEffect(key, val));
});
function showCanvasGptSuggestion(suggestedHTML) {
  const canvas = document.getElementById('designCanvas');
  const suggestionBox = document.createElement('div');
  suggestionBox.className = 'gpt-canvas-suggestion';
  suggestionBox.innerHTML = `
    <div class="gpt-canvas-suggestion-preview">
      ${suggestedHTML}
    </div>
    <div class="gpt-canvas-suggestion-buttons">
      <button onclick="acceptCanvasGptSuggestion(${JSON.stringify(suggestedHTML)}, document.getElementById('designCanvas'))">✅ Accept</button>
      <button onclick="this.closest('.gpt-canvas-suggestion').remove()">❌ Dismiss</button>
    </div>function runCanvasGptBuilder() {
  const promptBox = document.getElementById("prompt");
  const prompt = promptBox?.value?.trim();

  if (!prompt || prompt.length < 10) {
    alert("Please describe what you'd like to build! ✍️");
    return;
  }

  showGptThinkingEffect();

  fetch("http://localhost:3000/devmode/assist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  })
    .then(res => res.json())
    .then(data => {
      removeGptThinkingEffect();
      if (data?.response) {
        showCanvasGptSuggestion(data.response);
      } else {
        alert("⚠️ GPT returned no suggestion.");
      }
    })
    .catch(err => {
      console.error("GPT Request Error", err);
      removeGptThinkingEffect();
      alert("❌ GPT request failed.");
    });
}

  `;

  // Remove any previous suggestions
  const previous = canvas.querySelector('.gpt-canvas-suggestion');
  if (previous) previous.remove();

  canvas.appendChild(suggestionBox);
}
function acceptCanvasGptSuggestion(html, targetCanvas) {
  const fadeOut = targetCanvas.querySelector('.gpt-canvas-suggestion');
  if (fadeOut) {
    fadeOut.style.transition = 'opacity 0.5s ease';
    fadeOut.style.opacity = 0;
    setTimeout(() => fadeOut.remove(), 500);
  }

  // Apply the suggestion to the canvas
  targetCanvas.innerHTML += `\n<!-- GPT Suggestion -->\n${html}`;

  // Optional: Save to history if you have undo functionality
  if (typeof pushHistory === 'function') {
    pushHistory(targetCanvas.innerHTML);
  }
}
async function handleGptSuggestion(textarea) {
  const value = textarea.value.trim();
  if (!value || value.length < 10) return;

  const response = await fetch("http://localhost:3000/devmode/assist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: value })
  });

  const data = await response.json();

  if (data?.response) {
    showCanvasGptSuggestion(data.response); // ✅ Already implemented here
  }
  
}

