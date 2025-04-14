<template>
    <div class="dev-console">
      <h3>🐞 Debug Console</h3>
      <pre>{{ logs.join('\n') }}</pre>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  const logs = ref([])
  
  onMounted(() => {
    const originalLog = console.log
    console.log = function (...args) {
      logs.value.push(args.map(a => JSON.stringify(a)).join(' '))
      originalLog.apply(console, args)
    }
  })
  </script>
  
  <style scoped>
  .dev-console {
    background: #111;
    color: #0f0;
    font-family: monospace;
    padding: 1rem;
    border-top: 1px solid var(--color-primary);
    max-height: 200px;
    overflow-y: auto;
  }
  </style>
  