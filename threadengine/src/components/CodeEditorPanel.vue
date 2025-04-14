<template>
    <div class="code-editor-panel">
      <div class="editor-tabs">
        <button @click="activeTab = 'html'" :class="{ active: activeTab === 'html' }">HTML</button>
        <button @click="activeTab = 'css'" :class="{ active: activeTab === 'css' }">CSS</button>
        <button @click="activeTab = 'js'" :class="{ active: activeTab === 'js' }">JS</button>
      </div>
  
      <codemirror v-model="code[activeTab]" :extensions="extensions[activeTab]" />
  
      <div class="sync-buttons">
        <button @click="syncFromCanvas">⬇️ Sync from Canvas</button>
        <button @click="pushToCanvas">⬆️ Push to Canvas</button>
        <button @click="exportHTML">💾 Export .html</button>
        <button @click="exportZip">📦 Export .zip</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue'
  import { Codemirror } from 'vue-codemirror'
  import { html } from '@codemirror/lang-html'
  import { css } from '@codemirror/lang-css'
  import { javascript } from '@codemirror/lang-javascript'
  import JSZip from 'jszip'
  import { saveAs } from 'file-saver'
  
  const activeTab = ref('html')
  const code = ref({ html: '', css: '', js: '' })
  
  const extensions = {
    html: [html()],
    css: [css()],
    js: [javascript()],
  }
  
  watch(activeTab, (newTab) => {
    if (newTab === 'html') syncFromCanvas()
  })
  
  const syncFromCanvas = () => {
    const canvas = document.querySelector('.canvas-area')
    if (canvas) code.value.html = canvas.innerHTML.trim()
  }
  
  const pushToCanvas = () => {
    const canvas = document.querySelector('.canvas-area')
    if (canvas) {
      canvas.innerHTML = code.value.html
  
      // Inject CSS
      let style = document.getElementById('live-style')
      if (!style) {
        style = document.createElement('style')
        style.id = 'live-style'
        document.head.appendChild(style)
      }
      style.textContent = code.value.css
  
      // Inject JS
      const script = document.createElement('script')
      script.textContent = code.value.js
      document.body.appendChild(script)
    }
  }
  
  const exportHTML = () => {
    const blob = new Blob([code.value.html], { type: 'text/html' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'threadengine-ui.html'
    a.click()
  }
  
  const exportZip = async () => {
    const zip = new JSZip()
    zip.file('index.html', code.value.html)
    zip.file('style.css', code.value.css)
    zip.file('script.js', code.value.js)
  
    const blob = await zip.generateAsync({ type: 'blob' })
    saveAs(blob, 'threadengine-export.zip')
  }
  </script>
  
  <style scoped>
  .code-editor-panel {
    margin-top: 2rem;
    background: linear-gradient(to bottom, #1e1e2f, #12131d);
    border-radius: 12px;
    border: 1px solid var(--color-surface);
    overflow: hidden;
    color: var(--color-text);
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(6px);
  }
  .editor-tabs {
    display: flex;
    border-bottom: 1px solid #333;
    background: rgba(255, 255, 255, 0.02);
  }
  .editor-tabs button {
    flex: 1;
    padding: 0.75rem;
    background: transparent;
    border: none;
    color: var(--color-subtext);
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
    border-bottom: 2px solid transparent;
  }
  .editor-tabs button:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: var(--color-glow);
  }
  .editor-tabs .active {
    background: #27293d;
    color: var(--color-glow);
    border-bottom: 2px solid var(--color-primary);
    font-weight: bold;
  }
  .sync-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
    padding: 1rem;
    background: #181a28;
    border-top: 1px solid #333;
  }
  .sync-buttons button {
    background: var(--color-primary);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-size: 0.85rem;
    box-shadow: 0 0 8px var(--color-glow);
    transition: all 0.2s ease;
  }
  .sync-buttons button:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 14px var(--color-glow);
  }
  </style>