import express from 'express'
import cors from 'cors'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const app = express()
const PORT = process.env.PORT || 3001
const DATA_DIR = join(dirname(fileURLToPath(import.meta.url)), 'data')
const MESSAGES_FILE = join(DATA_DIR, 'messages.json')

const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://mirandadevelopment.github.io',
]

const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 5
const requestLog = new Map()

app.disable('x-powered-by')
app.use(cors({ origin: ALLOWED_ORIGINS }))
app.use(express.json({ limit: '100kb' }))

app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  next()
})

function isRateLimited(ip) {
  const now = Date.now()
  const entry = requestLog.get(ip)
  if (!entry || now - entry.startedAt > RATE_WINDOW_MS) {
    requestLog.set(ip, { startedAt: now, count: 1 })
    return false
  }
  entry.count += 1
  if (entry.count > RATE_MAX) {
    requestLog.set(ip, { startedAt: now, count: entry.count })
    return true
  }
  return false
}

async function loadMessages() {
  try {
    const raw = await readFile(MESSAGES_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

async function saveMessage(message) {
  await mkdir(DATA_DIR, { recursive: true })
  const messages = await loadMessages()
  messages.push(message)
  await writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf-8')
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.post('/api/contact', async (req, res) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown'
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Muitas mensagens em pouco tempo. Aguarde alguns minutos.' })
  }

  const { name, email, subject, message, website } = req.body || {}

  if (typeof website === 'string' && website.length > 0) {
    return res.status(201).json({ ok: true })
  }

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' })
  }
  if (typeof name !== 'string' || name.trim().length < 2 || name.length > 120) {
    return res.status(400).json({ error: 'Nome inválido.' })
  }
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    return res.status(400).json({ error: 'E-mail inválido.' })
  }
  if (typeof subject !== 'string' || subject.trim().length < 3 || subject.length > 160) {
    return res.status(400).json({ error: 'Assunto inválido.' })
  }
  if (typeof message !== 'string' || message.trim().length < 10 || message.length > 4000) {
    return res.status(400).json({ error: 'Mensagem muito curta ou muito longa.' })
  }

  const clean = (s) => s.trim()
  try {
    await saveMessage({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: clean(name),
      email: clean(email).toLowerCase(),
      subject: clean(subject),
      message: clean(message),
      createdAt: new Date().toISOString(),
    })
    res.status(201).json({ ok: true })
  } catch (err) {
    console.error('Erro ao salvar mensagem:', err)
    res.status(500).json({ error: 'Erro interno ao registrar a mensagem.' })
  }
})

app.listen(PORT, () => {
  console.log(`Backend portfolio rodando em http://localhost:${PORT}`)
})
