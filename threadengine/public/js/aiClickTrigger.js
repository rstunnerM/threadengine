document.addEventListener("DOMContentLoaded", () => {
    const clickBtn = document.getElementById("clickDesignBtn");
    const canvas = document.getElementById("designCanvas");
    const promptInput = document.getElementById("prompt");
    const chime = document.getElementById("chimeSound");
  
    if (!clickBtn || !canvas || !promptInput) return;
  
    clickBtn.addEventListener("click", async () => {
      const prompt = promptInput.value.trim();
      if (!prompt) {
        alert("Please enter a design prompt.");
        return;
      }
  
      clickBtn.disabled = true;
      clickBtn.textContent = "🧠 Generating...";
      if (chime) chime.play();
  
      try {
        const response = await fetch("/api/nexucore/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt })
        });
  
        const { reply } = await response.json();
        canvas.innerHTML = `<div class="gpt-canvas-suggestion fade-in-html applied">${reply}</div>`;
      } catch (err) {
        console.error("GPT generation failed:", err);
        alert("Error generating design. Check console.");
      } finally {
        clickBtn.disabled = false;
        clickBtn.textContent = "✨ Design with GPT";
      }
    });
  });
  