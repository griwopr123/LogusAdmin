import { aboutPillars, aboutStats, aboutValues } from '../data/about-data'
import { animate, inView } from 'motion'

function pick(isLv: boolean, pair: { en: string; lv: string }): string {
  return isLv ? pair.lv : pair.en
}

export function renderAboutPage(lang: string): string {
  const isLv = lang === 'lv'

  const pillars = aboutPillars
    .map(
      (item, index) => /* html */ `
      <article class="about-pillar-card">
        <span class="about-pillar-num" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
        <h3 class="about-pillar-title">${pick(isLv, item.title)}</h3>
        <p class="about-pillar-text">${pick(isLv, item.text)}</p>
      </article>
    `,
    )
    .join('')

  const values = aboutValues
    .map(
      (item) => /* html */ `
      <article class="about-value-card">
        <h3 class="about-value-title">${pick(isLv, item.title)}</h3>
        <p class="about-value-text">${pick(isLv, item.text)}</p>
      </article>
    `,
    )
    .join('')

  const stats = aboutStats
    .map(
      (item) => /* html */ `
      <div class="about-stat">
        <span class="about-stat-value">${item.value}</span>
        <span class="about-stat-label">${pick(isLv, item.label)}</span>
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
          <p class="about-hero-kicker">LOGUS Debate</p>
          <h1 id="about-hero-title" class="about-hero-title">
            ${isLv ? 'Par mums' : 'About us'}
          </h1>
          <p class="about-hero-lead">
            ${isLv
              ? 'Latvijas vadošā debašu vide — kur jaunieši apgūst argumentāciju, pārliecību un komandas darbu.'
              : "Latvia's home for debate — where young people build argumentation, confidence, and teamwork."}
          </p>
        </div>
      </section>

      <section class="about-intro" aria-labelledby="about-intro-heading">
        <div class="about-intro-inner">
          <div class="about-intro-visual" role="img" aria-label=""></div>
          <div class="about-intro-copy">
            <h2 id="about-intro-heading" class="about-section-heading">
              ${isLv ? 'Kas ir LOGUS Debate?' : 'What is LOGUS Debate?'}
            </h2>
            <p>
              ${isLv
                ? 'Mēs esam biedrība un debašu klubs, kas apvieno jauniešus, studentus un mentorus no Rīgas un visas Latvijas. Nodarbības notiek strukturēti — ar skaidriem mērķiem, atbalstošu atmosfēru un augstu prasību līmeni.'
                : 'We are an association and debate club bringing together youth, students, and mentors from Riga and across Latvia. Sessions are structured — clear goals, a supportive atmosphere, and high standards.'}
            </p>
            <p>
              ${isLv
                ? 'Galvenais sacensību formāts ir British Parliamentary (BP). Papildus rīkojam treniņdebates, skolu programmas, vasaras skolas un starptautiskus sadarbības projektus.'
                : 'Our main competitive format is British Parliamentary (BP). We also run practice debates, school programmes, summer schools, and international collaborations.'}
            </p>
            <div class="about-intro-actions">
              <a href="/events" class="about-btn about-btn--primary">${isLv ? 'Pasākumi' : 'Events'}</a>
              <a href="/team" class="about-btn about-btn--ghost">${isLv ? 'Komanda' : 'Team'}</a>
            </div>
          </div>
        </div>
      </section>

      <section class="about-location" aria-labelledby="about-location-heading">
        <div class="about-location-inner">
          <div class="about-location-copy">
            <h2 id="about-location-heading" class="about-section-heading">
              ${isLv ? 'Kur mūs atrast' : 'Find us'}
            </h2>
            <p class="about-location-text">
              ${isLv
                ? 'Bāze Rīgā — nodarbības un turnīri notiek klātienē un tiešsaistē. Precīzu adresi un laiku norādām reģistrācijā uz konkrētu pasākumu.'
                : 'Based in Riga — training and tournaments run in person and online. Exact venue and times are shared when you register for an event.'}
            </p>
            <dl class="about-contact-dl">
              <div>
                <dt>${isLv ? 'E-pasts' : 'Email'}</dt>
                <dd><a href="mailto:info@logusdebate.lv">info@logusdebate.lv</a></dd>
              </div>
              <div>
                <dt>${isLv ? 'Tālrunis' : 'Phone'}</dt>
                <dd><a href="tel:+37112345678">+371 12345678</a></dd>
              </div>
              <div>
                <dt>${isLv ? 'Vieta' : 'Location'}</dt>
                <dd>${isLv ? 'Rīga, Latvija' : 'Riga, Latvia'}</dd>
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
