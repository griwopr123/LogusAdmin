import { eventsData, type EventItem } from '../data/events-data'
import { animate, inView } from 'motion'
import eventCardImage from '../assets/event/event.jpg'

export const categoryLabels: Record<string, { en: string; lv: string }> = {
  championship: { en: 'Championship', lv: 'Čempionāts' },
  workshop: { en: 'Workshop', lv: 'Seminārs' },
  online: { en: 'Online', lv: 'Tiešsaistē' },
  camp: { en: 'Camp', lv: 'Nometne' },
}

export function renderEventsPage(lang: string): string {
  const isLv = lang === 'lv'
  const title = isLv ? 'Pasākumi' : 'Events'

  const cards = eventsData.map((ev: EventItem) => {
    const t = (field: { en: string; lv: string }) => isLv ? field.lv : field.en
    const catLabel = categoryLabels[ev.category] ? t(categoryLabels[ev.category]) : ev.category

    return /* html */ `
      <div class="event-card" data-category="${ev.category}">
        <div class="event-card-header">
          <div class="event-card-date">
            <span class="event-card-day">${ev.day}</span>
            <span class="event-card-month">${t(ev.month)}</span>
            <span class="event-card-year">${ev.year}</span>
          </div>
          <span class="event-card-badge">${catLabel}</span>
        </div>
        <div class="event-card-image-wrap">
          <img class="event-card-image" src="${eventCardImage}" alt="${t(ev.title)}">
        </div>
        <div class="event-card-body">
          <h3 class="event-card-title">${t(ev.title)}</h3>
          <p class="event-card-desc">${t(ev.description)}</p>
          <div class="event-card-location">
            <span>${t(ev.location)}</span>
          </div>
        </div>
        <div class="event-card-footer">
          <a href="#event/${ev.id}" class="event-card-btn">${isLv ? 'Uzzināt vairāk' : 'Learn More'} →</a>
        </div>
      </div>
    `
  }).join('')

  return /* html */ `
    <section class="events-page" id="events-page">
      <div class="events-page-header">
        <h2>${title}</h2>
        <p class="events-page-subtitle">${isLv ? 'Piedalies mūsu pasākumos un attīsti savas prasmes' : 'Join our events and develop your skills'}</p>
      </div>
      <div class="events-grid-cards">
        ${cards}
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
