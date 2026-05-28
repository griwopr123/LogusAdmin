export function renderAboutPage(lang: string): string {
  const isLv = lang === 'lv'

  return /* html */ `
    <article class="about-page" id="about">
      <section class="about-hero" aria-labelledby="about-hero-title">
        <div class="about-hero-media" role="presentation"></div>
        <div class="about-hero-scrim" aria-hidden="true"></div>
        <div class="about-hero-content">
          <p class="about-hero-eyebrow">LOGUS Debate</p>
          <h1 id="about-hero-title" class="about-hero-title">${isLv ? 'Par mums' : 'About us'}</h1>
          <p class="about-hero-sub">
            ${isLv
              ? 'Kopiena ar skaidru metodiku un vidi, kur augt.'
              : 'A community with clear methodology and room to grow.'}
          </p>
        </div>
      </section>

      <div class="about-layout">
        <div class="about-layout-grid">
          <main class="about-main">
            <p class="about-lede">
              ${isLv
                ? 'LOGUS Debate apvieno jauniešus un mentorus, kas vēlas stiprināt argumentāciju, publisko runu un komandas darbu. Nodarbības notiek strukturēti, ar skaidriem mērķiem un atbalstošu atmosfēru.'
                : 'LOGUS Debate brings together young people and mentors who want to strengthen argumentation, public speaking, and teamwork. Sessions are structured, with clear goals and a supportive atmosphere.'}
            </p>

            <section class="about-pillars" aria-labelledby="about-pillars-heading">
              <h2 id="about-pillars-heading" class="about-section-title">${isLv ? 'Ko mēs darām' : 'What we do'}</h2>
              <div class="about-pillars-grid">
                <article class="about-pillar">
                  <h3 class="about-pillar-title">${isLv ? 'Treniņi' : 'Training'}</h3>
                  <p class="about-pillar-text">
                    ${isLv ? 'Regulāras nodarbības ar metodiku un praksi.' : 'Regular sessions with methodology and practice.'}
                  </p>
                </article>
                <article class="about-pillar">
                  <h3 class="about-pillar-title">${isLv ? 'Turnīri' : 'Tournaments'}</h3>
                  <p class="about-pillar-text">
                    ${isLv ? 'Sacensības jauniešiem un open līmenī.' : 'Competitions for youth and open level.'}
                  </p>
                </article>
                <article class="about-pillar">
                  <h3 class="about-pillar-title">${isLv ? 'Mentorings' : 'Mentoring'}</h3>
                  <p class="about-pillar-text">
                    ${isLv ? 'Atgriezeniskā saite un izaugsmes plāns.' : 'Feedback and a growth plan.'}
                  </p>
                </article>
                <article class="about-pillar">
                  <h3 class="about-pillar-title">${isLv ? 'Formāts' : 'Format'}</h3>
                  <p class="about-pillar-text">
                    ${isLv ? 'British Parliamentary (BP) un treniņdebates.' : 'British Parliamentary (BP) and practice rounds.'}
                  </p>
                </article>
              </div>
            </section>

            <section class="about-mission" aria-labelledby="about-mission-heading">
              <h2 id="about-mission-heading" class="about-section-title">${isLv ? 'Misija' : 'Mission'}</h2>
              <blockquote class="about-mission-quote">
                <p>
                  ${isLv
                    ? 'Veicināt jauniešu potenciālu, attīstot pārliecību, domāšanas skaidrību un argumentācijas prasmes.'
                    : 'Unlock youth potential by developing confidence, clarity of thinking, and argumentation skills.'}
                </p>
              </blockquote>
            </section>

            <section class="about-map-block" aria-labelledby="about-map-heading">
              <h2 id="about-map-heading" class="about-section-title">${isLv ? 'Atrašanās vieta' : 'Location'}</h2>
              <div class="about-map-frame">
                <iframe
                  class="about-map"
                  src="https://maps.google.com/maps?q=Riga%2C%20Latvia&z=12&output=embed"
                  title="${isLv ? 'LOGUS Debate kartē' : 'LOGUS Debate on map'}"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </section>
          </main>

          <aside class="about-aside" aria-label="${isLv ? 'Kontaktinformācija' : 'Contact details'}">
            <div class="about-aside-sticky">
              <h2 class="about-aside-title">${isLv ? 'Kontakti' : 'Contact'}</h2>
              <dl class="about-dl">
                <div class="about-dl-row">
                  <dt>${isLv ? 'Vieta' : 'Location'}</dt>
                  <dd>${isLv ? 'Rīga, Latvija' : 'Riga, Latvia'}</dd>
                </div>
                <div class="about-dl-row">
                  <dt>Email</dt>
                  <dd><a href="mailto:info@logusdebate.lv">info@logusdebate.lv</a></dd>
                </div>
                <div class="about-dl-row">
                  <dt>${isLv ? 'Tālrunis' : 'Phone'}</dt>
                  <dd><a href="tel:+37112345678">+371 12345678</a></dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </article>
  `
}
