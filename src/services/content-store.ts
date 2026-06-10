import { newsData as staticNewsData, type NewsItem } from '../data/news-data'
import { eventsData as staticEventsData, type EventItem } from '../data/events-data'
import { staticPartnersData, type PartnerItem } from '../data/partners-data'
import type { SponsorItem } from '../data/sponsors-data'
import { staticDocumentsData, type DocumentItem } from '../data/documents-data'
import { staticProjectsData, type ProjectItem } from '../data/projects-data'
import { staticTeamMembers, type TeamMember } from '../data/team-data'
import { archivePhotos as staticArchivePhotos, type ArchivePhoto } from '../data/archive-data'
import { fetchApiList, mediaUrl } from '../utils/api'

interface ApiNewsItem {
  id: number | string
  image: string
  date: string
  title_en: string
  title_lv: string
  body_en: string
  body_lv: string
  has_instagram?: boolean
  instagram_url?: string
}

interface ApiEventItem {
  id: number | string
  image?: string
  event_date?: string
  date?: string
  title_en: string
  title_lv: string
  body_en: string
  body_lv: string
  location_en: string
  location_lv: string
  format_en: string
  format_lv: string
  google_maps_url?: string
}

interface ApiSponsorItem {
  id: number | string
  image: string
}

interface ApiArchivePhotoItem {
  id: number | string
  image: string
  photo_date?: string
  created_at?: string
  caption_en?: string
  caption_lv?: string
}

interface ApiTeamItem {
  id: number | string
  first_name_en: string
  first_name_lv: string
  last_name_en: string
  last_name_lv: string
  position_en: string
  position_lv: string
  photo: string
}

interface ApiPartnerItem {
  id: number | string
  title_en: string
  title_lv: string
  description_en: string
  description_lv: string
  url: string
}

interface ApiProjectItem {
  id: number | string
  image: string
  gallery?: string[]
  sponsor_logos?: string[]
  funded?: boolean
  title_en: string
  title_lv: string
  text_en: string
  text_lv: string
}

interface ApiDocumentItem {
  id: number | string
  category: string
  title_en: string
  title_lv: string
  excerpt_en: string
  excerpt_lv: string
  place_en: string
  place_lv: string
  issue_date: string
  section_title_en: string
  section_title_lv: string
  content_en: string
  content_lv: string
}

const LV_MONTHS = [
  'JANVĀRIS',
  'FEBRUARIS',
  'MARTS',
  'APRĪLIS',
  'MAIJS',
  'JŪNIJS',
  'JŪLIJS',
  'AUGUSTS',
  'SEPTEMBRIS',
  'OKTOBRIS',
  'NOVEMBRIS',
  'DECEMBRIS',
]

let newsItems: NewsItem[] = [...staticNewsData]
let eventsItems: EventItem[] = [...staticEventsData]
let sponsorItems: SponsorItem[] = []
let teamItems: TeamMember[] = [...staticTeamMembers]
let partnerItems: PartnerItem[] = [...staticPartnersData]
let projectItems: ProjectItem[] = [...staticProjectsData]
let documentItems: DocumentItem[] = [...staticDocumentsData]
let archivePhotoItems: ArchivePhoto[] = [...staticArchivePhotos]
let contentSource: 'api' | 'static' = 'static'

function bodyParagraphs(text: string): string[] {
  const trimmed = text.trim()
  if (!trimmed) return []

  const blocks = trimmed.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
  if (blocks.length > 1) return blocks

  const lines = trimmed.split(/\n/).map((p) => p.trim()).filter(Boolean)
  return lines.length > 0 ? lines : [trimmed]
}

function excerptFromBody(text: string, maxLen = 160): string {
  const trimmed = text.trim()
  if (trimmed.length <= maxLen) return trimmed
  const slice = trimmed.slice(0, maxLen)
  const lastSpace = slice.lastIndexOf(' ')
  return `${(lastSpace > 40 ? slice.slice(0, lastSpace) : slice).trim()}…`
}

