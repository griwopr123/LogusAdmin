export function renderAboutPage(lang: string): string {
  const isLv = lang === 'lv'

  return /* html */ `
    <section class="about-kassapay" style="margin-top: 200px;" id="about">

      <div class="about-kassapay-card">
        <div class="about-kassapay-card-left">
          <h3>${isLv ? 'Iepazīsti LOGUS' : 'Get to know LOGUS'}</h3>
          <p class="about-kassapay-muted">
            ${isLv
              ? 'Mēs esam kopiena ar skaidru metodiku un draudzīgu vidi, kur augt.'
              : 'We are a community with clear methodology and a welcoming environment to grow.'}
          </p>

          <div class="about-kassapay-info">
            <div class="about-kassapay-info-row">
              <div class="about-kassapay-ic">◎</div>
              <div>
                <div class="about-kassapay-info-title">${isLv ? 'Atrašanās vieta' : 'Location'}</div>
                <div class="about-kassapay-info-text">${isLv ? 'Rīga, Latvija' : 'Riga, Latvia'}</div>
              </div>
            </div>
            <div class="about-kassapay-info-row">
              <div class="about-kassapay-ic">✉</div>
              <div>
                <div class="about-kassapay-info-title">${isLv ? 'E-pasts' : 'Email'}</div>
                <div class="about-kassapay-info-text">info@logusdebate.lv</div>
              </div>
            </div>
            <div class="about-kassapay-info-row">
              <div class="about-kassapay-ic">☎</div>
              <div>
                <div class="about-kassapay-info-title">${isLv ? 'Tālrunis' : 'Phone'}</div>
                <div class="about-kassapay-info-text">+371 12345678</div>
              </div>
            </div>
          </div>

          <div class="about-kassapay-social">
            <div class="about-kassapay-info-title">${isLv ? 'Seko mums' : 'Follow us'}</div>
            <div class="about-kassapay-social-row">
              <a href="#" class="about-kassapay-social-btn" aria-label="Facebook">f</a>
              <a href="#" class="about-kassapay-social-btn" aria-label="Instagram">in</a>
              <a href="#" class="about-kassapay-social-btn" aria-label="Twitter">x</a>
              <a href="#" class="about-kassapay-social-btn" aria-label="LinkedIn">in</a>
            </div>
          </div>
        </div>

        <div class="about-kassapay-card-right">
          <h3>${isLv ? 'Ko mēs darām' : 'What we do'}</h3>

          <div class="about-kassapay-grid">
            <div class="about-kassapay-field">
              <div class="about-kassapay-label">${isLv ? 'Treniņi' : 'Training'}</div>
              <div class="about-kassapay-value">${isLv ? 'Regulāras nodarbības ar metodiku un praksi.' : 'Regular sessions with methodology and practice.'}</div>
            </div>
            <div class="about-kassapay-field">
              <div class="about-kassapay-label">${isLv ? 'Turnīri' : 'Tournaments'}</div>
              <div class="about-kassapay-value">${isLv ? 'Sacensības jauniešiem un open līmenī.' : 'Competitions for youth and open level.'}</div>
            </div>
            <div class="about-kassapay-field">
              <div class="about-kassapay-label">${isLv ? 'Mentorings' : 'Mentoring'}</div>
              <div class="about-kassapay-value">${isLv ? 'Atgriezeniskā saite un izaugsmes plāns.' : 'Feedback and a growth plan.'}</div>
            </div>
            <div class="about-kassapay-field">
              <div class="about-kassapay-label">${isLv ? 'Formāts' : 'Format'}</div>
              <div class="about-kassapay-value">${isLv ? 'British Parliamentary (BP) un treniņdebates.' : 'British Parliamentary (BP) and practice rounds.'}</div>
            </div>
          </div>

          <div class="about-kassapay-panel">
            <div class="about-kassapay-panel-title">${isLv ? 'Mūsu misija' : 'Our mission'}</div>
            <p class="about-kassapay-muted">
              ${isLv
                ? 'Veicināt jauniešu potenciālu, attīstot pārliecību, domāšanas skaidrību un argumentācijas prasmes.'
                : 'Unlock youth potential by developing confidence, clarity of thinking, and argumentation skills.'}
            </p>
          </div>
        </div>
      </div>

      <div class="about-kassapay-map-wrap">
        <iframe
          class="about-kassapay-map"
          src="https://maps.google.com/maps?q=Riga%2C%20Latvia&z=12&output=embed"
          title="${isLv ? 'LOGUS Debate kartē' : 'LOGUS Debate on map'}"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  `
}
