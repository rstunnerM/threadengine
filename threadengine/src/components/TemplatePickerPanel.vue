<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>ThreadEngine - AI UI Builder</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="ThreadEngine — AI-powered UI Builder for futuristic design and code generation." />
  <link rel="icon" href="/assets/logo/threadengine-favicon.png" type="image/png" />

  <link rel="stylesheet" href="/base/reset.css" />
  <link rel="stylesheet" href="/base/typography.css" />
  <link rel="stylesheet" href="/theme/futureGlow.css" />
  <link rel="stylesheet" href="/effects/aurora.css" />
  <script src="https://unpkg.com/scrollreveal"></script>
</head>
<body class="landing" data-theme="dark">
  <div class="landing-container">
    <header class="landing-header">
      <img src="/assets/logo/threadengine-horizontal.png" alt="ThreadEngine Logo" class="logo" />
      <button class="nav-toggle" aria-label="Toggle menu">☰</button>
      <span class="mic-icon" title="Voice control active">🎙️</span>
      <select class="theme-selector" onchange="switchTheme(this.value)">
        <option value="dark">🌑 Dark</option>
        <option value="neo">💜 NeoPlasma</option>
        <option value="space">🌌 Deep Space</option>
        <option value="light">🌞 Solar Core</option>
      </select>
      <nav class="nav-buttons">
        <a href="#features">Features</a>
        <a href="#demo">Demo</a>
        <a href="#get-started" class="primary-btn">Get Started</a>
      </nav>
    </header>

    <section class="hero">
      <div class="aurora-bg"></div>
      <h1>Design Faster with AI ✨</h1>
      <p class="hero-sub">Generate and modify UIs with natural language prompts. Code meets creativity, instantly.</p>
      <a href="#canvas" class="cta-button">🚀 Launch Builder</a>
    </section>

    <section class="preview-toolbar">
      <button onclick="setPreview('mobile')">📱 Mobile</button>
      <button onclick="setPreview('tablet')">💻 Tablet</button>
      <button onclick="setPreview('desktop')">🖥️ Desktop</button>
    </section>

    <section id="canvas" class="builder-canvas">
      <h2>🎨 ThreadEngine Canvas</h2>
      <p class="canvas-info">Start designing your UI here. This is the interactive workspace powered by AI.</p>
      <div id="previewWrapper" class="preview-frame desktop">
        <div id="vueCanvasMount"></div>
      </div>
      <script type="module">
        import { createApp } from 'vue'
        import CanvasWorkspace from '/components/CanvasWorkspace.vue'
        createApp(CanvasWorkspace).mount('#vueCanvasMount')
      </script>
    </section>

    <section id="features" class="features">
      <h2>🛠 What ThreadEngine Can Do</h2>
      <ul class="feature-grid">
        <li>⚡ Instant UI Generation</li>
        <li>🧠 Modifier History with AI Recall</li>
        <li>🎨 Real-time Design Canvas</li>
        <li>💻 Code-View with HTML/CSS/JS Sync</li>
        <li>🛰️ Visual DevMode Panel (Vue powered)</li>
        <li>📦 Cloud-Connected Asset Pipeline</li>
      </ul>
    </section>

    <section id="demo" class="demo-preview">
      <h2>🔍 Live Demo</h2>
      <div class="demo-window">
        <img src="/assets/screens/demo-preview.png" alt="App Preview Screenshot" />
      </div>
    </section>

    <div id="vueSettingsMount"></div>
    <script type="module">
      import { createApp } from 'vue'
      import SettingsPanel from '/components/SettingsPanel.vue'
      createApp(SettingsPanel).mount('#vueSettingsMount')
    </script>

    <div class="voice-log-container">
      <p class="voice-label">🎤 Last command heard:</p>
      <p class="voice-log">…</p>
    </div>

    <footer class="landing-footer">
      <p>&copy; 2025 ThreadEngine. Built with 💜 for designers + developers.</p>
    </footer>
  </div>

  <style>
    .theme-selector {
      background: var(--color-surface);
      color: var(--color-text);
      border: 1px solid var(--color-primary);
      border-radius: 6px;
      padding: 0.3rem 0.6rem;
      margin-left: 1rem;
      font-size: 0.9rem;
    }
    .hero-sub {
      font-size: 1.125rem;
      color: var(--color-subtext);
    }
  </style>

  <script>
    const themes = {
      dark: {
        '--color-bg': '#0e0d2b', '--color-surface': '#17162f', '--color-primary': '#6a00f4',
        '--color-accent': '#ff67f6', '--color-text': '#e7e9ff', '--color-subtext': '#a1a4cc', '--color-glow': '#b387ff'
      },
      neo: {
        '--color-bg': '#1f0036', '--color-surface': '#2b0a4d', '--color-primary': '#ff29c2',
        '--color-accent': '#00f6ff', '--color-text': '#f2e9ff', '--color-subtext': '#ad9bd6', '--color-glow': '#ff9dfc'
      },
      space: {
        '--color-bg': '#050510', '--color-surface': '#10131a', '--color-primary': '#5282ff',
        '--color-accent': '#00ffc3', '--color-text': '#eaf4ff', '--color-subtext': '#7fa0ba', '--color-glow': '#6eb1ff'
      },
      light: {
        '--color-bg': '#fefaf6', '--color-surface': '#fff0dc', '--color-primary': '#ff6e00',
        '--color-accent': '#f92a82', '--color-text': '#32241f', '--color-subtext': '#7c655b', '--color-glow': '#ffb347'
      }
    }

    function switchTheme(name) {
      const root = document.documentElement
      const selected = themes[name] || themes.dark
      for (const key in selected) root.style.setProperty(key, selected[key])
    }
  </script>
</body>
</html>
