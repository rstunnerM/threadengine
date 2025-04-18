// ./models/uiSynth.js
import readline from 'readline'

console.log('[gpt4-ui] 🧠 Ready for prompts.')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('line', (line) => {
  const prompt = line.trim()
  console.log(`[gpt4-ui] ✨ Generating UI for: "${prompt}"`)
  const html = `<div class="box">${prompt}</div>`
  process.stdout.write(JSON.stringify({ html }) + '\n')
})
