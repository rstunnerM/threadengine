// customCode.js — Apply HTML, CSS, JS from editor to canvas

function applyCustomCode() {
    const html = document.getElementById("htmlEditor").value;
    const css = document.getElementById("cssEditor").value;
    const js = document.getElementById("jsEditor").value;
    const canvas = document.getElementById("designCanvas");
  
    // Inject HTML into canvas
    canvas.innerHTML = html;
  
    // Inject CSS into <style> tag
    let styleTag = document.getElementById("customStyle");
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "customStyle";
      document.head.appendChild(styleTag);
    }
    styleTag.innerHTML = css;
  
    // Run JavaScript
    try {
      new Function(js)(); // Use cautiously — user code
    } catch (e) {
      console.error("JS Execution Error:", e);
      alert("⚠️ JavaScript Error: " + e.message);
    }
  
    // Save state
    if (typeof pushHistory === "function") {
      pushHistory(canvas.innerHTML);
    }
  }
  