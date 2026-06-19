import {
  getDocumentItems,
  getEventsItems,
  getNewsItems,
  getPartnerItems,
  getProjectItems,
  getTeamMembers,
} from '../services/content-store'
import { getSitePages, pickLang } from '../services/site-pages-store'
import { secondaryPages } from '../pages/secondary-pages'

export type SearchResultKind = 'page' | 'event' | 'person' | 'section' | 'news'

export interface SearchResult {
  id: string
  title: string
  subtitle: string
  route: string
  kind: SearchResultKind
  score: number
}

interface SearchIndexEntry {
  id: string
  title: string
  subtitle: string
  route: string
  kind: SearchResultKind
  terms: string[]
}

const typeLabels = {
  en: { page: 'Page', event: 'Event', person: 'Person', section: 'Section', news: 'News' },
  lv: { page: 'Lapa', event: 'Pasākums', person: 'Persona', section: 'Sadaļa', news: 'Jaunums' },
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[āàáâãäå]/g, 'a')
    .replace(/[ēèéêë]/g, 'e')
    .replace(/[īìíîï]/g, 'i')
    .replace(/[ōòóôõö]/g, 'o')
    .replace(/[ūùúûü]/g, 'u')
    .replace(/[čć]/g, 'c')
    .replace(/[šś]/g, 's')
    .replace(/[žź]/g, 'z')
    .replace(/[ņ]/g, 'n')
    .replace(/[ķ]/g, 'k')
    .replace(/[ļ]/g, 'l')
    .replace(/[ģ]/g, 'g')
}

function formatEventDate(date: string, isLv: boolean): string {
  const [y, m, d] = date.split('-')
  return isLv ? `${d}.${m}.${y}` : `${d}.${m}.${y}`
}

function dateSearchTerms(date: string, month: { en: string; lv: string }): string[] {
  const [y, m, d] = date.split('-')
  const dot = `${d}.${m}.${y}`
  const dash = `${d}-${m}-${y}`
  return [
    date,
    dot,
    dash,
    `${d}.${m}`,
    `${d}/${m}`,
    y,
    month.en.toLowerCase(),
    month.lv.toLowerCase(),
    d,
    m,
  ]
}

