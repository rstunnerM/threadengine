<template>
  <div class="canvas-wrapper">
    <div class="canvas-area" contenteditable="true" ref="editor">
      <p class="placeholder">Start typing or use ✨ AI to generate layout here…</p>
    </div>

    <!-- 🎤 Voice / Prompt -->
    <div class="ai-control-bar">
      <input v-model="userPrompt" placeholder="Describe UI or layout logic…" />
      <button @click="generateUI">✨ Generate</button>
      <button @click="toggleSettings" class="settings-btn">⚙️</button>
    </div>

    <!-- 🧩 Template Picker -->
    <template-picker-panel />

    <!-- 🧠 AI + Plugin Context -->
    <div class="canvas-resources">
      <p class="tag" v-for="tag in techTags" :key="tag">🔹 {{ tag }}</p>
    </div>

    <!-- 🐞 Debug Console Toggle -->
    <button @click="showConsole = !showConsole" class="toggle-console">
      {{ showConsole ? '🙈 Hide Debug Console' : '🐞 Show Debug Console' }}
    </button>

    <transition name="console-slide">
      <DevConsolePanel v-if="showConsole" />
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DevConsolePanel from './DevConsolePanel.vue'
import TemplatePickerPanel from './TemplatePickerPanel.vue'

const editor = ref(null)
const userPrompt = ref('')
const showConsole = ref(false)
const showSettings = ref(false)

const techTags = [
  'GPT-4',
  'Cloudinary',
  'CodeMirror',
  'Multer',
  'Sharp',
  'Replicate AI',
  'ThreadLang ⊕'
]

onMounted(() => {
  editor.value?.focus()
})

const generateUI = async () => {
  const prompt = userPrompt.value.trim()
  if (!prompt) return

  const response = await fetch('/api/generate-ui', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  })

  const { html } = await response.json()
  if (editor.value) editor.value.innerHTML = html
  console.log('🧠 [UI Generated]:', prompt, '\n➡️ Output:', html)
}

const toggleSettings = () => {
  showSettings.value = !showSettings.value
  console.log('⚙️ Settings toggled:', showSettings.value)
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
  gap: 1rem;
  margin-top: 2rem;
  align-items: center;
}
.ai-control-bar input {
  flex: 1;
  padding: 0.5rem 1rem;
  border-radius: 8px;
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
.settings-btn {
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--color-glow);
  color: var(--color-glow);
}
.canvas-resources {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;
  justify-content: center;
  font-size: 0.85rem;
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
  margin: 2rem auto 0;
  background: transparent;
  color: var(--color-glow);
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
}

/* 🎬 Animations */
.console-slide-enter-active,
.console-slide-leave-active {
  transition: max-height 0.4s ease, opacity 0.3s ease;
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
