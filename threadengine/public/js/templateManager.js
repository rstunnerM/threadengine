// Enhanced Template Modal Manager for ThreadEngine
// =============================================

const templateLibrary = [
    {
      id: "landing-basic",
      name: "🔹 Basic Landing Page",
      description: "Hero + Features + Footer",
      tags: ["landing", "basic", "business"],
      html: `<section style='padding:2rem;text-align:center;'>\n  <h1>Welcome to ThreadEngine</h1>\n  <p>Build your site with AI in seconds.</p>\n  <button>Get Started</button>\n</section>\n<section style='padding:2rem;'>\n  <h2>Features</h2>\n  <ul>\n    <li>Drag & Drop Editor</li>\n    <li>AI Suggestions</li>\n    <li>Live Preview</li>\n  </ul>\n</section>\n<footer style='padding:2rem;text-align:center;'>\n  <p>&copy; 2025 ThreadEngine</p>\n</footer>`
    },
    {
      id: "blog-minimal",
      name: "📝 Minimal Blog Layout",
      description: "Header + Posts + Sidebar",
      tags: ["blog", "minimal", "writer"],
      html: `<header style='padding:1rem;text-align:center;'>\n  <h1>My Blog</h1>\n</header>\n<main style='display:flex;padding:2rem;'>\n  <section style='flex:3;'>\n    <article><h2>Post One</h2><p>Content here...</p></article>\n    <article><h2>Post Two</h2><p>More content...</p></article>\n  </section>\n  <aside style='flex:1;padding-left:1rem;'>\n    <h3>About</h3><p>Short bio...</p>\n  </aside>\n</main>`
    },
    {
      id: "portfolio-clean",
      name: "🎨 Clean Portfolio",
      description: "Intro + Projects Grid",
      tags: ["portfolio", "clean", "developer"],
      html: `<section style='text-align:center;padding:2rem;'>\n  <h1>Hi, I'm Stunner</h1>\n  <p>Creative Strategist & Developer</p>\n</section>\n<section style='display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;padding:2rem;'>\n  <div style='background:#222;padding:1rem;'>Project 1</div>\n  <div style='background:#222;padding:1rem;'>Project 2</div>\n  <div style='background:#222;padding:1rem;'>Project 3</div>\n</section>`
    }
  ];
  
  let favoriteTemplates = JSON.parse(localStorage.getItem("threadengine-favorites") || "[]");
  
  function showTemplateModal() {
    const modal = document.createElement("div");
    modal.id = "templateModal";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100vw";
    modal.style.height = "100vh";
    modal.style.background = "rgba(0, 0, 0, 0.85)";
    modal.style.display = "flex";
    modal.style.flexDirection = "column";
    modal.style.alignItems = "center";
    modal.style.zIndex = "9999";
    modal.style.overflowY = "auto";
    modal.style.padding = "2rem";
  
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "❌ Close";
    closeBtn.className = "close-btn";
    closeBtn.onclick = () => modal.remove();
    modal.appendChild(closeBtn);
  
    const tagSet = new Set(templateLibrary.flatMap(t => t.tags));
    const tagBar = document.createElement("div");
    tagBar.style.display = "flex";
    tagBar.style.flexWrap = "wrap";
    tagBar.style.gap = "0.5rem";
    tagBar.style.marginBottom = "1rem";
  
    tagSet.forEach(tag => {
      const tagBtn = document.createElement("button");
      tagBtn.textContent = `#${tag}`;
      tagBtn.style.padding = "0.4rem 0.8rem";
      tagBtn.style.background = "#222";
      tagBtn.style.border = "1px solid #444";
      tagBtn.style.borderRadius = "4px";
      tagBtn.style.color = "#00ffc8";
      tagBtn.style.cursor = "pointer";
      tagBtn.onclick = () => {
        search.value = tag;
        renderTemplates(tag);
      };
      tagBar.appendChild(tagBtn);
    });
    modal.appendChild(tagBar);
  
    const search = document.createElement("input");
    search.type = "text";
    search.placeholder = "🔍 Search templates...";
    search.style.margin = "1rem";
    search.style.padding = "0.5rem 1rem";
    search.style.width = "100%";
    search.style.maxWidth = "400px";
    search.style.borderRadius = "8px";
    search.style.border = "1px solid #444";
    search.style.background = "#111";
    search.style.color = "#fff";
    search.style.fontSize = "1rem";
    modal.appendChild(search);
  
    const grid = document.createElement("div");
    grid.style.display = "flex";
    grid.style.flexWrap = "wrap";
    grid.style.justifyContent = "center";
    grid.style.gap = "1.5rem";
    modal.appendChild(grid);
  
    const renderTemplates = (query = "") => {
      grid.innerHTML = "";
      templateLibrary.forEach(template => {
        const match = template.name.toLowerCase().includes(query) ||
                      template.description.toLowerCase().includes(query) ||
                      (template.tags && template.tags.join(" ").toLowerCase().includes(query));
        if (!match) return;
  
        const card = document.createElement("div");
        card.className = "template-card";
  
        const title = document.createElement("h3");
        title.textContent = template.name;
  
        const desc = document.createElement("p");
        desc.textContent = template.description;
  
        const preview = document.createElement("iframe");
        preview.srcdoc = template.html;
        preview.style.width = "100%";
        preview.style.height = "200px";
        preview.style.border = "1px solid #333";
        preview.style.marginTop = "0.5rem";
        preview.style.borderRadius = "4px";
  
        const controls = document.createElement("div");
        controls.style.display = "flex";
        controls.style.justifyContent = "space-between";
        controls.style.alignItems = "center";
        controls.style.marginTop = "0.5rem";
  
        const useBtn = document.createElement("button");
        useBtn.textContent = "✨ Use Template";
        useBtn.onclick = () => {
          document.getElementById("htmlEditor").value = template.html;
          document.getElementById("designCanvas").innerHTML = template.html;
          document.getElementById("previewFrame").srcdoc = template.html;
          pushHistory(template.html);
          modal.remove();
        };
  
        const favBtn = document.createElement("button");
        favBtn.textContent = favoriteTemplates.includes(template.id) ? "★" : "☆";
        favBtn.title = "Toggle Favorite";
        favBtn.onclick = () => {
          if (favoriteTemplates.includes(template.id)) {
            favoriteTemplates = favoriteTemplates.filter(id => id !== template.id);
          } else {
            favoriteTemplates.push(template.id);
          }
          localStorage.setItem("threadengine-favorites", JSON.stringify(favoriteTemplates));
          favBtn.textContent = favoriteTemplates.includes(template.id) ? "★" : "☆";
        };
  
        controls.appendChild(useBtn);
        controls.appendChild(favBtn);
  
        card.appendChild(title);
        card.appendChild(desc);
        card.appendChild(preview);
        card.appendChild(controls);
        grid.appendChild(card);
      });
    };
  
    search.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase();
      renderTemplates(q);
    });
  
    renderTemplates();
    document.body.appendChild(modal);
  }