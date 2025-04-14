// ========== Website Builder with GPT ==========
function showToast(message, type = "info", duration = 5000) {
  const toast = document.getElementById("toastBox");
  if (!toast) return;

  let bgColor = "#333";
  let emoji = "ℹ️";

  switch (type) {
    case "success":
      bgColor = "rgba(0, 200, 120, 0.95)";
      emoji = "✅";
      break;
    case "error":
      bgColor = "rgba(255, 60, 60, 0.95)";
      emoji = "❌";
      break;
    case "warning":
      bgColor = "rgba(255, 165, 0, 0.95)";
      emoji = "⚠️";
      break;
    case "debug":
      bgColor = "rgba(0, 100, 255, 0.95)";
      emoji = "🧪";
      break;
    default:
      bgColor = "rgba(60, 60, 60, 0.95)";
      emoji = "ℹ️";
  }

  toast.style.background = bgColor;
  toast.textContent = `${emoji} ${message}`;
  toast.style.display = "block";

  clearTimeout(toast.dataset.timeoutId);
  const timeoutId = setTimeout(() => {
    toast.style.display = "none";
  }, duration);
  toast.dataset.timeoutId = timeoutId;
}


async function runCanvasGptBuilder() {
  const prompt = document.getElementById("prompt").value;
  const useAIImage = document.getElementById("useAIImage").checked;
  const html = document.getElementById("htmlEditor").value;
  const css = document.getElementById("cssEditor").value;
  const js = document.getElementById("jsEditor").value;

  if (!prompt.trim()) return alert("Please enter a prompt.");

  const hasContent = html.trim() || css.trim() || js.trim();
  const endpoint = hasContent ? "/modify-canvas" : "/generate";

  const body = hasContent
    ? {
        html: `${html}\n<style>${css}</style>\n<script>${js}</script>`,
        instruction: prompt
      }
    : { prompt, useAIImage };

  try {
    document.getElementById("gptLoader").style.display = "block";
    document.getElementById("gptFeedback").style.display = "none";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    document.getElementById("gptLoader").style.display = "none";

    if (!response.ok) throw new Error("Server error");

    const data = await response.json();
    const result = data.modifiedHTML || data.html || "<p>⚠️ No content returned.</p>";

    document.getElementById("htmlEditor").value = result;
    const designCanvas = document.getElementById("designCanvas");
    designCanvas.innerHTML = result;
    document.getElementById("previewFrame").srcdoc = result;

    designCanvas.contentEditable = true;
    const showGuides = localStorage.getItem("threadengine-guides") !== "false";
    designCanvas.dataset.showGuides = showGuides;
    designCanvas.style.resize = "both";
    designCanvas.style.overflow = "auto";
    designCanvas.style.minHeight = "300px";

    const feedbackText = result
      .replace(/<[^>]*>?/gm, "")
      .split("\n")
      .slice(0, 5)
      .join("\n")
      .trim();

    if (feedbackText) {
      document.getElementById("gptFeedback").textContent = `📝 GPT says:\n${feedbackText}`;
      document.getElementById("gptFeedback").style.display = "block";
    }

    designCanvas.addEventListener("mousemove", (e) => {
      if (designCanvas.dataset.showGuides !== "true") return;

      const elements = Array.from(designCanvas.children);
      const canvasRect = designCanvas.getBoundingClientRect();
      const mouseX = e.clientX - canvasRect.left;
      const mouseY = e.clientY - canvasRect.top;

      const guides = document.querySelectorAll(".alignment-guide");
      guides.forEach((g) => g.remove());

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const relLeft = rect.left - canvasRect.left;
        const relTop = rect.top - canvasRect.top;

        if (Math.abs(relLeft - mouseX) < 8) {
          const vLine = document.createElement("div");
          vLine.className = "alignment-guide";
          vLine.style.cssText = `
            position: absolute;
            left: ${relLeft}px;
            top: 0;
            height: 100%;
            width: 1px;
            background: #00ffc8;
            z-index: 9999;
          `;
          designCanvas.appendChild(vLine);
        }

        if (Math.abs(relTop - mouseY) < 8) {
          const hLine = document.createElement("div");
          hLine.className = "alignment-guide";
          hLine.style.cssText = `
            position: absolute;
            top: ${relTop}px;
            left: 0;
            width: 100%;
            height: 1px;
            background: #00ffc8;
            z-index: 9999;
          `;
          designCanvas.appendChild(hLine);
        }
      });
    });

  } catch (err) {
    console.error("GPT generation failed:", err);
    showToast("❌ GPT generation failed:\n" + err.message);
    document.getElementById("gptLoader").style.display = "none";
  }
}