/** API/admin: "2026-05-28 00:00:00", "2026-05-28T18:47", or "2026-05-28" → "2026-05-28" */
function normalizeEventDateIso(dateStr: string): string | null {
  const trimmed = dateStr.trim()
  if (!trimmed) return null

  const isoMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (isoMatch) {
    return `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`
  }

  const parsed = Date.parse(trimmed.includes(' ') ? trimmed.replace(' ', 'T') : trimmed)
  if (Number.isNaN(parsed)) return null

  const d = new Date(parsed)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function eventDateParts(dateStr: string): Pick<EventItem, 'date' | 'day' | 'month' | 'year'> {
  const iso = normalizeEventDateIso(dateStr)
  const empty = { date: '', day: '', month: { en: '', lv: '' }, year: '' }
  if (!iso) return empty

  const [year, month, day] = iso.split('-')
  const monthIndex = Math.max(0, Math.min(11, parseInt(month, 10) - 1))
  const stamp = new Date(`${iso}T12:00:00`)
  const enMonth = Number.isNaN(stamp.getTime())
    ? ''
    : stamp.toLocaleString('en-US', { month: 'short' }).toUpperCase()

  return {
    date: iso,
    day: String(parseInt(day, 10)),
    month: { en: enMonth || '—', lv: LV_MONTHS[monthIndex] ?? enMonth },
    year,
  }
}

function mapNewsItem(raw: ApiNewsItem): NewsItem {
  return {
    id: String(raw.id),
    date: raw.date,
    image: mediaUrl(raw.image),
    instagramUrl:
      raw.has_instagram && raw.instagram_url?.trim() ? raw.instagram_url.trim() : undefined,
    title: { en: raw.title_en, lv: raw.title_lv },
    excerpt: {
      en: excerptFromBody(raw.body_en),
      lv: excerptFromBody(raw.body_lv),
    },
    body: { en: raw.body_en, lv: raw.body_lv },
  }
}

function mapEventItem(raw: ApiEventItem): EventItem {
  const dateStr = (raw.event_date ?? raw.date ?? '').trim()
  const parts = dateStr ? eventDateParts(dateStr) : { date: '', day: '', month: { en: '', lv: '' }, year: '' }

  return {
    ...parts,
    id: String(raw.id),
    title: { en: raw.title_en, lv: raw.title_lv },
    description: { en: raw.body_en, lv: raw.body_lv },
    location: { en: raw.location_en, lv: raw.location_lv },
    category: 'workshop',
    image: raw.image ? mediaUrl(raw.image) : undefined,
    googleMapsUrl: raw.google_maps_url?.trim() || undefined,
    format: { en: raw.format_en, lv: raw.format_lv },
  }
}

function mapSponsorItem(raw: ApiSponsorItem): SponsorItem {
  return {
    id: String(raw.id),
    image: mediaUrl(raw.image),
  }
}

function mapTeamMember(raw: ApiTeamItem): TeamMember {
  return {
    id: String(raw.id),
    name: {
      en: `${raw.first_name_en} ${raw.last_name_en}`.trim(),
      lv: `${raw.first_name_lv} ${raw.last_name_lv}`.trim(),
    },
    role: { en: raw.position_en, lv: raw.position_lv },
    photo: mediaUrl(raw.photo),
  }
}

function mapDocumentItem(raw: ApiDocumentItem): DocumentItem {
  const category = raw.category === 'reports' ? 'reports' : 'statutes'

  return {
    id: String(raw.id),
    category,
    title: { en: raw.title_en, lv: raw.title_lv },
    excerpt: { en: raw.excerpt_en, lv: raw.excerpt_lv },
    place: { en: raw.place_en, lv: raw.place_lv },
    issueDate: raw.issue_date,
    sectionTitle: { en: raw.section_title_en, lv: raw.section_title_lv },
    content: {
      en: bodyParagraphs(raw.content_en),
      lv: bodyParagraphs(raw.content_lv),
    },
  }
}

function mapProjectItem(raw: ApiProjectItem): ProjectItem {
  const image = mediaUrl(raw.image)
  const bodyEn = bodyParagraphs(raw.text_en)
  const bodyLv = bodyParagraphs(raw.text_lv)
  const galleryRaw = Array.isArray(raw.gallery) ? raw.gallery : []
  const gallery = galleryRaw
    .map((path) => mediaUrl(path))
    .filter((path) => path.trim() !== '')

  const uniqueGallery = gallery.length > 0
    ? [...new Set(gallery)]
    : [image]

  if (!uniqueGallery.includes(image)) {
    uniqueGallery.unshift(image)
  }

  const sponsorLogos = (Array.isArray(raw.sponsor_logos) ? raw.sponsor_logos : [])
    .map((path) => mediaUrl(path))
    .filter((path) => path.trim() !== '')

  return {
    id: String(raw.id),
    image,
    heroImage: image,
    gallery: uniqueGallery,
    sponsorLogos,
    funded: sponsorLogos.length > 0 || Boolean(raw.funded),
    title: { en: raw.title_en, lv: raw.title_lv },
    excerpt: {
      en: excerptFromBody(raw.text_en),
      lv: excerptFromBody(raw.text_lv),
    },
    heroIntro: {
      en: bodyEn[0] ?? excerptFromBody(raw.text_en),
      lv: bodyLv[0] ?? excerptFromBody(raw.text_lv),
    },
    body: {
      en: bodyEn.length > 0 ? bodyEn : [raw.text_en],
      lv: bodyLv.length > 0 ? bodyLv : [raw.text_lv],
    },
  }
}

function resolveArchivePhotoDate(raw: ApiArchivePhotoItem): string {
  const explicit = (raw.photo_date ?? '').trim()
  if (/^\d{4}-\d{2}-\d{2}/.test(explicit)) {
    return explicit.slice(0, 10)
  }

  const created = (raw.created_at ?? '').trim()
  const createdMatch = created.match(/^(\d{4}-\d{2}-\d{2})/)
  if (createdMatch) {
    return createdMatch[1]
  }

  return new Date().toISOString().slice(0, 10)
}

function mapArchivePhoto(raw: ApiArchivePhotoItem): ArchivePhoto {
  return {
    id: String(raw.id),
    src: mediaUrl(raw.image),
    photoDate: resolveArchivePhotoDate(raw),
  }
}

function mapPartnerItem(raw: ApiPartnerItem): PartnerItem {
  return {
    id: String(raw.id),
    category: { en: 'Partner', lv: 'Partneris' },
    name: { en: raw.title_en, lv: raw.title_lv },
    description: { en: raw.description_en, lv: raw.description_lv },
    url: raw.url.trim(),
  }
}

export function getNewsItems(): NewsItem[] {
  return newsItems
}

export function getEventsItems(): EventItem[] {
  return eventsItems
}

export function getSponsorItems(): SponsorItem[] {
  return sponsorItems
}

export function getTeamMembers(): TeamMember[] {
  return teamItems
}

export function getPartnerItems(): PartnerItem[] {
  return partnerItems
}

export function getProjectItems(): ProjectItem[] {
  return projectItems
}

export function getDocumentItems(): DocumentItem[] {
  return documentItems
}

export function getArchivePhotos(): ArchivePhoto[] {
  return archivePhotoItems
}

export function getContentSource(): 'api' | 'static' {
  return contentSource
}

export async function loadSiteContent(): Promise<void> {
  const [
    newsResult,
    eventsResult,
    sponsorsResult,
    teamResult,
    partnersResult,
    projectsResult,
    documentsResult,
    archiveResult,
  ] = await Promise.allSettled([
    fetchApiList<ApiNewsItem>('news.php'),
    fetchApiList<ApiEventItem>('events.php'),
    fetchApiList<ApiSponsorItem>('sponsors.php'),
    fetchApiList<ApiTeamItem>('team.php'),
    fetchApiList<ApiPartnerItem>('partners.php'),
    fetchApiList<ApiProjectItem>('projects.php'),
    fetchApiList<ApiDocumentItem>('documents.php'),
    fetchApiList<ApiArchivePhotoItem>('archive.php'),
  ])

  let apiConnected = false

  if (newsResult.status === 'fulfilled') {
    newsItems = newsResult.value.map(mapNewsItem)
    apiConnected = true
  } else {
    console.warn('[LOGUS] news.php failed, using static news.', newsResult.reason)
    newsItems = [...staticNewsData]
  }

  if (eventsResult.status === 'fulfilled') {
    eventsItems = eventsResult.value.map(mapEventItem)
    apiConnected = true
  } else {
    console.warn('[LOGUS] events.php failed, using static events.', eventsResult.reason)
    eventsItems = [...staticEventsData]
  }

  if (sponsorsResult.status === 'fulfilled') {
    sponsorItems = sponsorsResult.value.map(mapSponsorItem)
    apiConnected = true
  } else {
    console.warn('[LOGUS] sponsors.php failed, sponsors section empty.', sponsorsResult.reason)
    sponsorItems = []
  }

  if (teamResult.status === 'fulfilled') {
    teamItems = teamResult.value.map(mapTeamMember)
    apiConnected = true
  } else {
    console.warn('[LOGUS] team.php failed, using static team.', teamResult.reason)
    teamItems = [...staticTeamMembers]
  }

  if (partnersResult.status === 'fulfilled') {
    partnerItems = partnersResult.value.map(mapPartnerItem)
    apiConnected = true
  } else {
    console.warn('[LOGUS] partners.php failed, using static partners.', partnersResult.reason)
    partnerItems = [...staticPartnersData]
  }

  if (projectsResult.status === 'fulfilled') {
    projectItems = projectsResult.value.map(mapProjectItem)
    apiConnected = true
  } else {
    console.warn('[LOGUS] projects.php failed, using static projects.', projectsResult.reason)
    projectItems = [...staticProjectsData]
  }

  if (documentsResult.status === 'fulfilled') {
    documentItems = documentsResult.value.map(mapDocumentItem)
    apiConnected = true
  } else {
    console.warn('[LOGUS] documents.php failed, using static documents.', documentsResult.reason)
    documentItems = [...staticDocumentsData]
  }

  if (archiveResult.status === 'fulfilled') {
    archivePhotoItems = archiveResult.value.map(mapArchivePhoto)
    apiConnected = true
  } else {
    console.warn('[LOGUS] archive.php failed, using static archive photos.', archiveResult.reason)
    archivePhotoItems = [...staticArchivePhotos]
  }

  contentSource = apiConnected ? 'api' : 'static'
}
