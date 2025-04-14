export async function queryNexuCore(promptText, context = '', mode = 'debug-console') {
    try {
      const res = await fetch("/api/nexucore/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptText, context, mode })
      });
      const data = await res.json();
      return data.reply;
    } catch (err) {
      console.error("❌ GPT Query Failed:", err);
      return "⚠️ GPT query failed. See console.";
    }
  }
  