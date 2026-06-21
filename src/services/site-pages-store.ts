import { defaultSitePages } from '../data/site-pages-default'
import type { SitePages } from '../data/site-pages-types'
import { API_BASE } from '../utils/api'

let sitePages: SitePages = structuredClone(defaultSitePages)

function deepMerge<T extends Record<string, unknown>>(base: T, patch: Partial<T>): T {
  const result = { ...base } as T
  for (const key of Object.keys(patch) as (keyof T)[]) {
    const value = patch[key]
    if (value === undefined || value === null) continue
    const existing = result[key]
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      existing &&
      typeof existing === 'object' &&
      !Array.isArray(existing)
    ) {
      result[key] = deepMerge(
        existing as Record<string, unknown>,
        value as Record<string, unknown>,
      ) as T[keyof T]
    } else {
      result[key] = value as T[keyof T]
    }
  }
  return result
}

export function getSitePages(): SitePages {
  return sitePages
}

export async function loadSitePages(): Promise<void> {
  try {
    const response = await fetch(`${API_BASE}/pages.php`)
    if (!response.ok) throw new Error(`pages.php: ${response.status}`)
    const payload = (await response.json()) as { success?: boolean; data?: Partial<SitePages> }
    if (payload.success && payload.data && typeof payload.data === 'object') {
      sitePages = deepMerge(structuredClone(defaultSitePages), payload.data)
    }
  } catch (error) {
    console.warn('[LOGUS] pages.php failed, using static site pages.', error)
    sitePages = structuredClone(defaultSitePages)
  }
}

export function pickLang(isLv: boolean, pair: { en: string; lv: string }): string {
  return isLv ? pair.lv : pair.en
}

export function resolveSiteImage(path: string): string {
  const trimmed = path.trim()
  if (!trimmed) return '/bg-image.jpg'
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/')) {
    return trimmed
  }
  return `${API_BASE}/${trimmed.replace(/^\//, '')}`
}
