<script setup>
import { ref, onMounted, watch } from 'vue'
import AIResult from './AIResult.vue'

const code = ref('')
const refactorGoal = ref('')

const debugged = ref('')
const explanation = ref('')
const refactored = ref('')
const loading = ref(false)
const isOpen = ref(false)
const success = ref(false)
const drawerWidth = ref(500)
const isResizing = ref(false)

const STORAGE_KEY = 'nexucore-devmode-session'

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    const session = JSON.parse(saved)
    code.value = session.code || ''
    refactorGoal.value = session.goal || ''
    debugged.value = session.debugged || ''
    explanation.value = session.explanation || ''
    refactored.value = session.refactored || ''
    success.value = true
  }
})

watch([code, refactorGoal, debugged, explanation, refactored], () => {
  const session = {
    code: code.value,
    goal: refactorGoal.value,
    debugged: debugged.value,
    explanation: explanation.value,
    refactored: refactored.value
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}, { deep: true })

const runTools = async () => {
  loading.value = true
  success.value = false
  try {
    const [debugRes, explainRes, refactorRes] = await Promise.all([
      fetch("/devmode/code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestType: "debug-assist",
          contextCode: code.value,
          devPrompt: refactorGoal.value || "Identify and fix bugs"
        })
      }).then(res => res.json()),

      fetch("/devmode/code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestType: "improve-code",
          contextCode: code.value,
          devPrompt: "Explain this code in detail"
        })
      }).then(res => res.json()),

      fetch("/devmode/flow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contextCode: code.value,
          userInput: refactorGoal.value || "Refactor to hooks and modern syntax"
        })
      }).then(res => res.json())
    ])

    debugged.value = debugRes.update
    explanation.value = explainRes.update
    refactored.value = refactorRes.reply
    success.value = true
  } catch (err) {
    console.error('Tool run error:', err)
  } finally {
    loading.value = false
  }
}

const startResize = (e) => {
  isResizing.value = true
  document.addEventListener('mousemove', resize)
  document.addEventListener('mouseup', stopResize)
}

const resize = (e) => {
  if (isResizing.value) {
    drawerWidth.value = Math.min(800, Math.max(300, window.innerWidth - e.clientX - 20))
  }
}

const stopResize = () => {
  isResizing.value = false
  document.removeEventListener('mousemove', resize)
  document.removeEventListener('mouseup', stopResize)
}

const exportSession = () => {
  const session = {
    code: code.value,
    goal: refactorGoal.value,
    debugged: debugged.value,
    explanation: explanation.value,
    refactored: refactored.value,
    timestamp: new Date().toISOString()
  }
  const blob = new Blob([JSON.stringify(session, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `nexucore-session-${Date.now()}.json`
  link.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div>
    <button
      @click="isOpen = !isOpen"
      class="fixed bottom-6 right-6 bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-purple-700 z-50"
    >
      🧠 DevMode
    </button>

    <transition name="fade">
      <div
        v-if="isOpen"
        class="fixed bottom-20 right-6 max-h-[90vh] overflow-auto bg-zinc-900 rounded-2xl shadow-2xl p-6 z-40"
        :style="{ width: drawerWidth + 'px' }"
      >
        <h2 class="text-2xl font-bold text-white mb-4">🧠 NexuCore DevMode</h2>

        <textarea
          v-model="code"
          placeholder="Paste your code here..."
          class="w-full p-4 bg-zinc-800 text-white rounded-lg font-mono h-40"
        />

        <input
          v-model="refactorGoal"
          placeholder="Refactor goal (e.g. convert to hooks)"
          class="w-full p-2 bg-zinc-700 text-white rounded-md mt-2"
        />

        <button
          @click="runTools"
          class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-xl hover:scale-105 transition mt-4"
        >
          ⚙️ Analyze + Explain + Refactor
        </button>

        <div v-if="loading" class="mt-4 flex items-center gap-2 text-purple-300">
          <span class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-purple-500"></span>
          Running AI tools...
        </div>

        <div v-if="success && !loading" class="mt-4 text-green-400 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          ✅ AI tools completed successfully!
        </div>

        <div v-if="!loading" class="space-y-6 mt-6">
          <AIResult title="🛠 Debugged Code" :content="debugged" />
          <AIResult title="📖 Explanation" :content="explanation" markdown />
          <AIResult title="🔁 Refactored Code" :content="refactored" />
        </div>

        <button
          v-if="!loading && success"
          @click="exportSession"
          class="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition"
        >
          📦 Export Session
        </button>

        <!-- Resize Handle -->
        <div
          class="absolute top-0 left-0 w-1 h-full cursor-ew-resize bg-transparent"
          @mousedown.prevent="startResize"
        ></div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.animate-spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
