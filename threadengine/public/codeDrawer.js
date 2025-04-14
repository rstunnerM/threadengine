let currentTab = "html";
let pinnedOpen = false;

export function openCodeDrawer(target = "html", code = "") {
  currentTab = target;
  document.getElementById("codeDrawer").classList.add("show");
  document.getElementById("drawerEditor").value = code;
}

export function switchCodeTab(tab) {
  currentTab = tab;
  const content = document.getElementById(`${tab}Editor`)?.value || "";
  document.getElementById("drawerEditor").value = content;
}

export function closeCodeDrawer() {
  if (!pinnedOpen) {
    document.getElementById("codeDrawer").classList.remove("show");
  }
}

export function toggleDrawerPin() {
  pinnedOpen = !pinnedOpen;
  const btn = document.getElementById("drawerPinBtn");
  btn.textContent = pinnedOpen ? "📌 Unpin" : "📌 Pin";
}

export function syncDrawerToEditor() {
  const content = document.getElementById("drawerEditor").value;
  const editorId = currentTab + "Editor";
  const editor = document.getElementById(editorId);
  if (editor) {
    editor.value = content;
    showToast(`✅ Updated ${editorId} from drawer`, "success");
  } else {
    showToast(`❌ No editor found for tab '${currentTab}'`, "error");
  }
}

export function applyDrawerToCanvas() {
  const html = document.getElementById("htmlEditor")?.value || '';
  const css = document.getElementById("cssEditor")?.value || '';
  const js = document.getElementById("jsEditor")?.value || '';

  const fullCode = `
    <style>${css}</style>
    ${html}
    <script>${js}<\/script>
  `;

  const preview = document.getElementById("previewFrame");
  const canvas = document.getElementById("designCanvas");

  preview.srcdoc = fullCode;
  canvas.innerHTML = html;

  showToast("🚀 Canvas updated from editor code", "success");
}
