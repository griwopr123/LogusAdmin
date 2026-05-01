export function renderDonationPage(lang: string): string {
  const isLv = lang === 'lv'

  return /* html */ `
    <section class="donation-page" id="donation">
      <div class="donation-hero">
        <p class="donation-kicker">${isLv ? 'Atbalsts' : 'Support'}</p>
        <h2>${isLv ? 'Palīdzi augt debašu kopienai Latvijā' : 'Help grow the debate community in Latvia'}</h2>
        <p class="donation-lead">
          ${isLv
            ? 'Katrs ziedojums palīdz organizēt turnīrus, mācības un stipendijas jauniešiem.'
            : 'Every donation helps us run tournaments, training programs, and scholarships for young debaters.'}
        </p>
        <div class="donation-hero-actions">
          <a class="donation-cta" href="mailto:info@logusdebate.lv">${isLv ? 'Sazināties ar mums' : 'Contact us'}</a>
          <p class="donation-hero-note">
            ${isLv
              ? 'Ikviens ziedojums tiek novirzīts mācībām, turnīriem un stipendijām.'
              : 'Every gift is invested in training, tournaments, and scholarships.'}
          </p>
        </div>
      </div>

      <div class="donation-grid">
        <article class="donation-card donation-card-highlight">
          <h3>${isLv ? 'Kāpēc ziedot?' : 'Why donate?'}</h3>
          <ul>
            <li>${isLv ? 'Bezmaksas nodarbības skolēniem reģionos' : 'Free training sessions for students in regions'}</li>
            <li>${isLv ? 'Nacionālie un starptautiskie turnīri' : 'National and international tournaments'}</li>
            <li>${isLv ? 'Mentoru programma jaunajiem debatieriem' : 'Mentorship program for beginner debaters'}</li>
          </ul>
        </article>

        <article class="donation-card donation-card-accent">
          <h3>${isLv ? 'Kā ziedot' : 'How to donate'}</h3>
          <dl class="donation-details">
            <div>
              <dt>${isLv ? 'Saņēmējs:' : 'Recipient:'}</dt>
              <dd>LOGUS Debate</dd>
            </div>
            <div>
              <dt>IBAN:</dt>
              <dd>LV00HABA0000000000000</dd>
            </div>
            <div>
              <dt>${isLv ? 'Mērķis:' : 'Purpose:'}</dt>
              <dd>${isLv ? 'Jauniešu debašu programmu atbalsts' : 'Support youth debate programs'}</dd>
            </div>
          </dl>
          <a class="donation-mail" href="mailto:info@logusdebate.lv">info@logusdebate.lv</a>
        </article>
      </div>
    </section>
  `
}
