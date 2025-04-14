<template>
    <div class="settings-panel" :class="{ open: show }">
      <div class="settings-header">
        <h3>⚙️ Settings</h3>
        <button @click="show = false">✖</button>
      </div>
  
      <div class="settings-body">
        <label>🧠 AI Model</label>
        <select v-model="settings.model">
          <option value="gpt-4">GPT-4</option>
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
        </select>
  
        <label>🎨 Theme</label>
        <select v-model="settings.theme">
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="neon">Neon</option>
        </select>
  
        <label>
          <input type="checkbox" v-model="settings.voice" />
          🎤 Enable Voice Input
        </label>
  
        <button @click="clearCanvas">🧹 Clear Canvas</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const show = ref(true)
  const settings = ref({
    model: 'gpt-4',
    theme: 'dark',
    voice: true,
  })
  
  const clearCanvas = () => {
    const el = document.querySelector('.canvas-area')
    if (el) el.innerHTML = '<p class="placeholder">Canvas cleared.</p>'
  }
  </script>
  
  <style scoped>
  .settings-panel {
    position: fixed;
    top: 0;
    right: -400px;
    width: 300px;
    height: 100%;
    background: #111827;
    color: white;
    border-left: 1px solid var(--color-primary);
    padding: 1.5rem;
    box-shadow: -2px 0 12px rgba(0,0,0,0.3);
    transition: right 0.3s ease-in-out;
    z-index: 999;
  }
  .settings-panel.open {
    right: 0;
  }
  .settings-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .settings-body {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .settings-body select,
  .settings-body input[type='text'] {
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid #333;
    background: #1e1e2f;
    color: white;
  }
  </style>
  