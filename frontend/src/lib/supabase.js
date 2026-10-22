import { site } from '../config/site.js'

const { url, anonKey } = site.supabase

const headers = () => ({
  apikey: anonKey,
  Authorization: `Bearer ${anonKey}`,
  'Content-Type': 'application/json',
})

const authHeaders = (accessToken) => ({
  apikey: anonKey,
  Authorization: `Bearer ${accessToken}`,
  'Content-Type': 'application/json',
})

/** E-mail sintético a partir do username (Supabase Auth exige e-mail). */
export function usernameToEmail(username) {
  const clean = String(username)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, '')
  return `${clean}@mirandadeveloper.local`
}

export async function signUp({ name, username, password }) {
  const email = usernameToEmail(username)
  const res = await fetch(`${url}/auth/v1/signup`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      email,
      password,
      data: {
        full_name: name.trim(),
        username: username.trim().toLowerCase(),
      },
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg = data?.msg || data?.error_description || data?.message || 'Não foi possível criar a conta.'
    throw new Error(msg)
  }
  return data
}

export async function signIn({ username, password }) {
  const email = usernameToEmail(username)
  const res = await fetch(`${url}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ email, password }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data?.error_description || data?.msg || 'Usuário ou senha incorretos.')
  }
  return data
}

export async function fetchApprovedComments() {
  const res = await fetch(
    `${url}/rest/v1/portfolio_comments?approved=eq.true&select=id,author_name,username,content,created_at&order=created_at.desc&limit=50`,
    { headers: headers() },
  )
  if (!res.ok) throw new Error('Não foi possível carregar os comentários.')
  return res.json()
}

export async function submitComment({ accessToken, authorName, username, content }) {
  const res = await fetch(`${url}/rest/v1/portfolio_comments`, {
    method: 'POST',
    headers: {
      ...authHeaders(accessToken),
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      author_name: authorName,
      username,
      content: content.trim(),
      approved: false,
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg = Array.isArray(data) ? data[0]?.message : data?.message || data?.hint
    throw new Error(msg || 'Não foi possível enviar o comentário.')
  }
  return data
}

const SESSION_KEY = 'md-auth-session'

export function saveSession(session) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  } catch {
    /* ignore */
  }
}

export function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(SESSION_KEY)
  } catch {
    /* ignore */
  }
}
