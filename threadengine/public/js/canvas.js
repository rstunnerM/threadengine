// ========== ThreadEngine Canvas Interaction ==========

let selectedElements = [];

function makeCanvasElementsDraggable() {
  const canvas = document.getElementById("designCanvas");
  const SNAP_TOLERANCE = 8;

  Array.from(canvas.children).forEach((el) => {
    el.style.position = "absolute";
    el.style.cursor = "move";
    el.setAttribute("draggable", "false");

    el.addEventListener("click", (e) => {
      if (e.shiftKey) {
        if (selectedElements.includes(el)) {
          el.classList.remove("selected");
          selectedElements = selectedElements.filter((item) => item !== el);
        } else {
          el.classList.add("selected");
          selectedElements.push(el);
        }
      } else {
        selectedElements.forEach((item) => item.classList.remove("selected"));
        selectedElements = [el];
        el.classList.add("selected");
      }
    });

    let offsetX, offsetY, isDragging = false;

    el.addEventListener("mousedown", (e) => {
      if (!selectedElements.includes(el)) {
        selectedElements.forEach((item) => item.classList.remove("selected"));
        selectedElements = [el];
        el.classList.add("selected");
      }
      isDragging = true;
      offsetX = e.clientX - el.getBoundingClientRect().left;
      offsetY = e.clientY - el.getBoundingClientRect().top;
      selectedElements.forEach(item => item.style.zIndex = 1001);
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;

      const canvasRect = canvas.getBoundingClientRect();
      const deltaX = e.clientX - canvasRect.left - offsetX - el.offsetLeft;
      const deltaY = e.clientY - canvasRect.top - offsetY - el.offsetTop;

      selectedElements.forEach((item, index) => {
        let x = item.offsetLeft + deltaX;
        let y = item.offsetTop + deltaY;

        if (index === 0) {
          const guides = document.querySelectorAll(".alignment-guide");
          guides.forEach((g) => g.remove());

          Array.from(canvas.children).forEach((other) => {
            if (selectedElements.includes(other)) return;
            const r = other.getBoundingClientRect();
            const c = canvas.getBoundingClientRect();
            const otherLeft = r.left - c.left;
            const otherTop = r.top - c.top;
            const otherCenterX = otherLeft + r.width / 2;
            const otherCenterY = otherTop + r.height / 2;

            function drawGuideLine(type, position) {
              const guide = document.createElement("div");
              guide.className = "alignment-guide";
              guide.style.position = "absolute";
              guide.style.background = "#00ffc8";
              guide.style.zIndex = "1000";

              if (type === "vertical") {
                guide.style.left = `${position}px`;
                guide.style.top = "0";
                guide.style.width = "1px";
                guide.style.height = "100%";
              } else if (type === "horizontal") {
                guide.style.top = `${position}px`;
                guide.style.left = "0";
                guide.style.height = "1px";
                guide.style.width = "100%";
              }

              canvas.appendChild(guide);
            }

            if (Math.abs(x - otherLeft) < SNAP_TOLERANCE) {
              x = otherLeft;
              drawGuideLine("vertical", otherLeft);
            }
            if (Math.abs(x - otherCenterX) < SNAP_TOLERANCE) {
              x = otherCenterX;
              drawGuideLine("vertical", otherCenterX);
            }
            if (Math.abs(y - otherTop) < SNAP_TOLERANCE) {
              y = otherTop;
              drawGuideLine("horizontal", otherTop);
            }
            if (Math.abs(y - otherCenterY) < SNAP_TOLERANCE) {
              y = otherCenterY;
              drawGuideLine("horizontal", otherCenterY);
            }
          });
        }

        item.style.left = `${item.offsetLeft + deltaX}px`;
        item.style.top = `${item.offsetTop + deltaY}px`;
      });
    });

    window.addEventListener("mouseup", () => {
      if (isDragging) {
        isDragging = false;
        selectedElements.forEach((item) => item.style.zIndex = 1);
      }
    });
  });
}

// Run on load if canvas exists
window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("designCanvas");
  if (canvas) {
    makeCanvasElementsDraggable();
  }
  // Add keyboard support for layer ordering
window.addEventListener('keydown', (e) => {
  if (!selectedElements.length) return;
  if (e.key === ']' && e.ctrlKey) {
    selectedElements.forEach(el => {
      const z = parseInt(getComputedStyle(el).zIndex) || 1;
      el.style.zIndex = z + 1;
    });
  } else if (e.key === '[' && e.ctrlKey) {
    selectedElements.forEach(el => {
      const z = parseInt(getComputedStyle(el).zIndex) || 1;
      el.style.zIndex = Math.max(1, z - 1);
    });
  }
});

});