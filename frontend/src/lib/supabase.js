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

/** URL de retorno após OAuth (Google). */
export function getSiteOrigin() {
  if (typeof window === 'undefined') return ''
  return `${window.location.origin}${window.location.pathname.replace(/\/?$/, '/')}`
}

/**
 * Cadastro com e-mail real.
 * Deixe "Confirm email" LIGADO no Supabase — o usuário confirma o link e a conta fica segura.
 */
export async function signUp({ name, email, password }) {
  const res = await fetch(`${url}/auth/v1/signup`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      password,
      data: {
        full_name: name.trim(),
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

export async function signIn({ email, password }) {
  const res = await fetch(`${url}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      password,
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data?.error_description || data?.msg || 'E-mail ou senha incorretos.')
  }
  return data
}

/** Redireciona para o Google via Supabase OAuth. */
export function signInWithGoogle() {
  const redirectTo = encodeURIComponent(getSiteOrigin())
  const authUrl = `${url}/auth/v1/authorize?provider=google&redirect_to=${redirectTo}`
  window.location.href = authUrl
}

/** Lê tokens do hash após retorno do Google (#access_token=...). */
export function parseOAuthHash() {
  if (typeof window === 'undefined') return null
  const hash = window.location.hash?.replace(/^#/, '')
  if (!hash) return null
  const params = new URLSearchParams(hash)
  const access_token = params.get('access_token')
  const refresh_token = params.get('refresh_token')
  if (!access_token) return null
  return { access_token, refresh_token }
}

export async function fetchUser(accessToken) {
  const res = await fetch(`${url}/auth/v1/user`, {
    headers: authHeaders(accessToken),
  })
  if (!res.ok) return null
  return res.json()
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

export function sessionFromAuth(data) {
  const user = data.user || data
  const meta = user?.user_metadata || {}
  const email = user?.email || ''
  const name =
    meta.full_name ||
    meta.name ||
    meta.user_name ||
    email.split('@')[0] ||
    'Usuário'
  const username =
    meta.user_name ||
    meta.preferred_username ||
    email.split('@')[0] ||
    'user'
  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    user,
    name,
    username: String(username).toLowerCase().replace(/[^a-z0-9._-]/g, '').slice(0, 24) || 'user',
    email,
  }
}
