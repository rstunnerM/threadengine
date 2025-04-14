// /utils/editorTools.js
import { pushHistory, updateCommandHistory } from "../server/utils/history.js";

export function applyCustomCode() {
  const html = document.getElementById("htmlEditor").value;
  const css = document.getElementById("cssEditor").value;
  const js = document.getElementById("jsEditor").value;
  const canvas = document.getElementById("designCanvas");

  canvas.innerHTML = html;

  let styleTag = document.getElementById("customStyle");
  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = "customStyle";
    document.head.appendChild(styleTag);
  }
  styleTag.innerHTML = css;

  try {
    new Function(js)();
  } catch (e) {
    console.error("JS Error:", e);
  }

  updateCommandHistory("🚀 Custom code applied.");
}

export function insertLayout(type) {
  const layouts = {
    hero: "<section><h1>Hero Section</h1></section>",
    navbar: "<nav>Navbar</nav>",
    footer: "<footer>Footer</footer>",
  };
  addToCanvas(layouts[type]);
}

export function addElement(type) {
  const elements = {
    button: "<button>Click me</button>",
    image: "<img src='https://placehold.co/150'>",
    heading: "<h3>Heading</h3>",
  };
  addToCanvas(elements[type]);
}

export function addToCanvas(html) {
  const canvas = document.getElementById("designCanvas");
  canvas.innerHTML += html;
  pushHistory(canvas.innerHTML);
}

export function uploadImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const img = `<img src="${e.target.result}">`;
    document.getElementById("designCanvas").innerHTML += img;
    pushHistory(document.getElementById("designCanvas").innerHTML);
  };
  reader.readAsDataURL(file);
}

export function changeFontFamily(font) {
  document.execCommand("fontName", false, font);
}

export function changeFontSize(size) {
  document.execCommand("styleWithCSS", true, null);
  document.execCommand("fontSize", false, "7");

  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const elements = document.querySelectorAll("font[size='7']");
    elements.forEach((el) => {
      el.removeAttribute("size");
      el.style.fontSize = size;
    });
  }
}

export function changeFontColor(color) {
  document.execCommand("foreColor", false, color);
  pushHistory(document.getElementById("designCanvas").innerHTML);
}

export function formatText(command) {
  document.execCommand(command, false, null);
}

export function enablePaintMode(toggle = null) {
  let paintMode = toggle !== null ? toggle : !enablePaintMode.active;
  enablePaintMode.active = paintMode;

  const canvas = document.getElementById("designCanvas");
  canvas.style.cursor = paintMode ? "crosshair" : "default";

  if (paintMode) {
    canvas.addEventListener("click", paintElement);
  } else {
    canvas.removeEventListener("click", paintElement);
  }
}

enablePaintMode.active = false;

export function paintElement(e) {
  const selectedColor = document.getElementById("canvasColorPicker").value;
  if (e.target !== document.getElementById("designCanvas")) {
    e.target.style.backgroundColor = selectedColor;
  }
}

export function clearFormatting() {
  const elements = document.querySelectorAll("#designCanvas *");
  elements.forEach((el) => el.removeAttribute("style"));
  pushHistory(document.getElementById("designCanvas").innerHTML);
}
