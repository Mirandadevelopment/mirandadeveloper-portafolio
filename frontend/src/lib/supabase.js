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

export function getSiteOrigin() {
  if (typeof window === 'undefined') return ''
  return `${window.location.origin}${window.location.pathname.replace(/\/?$/, '/')}`
}

export function isAdminEmail(email) {
  if (!email) return false
  const list = (site.adminEmails || []).map((e) => e.toLowerCase().trim())
  return list.includes(String(email).toLowerCase().trim())
}

export async function signUp({ name, email, password }) {
  const res = await fetch(`${url}/auth/v1/signup`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      password,
      data: { full_name: name.trim() },
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data?.msg || data?.error_description || data?.message || 'Não foi possível criar a conta.')
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

export function signInWithGoogle() {
  const redirectTo = encodeURIComponent(getSiteOrigin())
  window.location.href = `${url}/auth/v1/authorize?provider=google&redirect_to=${redirectTo}`
}

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

/** Admin: lista pendentes e aprovados */
export async function fetchAllComments(accessToken) {
  const res = await fetch(
    `${url}/rest/v1/portfolio_comments?select=id,author_name,username,content,approved,created_at&order=created_at.desc&limit=100`,
    { headers: authHeaders(accessToken) },
  )
  if (!res.ok) throw new Error('Não foi possível carregar a moderação.')
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

export async function setCommentApproved({ accessToken, id, approved }) {
  const res = await fetch(`${url}/rest/v1/portfolio_comments?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: {
      ...authHeaders(accessToken),
      Prefer: 'return=representation',
    },
    body: JSON.stringify({ approved }),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    const msg = Array.isArray(data) ? data[0]?.message : data?.message
    throw new Error(msg || 'Não foi possível atualizar o comentário.')
  }
  return res.json()
}

export async function deleteComment({ accessToken, id }) {
  const res = await fetch(`${url}/rest/v1/portfolio_comments?id=eq.${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: authHeaders(accessToken),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    const msg = Array.isArray(data) ? data[0]?.message : data?.message
    throw new Error(msg || 'Não foi possível excluir o comentário.')
  }
  return true
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
    meta.full_name || meta.name || meta.user_name || email.split('@')[0] || 'Usuário'
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
    isAdmin: isAdminEmail(email),
  }
}
