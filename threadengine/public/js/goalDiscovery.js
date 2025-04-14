// goalDiscovery.js — ThreadEngine GPT Goal Discovery Assistant

let discoveryStage = 0;
const discoveryData = {};

const discoveryQuestions = [
  {
    key: "goalType",
    question: "👋 Hi! What are you trying to build today?",
    placeholder: "e.g., A personal blog, portfolio, store, app..."
  },
  {
    key: "features",
    question: "🔧 What features do you want?",
    placeholder: "e.g., contact form, gallery, login, product list..."
  },
  {
    key: "style",
    question: "🎨 Any style or aesthetic you're going for?",
    placeholder: "e.g., modern, playful, dark theme, minimalist..."
  },
  {
    key: "targetAudience",
    question: "👥 Who’s this for?",
    placeholder: "e.g., clients, employers, general public..."
  },
  {
    key: "platforms",
    question: "🌐 Do you plan to launch this anywhere specific?",
    placeholder: "e.g., GitHub Pages, personal domain, app store..."
  }
];

function startGoalDiscovery() {
  discoveryStage = 0;
  Object.keys(discoveryData).forEach(key => delete discoveryData[key]);
  showNextDiscoveryQuestion();
}

function showNextDiscoveryQuestion() {
  const { question, placeholder, key } = discoveryQuestions[discoveryStage];
  const container = document.getElementById("discoveryAssistantBox");
  container.innerHTML = `
    <label>${question}</label>
    <textarea id="discoveryInput" placeholder="${placeholder}" rows="2"></textarea>
    <button onclick="submitDiscoveryAnswer('${key}')">Next ➡️</button>
  `;
  container.style.display = "block";
}

function submitDiscoveryAnswer(key) {
  const input = document.getElementById("discoveryInput").value.trim();
  if (!input) return;
  discoveryData[key] = input;
  discoveryStage++;
  if (discoveryStage < discoveryQuestions.length) {
    showNextDiscoveryQuestion();
  } else {
    finishGoalDiscovery();
  }
}

function finishGoalDiscovery() {
  const summary = `🧠 Based on what you said, we’ll build:

• A: ${discoveryData.goalType}
• With: ${discoveryData.features}
• Style: ${discoveryData.style}
• For: ${discoveryData.targetAudience}
• Deploying on: ${discoveryData.platforms}`;

  document.getElementById("discoveryAssistantBox").innerHTML = `
    <pre style="white-space: pre-wrap; font-family: inherit;">${summary}</pre>
    <button onclick="applyDiscoveryPlan()">🚀 Build it!</button>
  `;
}

function applyDiscoveryPlan() {
  const prompt = `Create a ${discoveryData.goalType} with ${discoveryData.features}, styled as ${discoveryData.style}, for ${discoveryData.targetAudience}. Output clean HTML/CSS/JS suitable for launch on ${discoveryData.platforms}.`;
  document.getElementById("devFlowPrompt").value = prompt;
  startDevFlow();
  document.getElementById("discoveryAssistantBox").style.display = "none";
}

// ✅ Export for server compatibility
export { startGoalDiscovery as initializeGoalDiscovery };
