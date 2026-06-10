import type { EventItem } from '../data/events-data'
import { getEventsItems } from '../services/content-store'
import { animate, inView } from 'motion'
import eventCardImage from '../assets/event/event.jpg'

export function renderEventsPage(lang: string): string {
  const isLv = lang === 'lv'
  const title = isLv ? 'Pasākumi' : 'Events'

  const cards = getEventsItems().map((ev: EventItem) => {
    const t = (field: { en: string; lv: string }) => isLv ? field.lv : field.en
    const cardImage = ev.image ?? eventCardImage

    return /* html */ `
      <div class="event-card">
        <div class="event-card-header">
          <div class="event-card-date">
            <span class="event-card-day">${ev.day}</span>
            <span class="event-card-month">${t(ev.month)}</span>
            <span class="event-card-year">${ev.year}</span>
          </div>
        </div>
        <div class="event-card-image-wrap">
          <img class="event-card-image" src="${cardImage}" alt="${t(ev.title)}">
        </div>
        <div class="event-card-body">
          <h3 class="event-card-title">${t(ev.title)}</h3>
          <p class="event-card-desc">${t(ev.description)}</p>
          <div class="event-card-location">
            <span>${t(ev.location)}</span>
          </div>
        </div>
        <div class="event-card-footer">
          <a href="/event/${ev.id}" class="event-card-btn">${isLv ? 'Uzzināt vairāk' : 'Learn More'} →</a>
        </div>
      </div>
    `
  }).join('')

  return /* html */ `
    <section class="events-page" id="events-page">
      <div class="events-page-body">
        <div class="events-grid-cards">
          ${cards}
        </div>
      </div>
    </section>
  `
}

export function setupEventsAnimations() {
  inView('.event-card', (element) => {
    animate(
      element as any,
      { opacity: [0, 1], y: [36, 0] } as any,
      { duration: 0.55, ease: 'ease-out' } as any,
    )
  })
}
