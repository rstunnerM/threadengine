import { queryNexuCore } from './nexuCoreBridge.js';

export async function loadProjectContext() {
  const files = ["index.html", "css/styles.css", "js/script.js", "js/ai.js"];
  const context = {};

  for (let file of files) {
    try {
      const res = await fetch(`/api/files/read/${file}`);
      context[file] = res.ok ? await res.text() : `/* File not found: ${file} */`;
    } catch (err) {
      context[file] = `/* Error reading ${file}: ${err.message} */`;
    }
  }

  return context;
}

export function handleDebugSubmit() {
  const promptText = document.getElementById("debugInput").value;

  const html = document.getElementById("htmlEditor")?.value || '';
  const css = document.getElementById("cssEditor")?.value || '';
  const js = document.getElementById("jsEditor")?.value || '';
  const fullContext = `HTML:\n${html}\n\nCSS:\n${css}\n\nJS:\n${js}`;

  queryNexuCore(promptText, fullContext).then(reply => {
    const outputPanel = document.getElementById("debugOutput");
    outputPanel.innerText = reply;
    outputPanel.classList.add("gpt-accepted-flash");
  });
}
