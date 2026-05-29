import { getNewsItems } from '../services/content-store'
import { inView, animate } from 'motion'

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

export function renderNewsPage(lang: string): string {
  const isLv = lang === 'lv'

  const cards = [...getNewsItems()]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((item) => {
      const title = pick(isLv, item.title)
      const excerpt = pick(isLv, item.excerpt)
      const dateLabel = formatDate(item.date, isLv)

      return /* html */ `
        <article class="news-card">
          <a class="news-card-media" href="/news/${item.id}">
            <img
              class="news-card-image"
              src="${item.image}"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </a>
          <div class="news-card-body">
            <time class="news-card-date" datetime="${item.date}">${dateLabel}</time>
            <h2 class="news-card-title">
              <a href="/news/${item.id}">${title}</a>
            </h2>
            <p class="news-card-excerpt">${excerpt}</p>
            <a href="/news/${item.id}" class="news-card-link">
              ${isLv ? 'Lasīt vairāk' : 'Read more'} →
            </a>
          </div>
        </article>
      `
    })
    .join('')

  return /* html */ `
    <section class="news-page" id="news-page">
      <h1 class="news-page-title">${isLv ? 'Jaunumi' : 'News'}</h1>
      <p class="news-page-subtitle">
        ${isLv
          ? 'Jaunākās ziņas no mūsu Instagram un pasākumiem.'
          : 'Latest updates from our Instagram and events.'}
      </p>
      <div class="news-grid" role="list">
        ${cards}
      </div>
    </section>
  `
}

export function setupNewsAnimations(): void {
  inView('.news-card', (el) => {
    animate(el as HTMLElement, { opacity: [0, 1], y: [18, 0] } as any, { duration: 0.45, ease: 'ease-out' } as any)
  })
}