function buildIndex(lang: string): SearchIndexEntry[] {
  const isLv = lang === 'lv'
  const entries: SearchIndexEntry[] = []

  const mainPages: { route: string; title: { en: string; lv: string }; extra?: string[] }[] = [
    { route: 'home', title: { en: 'Home', lv: 'Sākums' }, extra: ['landing', 'hero', 'sākumlapa'] },
    { route: 'events', title: { en: 'Events', lv: 'Pasākumi' }, extra: ['calendar', 'pasākumu saraksts', 'tournaments'] },
    { route: 'about', title: { en: 'About Us', lv: 'Par Mums' }, extra: ['about us', 'par mums', 'mission', 'misija'] },
    { route: 'team', title: { en: 'Team', lv: 'Komanda' }, extra: ['staff', 'komanda', 'people'] },
    { route: 'donation', title: { en: 'Donation', lv: 'Ziedojumi' }, extra: ['donate', 'support', 'ziedot'] },
    { route: 'page/arhive', title: { en: 'Archive', lv: 'Arhīvs' }, extra: ['history', 'vēsture', 'yearbooks', 'gadagrāmatas', 'photos', 'fotogrāfijas'] },
    { route: 'sponsors', title: { en: 'Partners', lv: 'Partneri' }, extra: ['sponsors', 'partneri'] },
    { route: 'club-intro', title: { en: 'What is LOGUS Debate?', lv: 'Kas ir LOGUS Debate?' }, extra: ['club', 'about club'] },
    { route: 'upcoming-events', title: { en: 'Upcoming events', lv: 'Gaidāmie pasākumi' }, extra: ['home events'] },
    { route: 'contact', title: { en: 'Contact', lv: 'Kontakti' }, extra: ['footer', 'email', 'phone', 'info@logusdebate.lv'] },
  ]

  for (const page of mainPages) {
    const title = isLv ? page.title.lv : page.title.en
    entries.push({
      id: `page-${page.route}`,
      title,
      subtitle: isLv ? 'Lapa' : 'Page',
      route: page.route,
      kind: 'page',
      terms: [title, ...(page.extra ?? [])],
    })
  }

  for (const page of secondaryPages) {
    const title = isLv ? page.title.lv : page.title.en
    const body = isLv ? page.body.lv : page.body.en
    entries.push({
      id: `secondary-${page.slug}`,
      title,
      subtitle: isLv ? 'Lapa' : 'Page',
      route: `page/${page.slug}`,
      kind: 'page',
      terms: [title, body, page.slug],
    })
  }

  for (const partner of getPartnerItems()) {
    const category = isLv ? partner.category.lv : partner.category.en
    const name = isLv ? partner.name.lv : partner.name.en
    const description = isLv ? partner.description.lv : partner.description.en
    entries.push({
      id: `partner-${partner.id}`,
      title: name,
      subtitle: `${isLv ? 'Partneris' : 'Partner'} · ${category}`,
      route: 'page/partners',
      kind: 'page',
      terms: [name, category, description, partner.id, 'partners', 'partneri'],
    })
  }

  for (const ev of getEventsItems()) {
    const title = isLv ? ev.title.lv : ev.title.en
    const desc = isLv ? ev.description.lv : ev.description.en
    const loc = isLv ? ev.location.lv : ev.location.en
    entries.push({
      id: `event-${ev.id}`,
      title,
      subtitle: `${isLv ? 'Pasākums' : 'Event'} · ${formatEventDate(ev.date, isLv)}`,
      route: `event/${ev.id}`,
      kind: 'event',
      terms: [
        title,
        desc,
        loc,
        ev.id,
        ...dateSearchTerms(ev.date, ev.month),
      ],
    })
  }

  for (const item of getSitePages().faq.items) {
    const q = pickLang(isLv, item.question)
    const a = pickLang(isLv, item.answer)
    entries.push({
      id: `faq-${item.id}`,
      title: q,
      subtitle: isLv ? 'BUJ' : 'FAQ',
      route: 'page/faq',
      kind: 'page',
      terms: [q, a, 'faq', 'buj', item.id],
    })
  }

  getSitePages().rules.groups.forEach((group, groupIndex) => {
    const main = pickLang(isLv, group.text)
    const num = groupIndex + 1
    entries.push({
      id: `rules-${num}`,
      title: `${num}. ${main}`,
      subtitle: isLv ? 'Debašu noteikumi' : 'Debate rules',
      route: 'page/rules',
      kind: 'page',
      terms: [main, String(num), 'rules', 'noteikumi'],
    })
    group.items.forEach((item, subIndex) => {
      const text = pickLang(isLv, item.text)
      entries.push({
        id: `rules-${num}-${subIndex + 1}`,
        title: `${num}.${subIndex + 1} ${text.slice(0, 64)}${text.length > 64 ? '…' : ''}`,
        subtitle: isLv ? 'Debašu noteikumi' : 'Debate rules',
        route: 'page/rules',
        kind: 'page',
        terms: [text, main, `${num}.${subIndex + 1}`, 'rules', 'noteikumi', 'bp', 'poi'],
      })
    })
  })

  entries.push({
    id: 'page-rules',
    title: isLv ? 'Debašu noteikumi' : 'Debate rules',
    subtitle: isLv ? 'Lapa' : 'Page',
    route: 'page/rules',
    kind: 'page',
    terms: ['rules', 'noteikumi', 'debate', 'debašu'],
  })

  for (const doc of getDocumentItems()) {
    const title = isLv ? doc.title.lv : doc.title.en
    const excerpt = isLv ? doc.excerpt.lv : doc.excerpt.en
    const contentText = (isLv ? doc.content.lv : doc.content.en).join(' ')
    entries.push({
      id: `doc-${doc.id}`,
      title,
      subtitle: isLv ? 'Dokuments' : 'Document',
      route: `document/${doc.id}`,
      kind: 'page',
      terms: [title, excerpt, contentText, doc.id, 'statūti', 'dokumenti', 'documents', doc.category],
    })
  }

  for (const project of getProjectItems()) {
    const title = isLv ? project.title.lv : project.title.en
    const excerpt = isLv ? project.excerpt.lv : project.excerpt.en
    const intro = isLv ? project.heroIntro.lv : project.heroIntro.en
    const bodyText = (isLv ? project.body.lv : project.body.en).join(' ')
    entries.push({
      id: `project-${project.id}`,
      title,
      subtitle: isLv ? 'Projekts' : 'Project',
      route: `project/${project.id}`,
      kind: 'page',
      terms: [title, excerpt, intro, bodyText, project.id, 'projekti', 'projects'],
    })
  }

  entries.push({
    id: 'page-projects',
    title: isLv ? 'Projekti' : 'Projects',
    subtitle: isLv ? 'Lapa' : 'Page',
    route: 'page/projects',
    kind: 'page',
    terms: ['projekti', 'projects', 'project', 'programma'],
  })

  for (const post of getNewsItems()) {
    const title = isLv ? post.title.lv : post.title.en
    const excerpt = isLv ? post.excerpt.lv : post.excerpt.en
    const body = isLv ? post.body.lv : post.body.en
    entries.push({
      id: `news-${post.id}`,
      title,
      subtitle: `${isLv ? 'Jaunums' : 'News'} · ${formatEventDate(post.date, isLv)}`,
      route: `news/${post.id}`,
      kind: 'news',
      terms: [title, excerpt, body, post.id, 'instagram', 'jaunumi', 'news'],
    })
  }

  for (const member of getTeamMembers()) {
    const name = isLv ? member.name.lv : member.name.en
    const role = isLv ? member.role.lv : member.role.en
    const nameParts = name.split(/\s+/)
    entries.push({
      id: `person-${normalize(name)}`,
      title: name,
      subtitle: `${isLv ? 'Komanda' : 'Team'} · ${role}`,
      route: 'team',
      kind: 'person',
      terms: [name, role, ...nameParts, 'team', 'komanda', 'coach', 'treneris'],
    })
  }

  return entries
}

