// ===== Text Formatting Commands =====
function formatText(command, value = null) {
    document.execCommand(command, false, value);
    pushHistory(document.getElementById("designCanvas").innerHTML);
  }
  
  function changeFontFamily(font) {
    formatText("fontName", font);
  }
  
  function changeFontSize(size) {
    document.execCommand("styleWithCSS", true, null);
    document.execCommand("fontSize", false, "7");
  
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const elements = document.querySelectorAll("font[size='7']");
      elements.forEach(el => {
        el.removeAttribute("size");
        el.style.fontSize = size;
      });
    }
  
    pushHistory(document.getElementById("designCanvas").innerHTML);
  }
  
  function changeFontColor(color) {
    formatText("foreColor", color);
  }
  
  function alignText(direction) {
    formatText(`justify${direction}`);
  }
  
  function clearFormatting() {
    const elements = document.querySelectorAll("#designCanvas *");
    elements.forEach(el => el.removeAttribute("style"));
    pushHistory(document.getElementById("designCanvas").innerHTML);
  }
  
  // Optional: Toolbar button bindings (if needed separately)
  document.addEventListener("DOMContentLoaded", () => {
    const toolbar = document.getElementById("textToolbar");
    if (toolbar) toolbar.style.display = "block";
  });
  