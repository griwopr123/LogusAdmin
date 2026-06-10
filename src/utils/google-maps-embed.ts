/**
 * Google Maps short/share links cannot load inside iframes.
 * Returns an embeddable URL, falling back to a location search embed.
 */
export function resolveGoogleMapsEmbedUrl(
  mapsUrl: string | undefined,
  locationQuery: string
): string {
  const fallback = `https://maps.google.com/maps?q=${encodeURIComponent(locationQuery)}&z=14&output=embed`
  const raw = mapsUrl?.trim()
  if (!raw) return fallback

  if (raw.includes('/maps/embed') || /[?&]output=embed\b/i.test(raw)) {
    return raw
  }

  try {
    const url = new URL(raw)
    const host = url.hostname.replace(/^www\./, '').toLowerCase()

    if (
      host === 'maps.app.goo.gl' ||
      host === 'goo.gl' ||
      host.endsWith('.goo.gl') ||
      host === 'maps.google.com' && url.pathname.startsWith('/maps/url')
    ) {
      return fallback
    }

    if (host.includes('google.') && raw.includes('/maps')) {
      const placeMatch = raw.match(/\/maps\/place\/([^/?#]+)/)
      if (placeMatch) {
        const place = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '))
        return `https://maps.google.com/maps?q=${encodeURIComponent(place)}&z=14&output=embed`
      }

      const q = url.searchParams.get('q') ?? url.searchParams.get('query')
      if (q) {
        return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=14&output=embed`
      }

      const coordsMatch = raw.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/)
      if (coordsMatch) {
        return `https://maps.google.com/maps?q=${coordsMatch[1]},${coordsMatch[2]}&z=14&output=embed`
      }
    }
  } catch {
    /* use fallback */
  }

  return fallback
}

export function isDirectMapLink(mapsUrl: string | undefined): boolean {
  const raw = mapsUrl?.trim()
  return Boolean(raw && /^https?:\/\//i.test(raw))
}
