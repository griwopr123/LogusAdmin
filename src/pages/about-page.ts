import { animate, inView } from 'motion'
import { getSitePages, pickLang } from '../services/site-pages-store'

export function renderAboutPage(lang: string): string {
  const isLv = lang === 'lv'
  const about = getSitePages().about

  const pillars = about.pillars
    .map(
      (item, index) => /* html */ `
      <article class="about-pillar-card">
        <span class="about-pillar-num" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
        <h3 class="about-pillar-title">${pickLang(isLv, item.title)}</h3>
        <p class="about-pillar-text">${pickLang(isLv, item.text)}</p>
      </article>
    `,
    )
    .join('')

  const values = about.values
    .map(
      (item) => /* html */ `
      <article class="about-value-card">
        <h3 class="about-value-title">${pickLang(isLv, item.title)}</h3>
        <p class="about-value-text">${pickLang(isLv, item.text)}</p>
      </article>
    `,
    )
    .join('')

  const stats = about.stats
    .map(
      (item) => /* html */ `
      <div class="about-stat">
        <span class="about-stat-value">${item.value}</span>
        <span class="about-stat-label">${pickLang(isLv, item.label)}</span>
      </div>
    `,
    )
    .join('')

  return /* html */ `
    <article class="about-page" id="about">
      <section class="about-hero" aria-labelledby="about-hero-title">
        <div class="about-hero-media" role="presentation"></div>
        <div class="about-hero-scrim" aria-hidden="true"></div>
        <div class="about-hero-inner">
          <p class="about-hero-kicker">${about.hero_kicker}</p>
          <h1 id="about-hero-title" class="about-hero-title">
            ${pickLang(isLv, about.hero_title)}
          </h1>
          <p class="about-hero-lead">
            ${pickLang(isLv, about.hero_lead)}
          </p>
        </div>
      </section>

      <section class="about-intro" aria-labelledby="about-intro-heading">
        <div class="about-intro-inner">
          <div class="about-intro-visual" role="img" aria-label=""></div>
          <div class="about-intro-copy">
            <h2 id="about-intro-heading" class="about-section-heading">
              ${pickLang(isLv, about.intro_heading)}
            </h2>
            <p>${pickLang(isLv, about.intro_p1)}</p>
            <p>${pickLang(isLv, about.intro_p2)}</p>
            <div class="about-intro-actions">
              <a href="/events" class="about-btn about-btn--primary">${isLv ? 'Pasākumi' : 'Events'}</a>
              <a href="/team" class="about-btn about-btn--ghost">${isLv ? 'Komanda' : 'Team'}</a>
            </div>
          </div>
        </div>
      </section>

      <!--<section class="about-pillars" aria-labelledby="about-pillars-heading">
        <div class="about-pillars-inner">
          <h2 id="about-pillars-heading" class="about-section-heading">${isLv ? 'Ko mēs darām' : 'What we do'}</h2>
          <div class="about-pillars-grid">${pillars}</div>
        </div>
      </section> -->

      <!--<section class="about-values" aria-labelledby="about-values-heading">
        <div class="about-values-inner">
          <h2 id="about-values-heading" class="about-section-heading">${isLv ? 'Vērtības' : 'Values'}</h2>
          <div class="about-values-grid">${values}</div>
        </div>
      </section>  -->

      <!--<section class="about-stats-band" aria-label="${isLv ? 'Statistika' : 'Statistics'}">
        <div class="about-stats-inner">${stats}</div>
      </section>  -->

      <section class="about-location" aria-labelledby="about-location-heading">
        <div class="about-location-inner">
          <div class="about-location-copy">
            <h2 id="about-location-heading" class="about-section-heading">
              ${pickLang(isLv, about.location_heading)}
            </h2>
            <p class="about-location-text">
              ${pickLang(isLv, about.location_text)}
            </p>
            <dl class="about-contact-dl">
              <div>
                <dt>${isLv ? 'E-pasts' : 'Email'}</dt>
                <dd><a href="mailto:${about.email}">${about.email}</a></dd>
              </div>
              <div>
                <dt>${isLv ? 'Tālrunis' : 'Phone'}</dt>
                <dd><a href="tel:${about.phone.replace(/\s/g, '')}">${about.phone}</a></dd>
              </div>
              <div>
                <dt>${isLv ? 'Vieta' : 'Location'}</dt>
                <dd>${pickLang(isLv, about.location)}</dd>
              </div>
            </dl>
            <a href="/page/contacts" class="about-btn about-btn--primary">
              ${isLv ? 'Visi kontakti' : 'All contacts'}
            </a>
          </div>
          <div class="about-map-wrap">
            <iframe
              class="about-map"
              src="https://maps.google.com/maps?q=Riga%2C%20Latvia&z=12&output=embed"
              title="${isLv ? 'LOGUS Debate kartē' : 'LOGUS Debate on map'}"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </article>
  `
}

export function setupAboutAnimations(): void {
  inView('.about-pillar-card', (el) => {
    animate(el as HTMLElement, { opacity: [0, 1], y: [18, 0] } as any, { duration: 0.45, ease: 'ease-out' } as any)
  })

  inView('.about-value-card', (el) => {
    animate(el as HTMLElement, { opacity: [0, 1], y: [14, 0] } as any, { duration: 0.4, ease: 'ease-out' } as any)
  })

  inView('.about-stat', (el) => {
    animate(el as HTMLElement, { opacity: [0, 1], scale: [0.96, 1] } as any, { duration: 0.4, ease: 'ease-out' } as any)
  })
}