let cachedIndex: { lang: string; entries: SearchIndexEntry[] } | null = null

function getIndex(lang: string): SearchIndexEntry[] {
  if (!cachedIndex || cachedIndex.lang !== lang) {
    cachedIndex = { lang, entries: buildIndex(lang) }
  }
  return cachedIndex.entries
}

function scoreMatch(query: string, term: string): number {
  const q = normalize(query)
  const t = normalize(term)
  if (!q || !t) return 0
  if (t === q) return 100
  if (t.startsWith(q)) return 80
  if (t.split(/\s+/).some((w) => w.startsWith(q))) return 65
  if (t.includes(q)) return 50
  return 0
}

export function searchSite(query: string, lang: string, limit = 8): SearchResult[] {
  const trimmed = query.trim()
  if (trimmed.length < 1) return []

  const index = getIndex(lang)
  const results: SearchResult[] = []

  for (const entry of index) {
    let best = 0
    for (const term of entry.terms) {
      best = Math.max(best, scoreMatch(trimmed, term))
      if (best >= 100) break
    }
    const titleScore = scoreMatch(trimmed, entry.title)
    best = Math.max(best, titleScore + (titleScore >= 50 ? 10 : 0))

    if (best > 0) {
      results.push({
        id: entry.id,
        title: entry.title,
        subtitle: entry.subtitle,
        route: entry.route,
        kind: entry.kind,
        score: best,
      })
    }
  }

  return results
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit)
}

export function getSearchTypeLabel(kind: SearchResultKind, lang: string): string {
  const labels = lang === 'lv' ? typeLabels.lv : typeLabels.en
  return labels[kind]
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Wraps query matches in &lt;mark&gt; for live search suggestions (indices align 1:1 with normalize). */
export function highlightSearchText(text: string, query: string): string {
  const q = query.trim()
  if (!q) return escapeHtml(text)

  const normQ = normalize(q)
  const normText = normalize(text)
  if (!normQ) return escapeHtml(text)

  const ranges: [number, number][] = []
  let pos = 0
  while (pos < normText.length) {
    const idx = normText.indexOf(normQ, pos)
    if (idx === -1) break
    ranges.push([idx, idx + normQ.length])
    pos = idx + normQ.length
  }

  if (ranges.length === 0) return escapeHtml(text)

  let out = ''
  let last = 0
  for (const [start, end] of ranges) {
    out += escapeHtml(text.slice(last, start))
    out += `<mark class="nav-search-mark">${escapeHtml(text.slice(start, end))}</mark>`
    last = end
  }
  out += escapeHtml(text.slice(last))
  return out
}

export function invalidateSearchIndex(): void {
  cachedIndex = null
}
