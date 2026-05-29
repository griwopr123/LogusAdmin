import { getNewsItems } from '../services/content-store'
import { animate } from 'motion'

function pick(isLv: boolean, pair: { en: string; lv: string }): string {
  return isLv ? pair.lv : pair.en
}

function formatDate(date: string, isLv: boolean): string {
  const d = new Date(date + 'T12:00:00')
  return d.toLocaleDateString(isLv ? 'lv-LV' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function renderNewsDetail(newsId: string, lang: string): string | null {
  const item = getNewsItems().find((n) => n.id === newsId)
  if (!item) return null

  const isLv = lang === 'lv'
  const title = pick(isLv, item.title)
  const body = pick(isLv, item.body)
  const dateLabel = formatDate(item.date, isLv)

  const instagramBlock = item.instagramUrl
    ? /* html */ `
      <p class="news-detail-instagram">
        <a href="${item.instagramUrl}" target="_blank" rel="noopener noreferrer" class="news-detail-instagram-link">
          <i class="fa-brands fa-instagram" aria-hidden="true"></i>
          ${isLv ? 'Skatīt Instagram' : 'View on Instagram'}
        </a>
      </p>
    `
    : ''

  return /* html */ `
    <article class="news-detail" id="news-detail">
      <a href="/page/news" class="news-detail-back">← ${isLv ? 'Atpakaļ uz jaunumiem' : 'Back to News'}</a>

      <div class="news-detail-hero">
        <img class="news-detail-image" src="${item.image}" alt="" loading="eager" decoding="async" />
      </div>

      <div class="news-detail-content">
        <time class="news-detail-date" datetime="${item.date}">${dateLabel}</time>
        <h1 class="news-detail-title">${title}</h1>

        <div class="news-detail-body">
          <p>${body}</p>
        </div>

        ${instagramBlock}
      </div>
    </article>
  `
}

export function setupNewsDetailAnimations(): void {
  const hero = document.querySelector('.news-detail-hero')
  const content = document.querySelector('.news-detail-content')
  if (hero) {
    animate(hero as HTMLElement, { opacity: [0, 1] } as any, { duration: 0.5, ease: 'ease-out' } as any)
  }
  if (content) {
    animate(content as HTMLElement, { opacity: [0, 1], y: [16, 0] } as any, { duration: 0.45, ease: 'ease-out', delay: 0.08 } as any)
  }
}
