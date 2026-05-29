/** Internal route id (no leading # or /), e.g. "home", "page/news", "event/abc" */
export type RouteId = string

export function normalizeRouteId(route: RouteId): RouteId {
  return route.replace(/^#/, '').replace(/^\//, '').trim() || 'home'
}

export function hrefForRoute(route: RouteId): string {
  const id = normalizeRouteId(route)
  if (id === 'home') return '/'
  const segments = id.split('/').map((segment) => encodeURIComponent(segment))
  return `/${segments.join('/')}`
}

export function getRouteFromLocation(): RouteId {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '')
  return path ? decodeURIComponent(path) : 'home'
}

/** Old bookmarks: #about → /about */
export function migrateLegacyHash(): void {
  const hash = window.location.hash
  if (!hash || hash === '#') return
  const route = hash.slice(1)
  history.replaceState(null, '', hrefForRoute(route))
}

export function pushRoute(route: RouteId): void {
  const path = hrefForRoute(route)
  if (window.location.pathname !== path) {
    history.pushState(null, '', path)
  }
}
