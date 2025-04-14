// server/server.js

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

app.post('/api/generate-ui', async (req, res) => {
  const { prompt } = req.body

  const basePrompt = `
You are an expert UI developer. Return a complete HTML block (with inline or scoped CSS) based on this user prompt. Only output clean HTML.
User prompt: "${prompt}"
`

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: basePrompt }],
      temperature: 0.7,
      max_tokens: 800,
    })

    const html = completion.data.choices[0].message.content
    res.json({ html })
  } catch (err) {
    console.error('[OPENAI ERROR]', err)
    res.status(500).json({ error: 'Failed to generate UI' })
  }
})

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`)
})
