import TemplatePickerPanel from './TemplatePickerPanel.vue'

<template>
  <div class="canvas-wrapper">
    <div class="canvas-area" contenteditable="true" ref="editor">
      <!-- Editable design area -->
      <p class="placeholder">Start typing or use ✨ AI to generate layout here...</p>
    </div>

    <div class="ai-control-bar">
      <input v-model="userPrompt" placeholder="Describe what to generate…" />
      <button @click="generateUI">✨ Generate</button>
    </div>

    <!-- 🧠 Reference Tags -->
    <div class="canvas-resources">
      <p class="tag">🧠 GPT-4</p>
      <p class="tag">🌥️ Cloudinary</p>
      <p class="tag">🧪 CodeMirror</p>
      <p class="tag">🧰 Multer</p>
      <p class="tag">🔧 Sharp</p>
      <p class="tag">🖼️ Replicate AI</p>
    </div>

    <!-- 🐞 Toggle Debug Panel -->
    <button @click="showConsole = !showConsole" class="toggle-console">
      {{ showConsole ? '🙈 Hide Debug' : '🐞 Show Debug Console' }}
    </button>

    <!-- 🧪 Animated Debug Panel -->
    <transition name="console-slide">
      <DevConsolePanel v-if="showConsole" />
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DevConsolePanel from './DevConsolePanel.vue'

const editor = ref(null)
const userPrompt = ref('')
const showConsole = ref(true)

onMounted(() => {
  editor.value?.focus()
})

const generateUI = async () => {
  if (!userPrompt.value.trim()) return
  const response = await fetch('/api/generate-ui', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: userPrompt.value }),
  })
  const { html } = await response.json()
  if (editor.value) editor.value.innerHTML = html
  console.log('✅ Generated:', html)
}
</script>

<style scoped>
.canvas-wrapper {
  border: 1px solid var(--color-primary);
  border-radius: 12px;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  color: var(--color-text);
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
}
.canvas-area {
  min-height: 300px;
  outline: none;
  white-space: pre-wrap;
}
.placeholder {
  color: var(--color-subtext);
  font-style: italic;
}
.ai-control-bar {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}
.ai-control-bar input {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  flex: 1;
  background: #1a1c2c;
  color: var(--color-text);
  border: 1px solid var(--color-surface);
}
.ai-control-bar button {
  background: var(--color-primary);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 0 6px var(--color-glow);
}
.canvas-resources {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: center;
  font-size: 0.8rem;
  color: var(--color-glow);
  opacity: 0.75;
}
.canvas-resources .tag {
  background: rgba(255,255,255,0.05);
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--color-primary);
}
.toggle-console {
  display: block;
  margin: 1.5rem auto;
  background: transparent;
  color: var(--color-glow);
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
}

/* 🔄 Animation Styles */
.console-slide-enter-active,
.console-slide-leave-active {
  transition: max-height 0.4s ease-in-out, opacity 0.3s ease;
}
.console-slide-enter-from,
.console-slide-leave-to {
  max-height: 0;
  opacity: 0;
}
.console-slide-enter-to,
.console-slide-leave-from {
  max-height: 200px;
  opacity: 1;
}
</style>
