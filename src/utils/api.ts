export function resolveApiBase(): string {
  const configuredBase = import.meta.env.VITE_API_BASE?.trim()
  if (configuredBase) {
    return configuredBase.replace(/\/+$/, '')
  }

  const { protocol, hostname, port, origin, pathname } = window.location
  const isLocalHost = hostname === 'localhost' || hostname === '127.0.0.1'

  // Vite dev server (5173, 5174, …) — PHP API on :8000
  if (isLocalHost && port !== '' && port !== '8000') {
    return `${protocol}//${hostname}:8000`
  }

  const firstPathSegment = pathname.split('/').filter(Boolean)[0]
  return firstPathSegment ? `${origin}/${firstPathSegment}/backend` : `${origin}/backend`
}

export const API_BASE = resolveApiBase()

export function mediaUrl(path: string): string {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  if (path.startsWith('/')) return path
  return `${API_BASE}/${path.replace(/^\//, '')}`
}

interface ApiListResponse<T> {
  success?: boolean
  data?: T
  error?: string
}

export async function fetchApiList<T>(endpoint: string): Promise<T[]> {
  const response = await fetch(`${API_BASE}/${endpoint.replace(/^\//, '')}`)
  if (!response.ok) {
    throw new Error(`API ${endpoint}: ${response.status}`)
  }

  const payload = (await response.json()) as ApiListResponse<T>
  if (!payload.success || !Array.isArray(payload.data)) {
    throw new Error(`API ${endpoint}: invalid response`)
  }

  return payload.data
}
