import { eventsData } from './events-data'
import { animate } from 'motion'
import eventCardImage from './assets/event/event.jpg'

export function renderEventDetail(eventId: string, lang: string): string | null {
  const ev = eventsData.find(e => e.id === eventId)
  if (!ev) return null

  const isLv = lang === 'lv'
  const t = (field: { en: string; lv: string }) => isLv ? field.lv : field.en
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(t(ev.location))}&z=14&output=embed`

  return /* html */ `
    <section class="event-detail" id="event-detail">
      <a href="#events" class="event-detail-back">← ${isLv ? 'Atpakaļ uz pasākumiem' : 'Back to Events'}</a>
      <article class="event-detail-card">
        <div class="event-detail-hero">
          <img class="event-detail-image" src="${eventCardImage}" alt="${t(ev.title)}">
          <div class="event-detail-overlay">
            <div class="event-detail-date-big">
              <span class="ed-day">${ev.day}</span>
              <span class="ed-month">${t(ev.month)}</span>
              <span class="ed-year">${ev.year}</span>
            </div>
            <h1 class="event-detail-title">${t(ev.title)}</h1>
          </div>
        </div>

        <div class="event-detail-content">
          <div class="event-detail-main">
            <h2 class="event-detail-section-title">${isLv ? 'Pasākuma apraksts' : 'Event Overview'}</h2>
            <p class="event-detail-desc">${t(ev.description)}</p>
            <p class="event-detail-desc">
              ${isLv
                ? 'Pasākumā iekļautas apmācības sesijas, praktiskie uzdevumi un diskusijas ar mentoriem. Programma ir veidota tā, lai dalībnieki uzlabotu argumentāciju, runas struktūru un komandas sadarbību.'
                : 'The event includes training sessions, practical rounds, and mentor-led discussions. The program is designed to improve argumentation quality, speech structure, and team collaboration.'}
            </p>
          </div>

          <aside class="event-detail-sidebar">
            <div class="event-detail-info-item">
              <span class="info-label">${isLv ? 'Datums' : 'Date'}</span>
              <span>${ev.date}</span>
            </div>
            <div class="event-detail-info-item">
              <span class="info-label">${isLv ? 'Vieta' : 'Location'}</span>
              <span>${t(ev.location)}</span>
            </div>
            <div class="event-detail-info-item">
              <span class="info-label">${isLv ? 'Formāts' : 'Format'}</span>
              <span>${isLv ? 'British Parliamentary' : 'British Parliamentary'}</span>
            </div>
            <!-- <a href="#events" class="event-detail-register">${isLv ? 'Reģistrēties' : 'Register Now'}</a> -->
          </aside>
        </div>

        <div class="event-detail-map-wrap">
          <h2 class="event-detail-section-title">${isLv ? 'Norises vieta kartē' : 'Location on Map'}</h2>
          <iframe
            class="event-detail-map"
            src="${mapSrc}"
            title="${isLv ? 'Pasākuma norises vieta kartē' : 'Event location map'}"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </article>
    </section>
  `
}

export function setupEventDetailAnimations() {
  const card = document.querySelector('.event-detail-card')
  const backLink = document.querySelector('.event-detail-back')

  if (card) {
    animate(
      card as any,
      { opacity: [0, 1], y: [30, 0] } as any,
      { duration: 0.5, ease: 'ease-out' } as any,
    )
  }

  if (backLink) {
    animate(
      backLink as any,
      { opacity: [0, 1], x: [-20, 0] } as any,
      { duration: 0.4, ease: 'ease-out' } as any,
    )
  }
}
