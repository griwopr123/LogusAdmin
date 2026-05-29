/** Aizvietojiet ar saviem rekvizītiem / Replace with your real bank details */
const BANK_DETAILS = {
  recipient: 'Biedrība "LOGUS Debate"',
  iban: 'LV00HABA0000000000000',
  bankLv: 'Swedbank AS',
  bankEn: 'Swedbank AS',
  bic: 'HABALV22',
}

function copyButton(isLv: boolean, targetId: string, ariaLabel: string, stripSpaces = false): string {
  return /* html */ `
    <button
      type="button"
      class="donation-copy-btn"
      data-copy-target="#${targetId}"
      data-copied-label="${isLv ? 'Nokopēts' : 'Copied'}"
      data-copy-strip-spaces="${stripSpaces ? 'true' : 'false'}"
      aria-label="${ariaLabel}"
    >
      ${isLv ? 'Kopēt' : 'Copy'}
    </button>
  `
}

function copyableValue(id: string, value: string, extraClass = ''): string {
  const cls = ['donation-copyable-value', extraClass].filter(Boolean).join(' ')
  return `<span id="${id}" class="${cls}">${value}</span>`
}

export function setupDonationCopy(): void {
  document.querySelectorAll<HTMLButtonElement>('.donation-copy-btn').forEach((btn) => {
    const targetSel = btn.getAttribute('data-copy-target')
    if (!targetSel) return
    btn.addEventListener('click', async () => {
      const el = document.querySelector<HTMLElement>(targetSel)
      if (!el) return

      const raw = el.textContent?.trim() ?? ''
      const text = btn.dataset.copyStripSpaces === 'true' ? raw.replace(/\s/g, '') : raw
      if (!text) return

      const labelCopied = btn.dataset.copiedLabel ?? 'Copied'
      const prevText = btn.textContent ?? ''
      try {
        await navigator.clipboard.writeText(text)
        btn.textContent = labelCopied
        setTimeout(() => {
          btn.textContent = prevText
        }, 1800)
      } catch {
        /* ignore */
      }
    })
  })
}

export function renderDonationPage(lang: string): string {
  const isLv = lang === 'lv'

  return /* html */ `
    <section class="donation-page donation-page--dark" id="donation">
      <header class="donation-hero" aria-labelledby="donation-heading">
        <div class="donation-hero-media" role="presentation"></div>
        <div class="donation-hero-scrim" aria-hidden="true"></div>
        <div class="donation-hero-inner">
          <p class="donation-kicker">${isLv ? 'Ziedojums' : 'Donate'}</p>
          <h1 id="donation-heading" class="donation-heading">
            ${isLv ? 'Atbalsti debašu izaugsmi Latvijā' : 'Support debate in Latvia'}
          </h1>
          <p class="donation-subtitle">
            ${isLv
              ? 'Tavs ieguldījums palīdz rīkot turnīrus, nodrošināt treniņus un atvērt debašu vidi jauniešiem visā valstī.'
              : 'Your contribution helps run tournaments, training, and open debate to young people across the country.'}
          </p>
        </div>
      </header>

      <div class="donation-page-body">
        <p class="donation-note">
          ${isLv
            ? 'Maksājumu ar karti nepiedāvājam — ziedojumu var nosūtīt tikai ar bankas pārskaitījumu uz zemāk norādīto kontu.'
            : 'We do not accept card payments — please use a bank transfer to the account below.'}
        </p>

        <article class="donation-bank-card">
          <h2 class="donation-bank-title">${isLv ? 'Bankas rekvizīti' : 'Bank details'}</h2>

          <dl class="donation-bank-rows">
            <div class="donation-bank-row">
              <dt>${isLv ? 'Saņēmējs' : 'Recipient'}</dt>
              <dd class="donation-copyable">
                ${copyableValue('donation-recipient-value', BANK_DETAILS.recipient)}
                ${copyButton(isLv, 'donation-recipient-value', isLv ? 'Kopēt saņēmēju' : 'Copy recipient')}
              </dd>
            </div>
            <div class="donation-bank-row donation-bank-row--iban">
              <dt>IBAN</dt>
              <dd class="donation-copyable">
                ${copyableValue('donation-iban-value', BANK_DETAILS.iban, 'donation-mono')}
                ${copyButton(isLv, 'donation-iban-value', isLv ? 'Kopēt IBAN' : 'Copy IBAN', true)}
              </dd>
            </div>
            <div class="donation-bank-row">
              <dt>${isLv ? 'Banka' : 'Bank'}</dt>
              <dd class="donation-copyable">
                ${copyableValue('donation-bank-value', isLv ? BANK_DETAILS.bankLv : BANK_DETAILS.bankEn)}
                ${copyButton(isLv, 'donation-bank-value', isLv ? 'Kopēt banku' : 'Copy bank')}
              </dd>
            </div>
            <div class="donation-bank-row">
              <dt>BIC / SWIFT</dt>
              <dd class="donation-copyable">
                ${copyableValue('donation-bic-value', BANK_DETAILS.bic, 'donation-mono')}
                ${copyButton(isLv, 'donation-bic-value', isLv ? 'Kopēt BIC' : 'Copy BIC')}
              </dd>
            </div>
            <div class="donation-bank-row">
              <dt>${isLv ? 'Maksājuma mērķis' : 'Payment reference'}</dt>
              <dd class="donation-copyable">
                ${copyableValue(
                  'donation-reference-value',
                  isLv ? 'Ziedojums / Atbalsts jauniešu debatēm' : 'Donation / Support youth debate',
                )}
                ${copyButton(isLv, 'donation-reference-value', isLv ? 'Kopēt mērķi' : 'Copy reference')}
              </dd>
            </div>
          </dl>

          <p class="donation-bank-foot">
            ${isLv
              ? 'Pēc pārskaitījuma, ja vēlaties, nosūtiet apliecinājumu uz'
              : 'After transferring, you may send confirmation to'}
            <a class="donation-mail" href="mailto:info@logusdebate.lv">info@logusdebate.lv</a>
          </p>
        </article>
      </div>

      <section class="donation-impact" aria-labelledby="donation-impact-heading">
        <h2 id="donation-impact-heading" class="visually-hidden">
          ${isLv ? 'Ietekmes rādītāji' : 'Impact at a glance'}
        </h2>
        <ul class="donation-impact-grid">
          <li class="donation-impact-item">
            <span class="donation-impact-value">1,247</span>
            <span class="donation-impact-label">${isLv ? 'ATBALSTĪTĀJI' : 'SUPPORTERS'}</span>
          </li>
          <li class="donation-impact-item">
            <span class="donation-impact-value">342</span>
            <span class="donation-impact-label">${isLv ? 'FINANSĒTĀS DEBATES' : 'DEBATES FUNDED'}</span>
          </li>
          <li class="donation-impact-item">
            <span class="donation-impact-value">89</span>
            <span class="donation-impact-label">${isLv ? 'PASĀKUMI' : 'EVENTS HOSTED'}</span>
          </li>
          <li class="donation-impact-item">
            <span class="donation-impact-value">16</span>
            <span class="donation-impact-label">${isLv ? 'SKOLAS' : 'SCHOOLS REACHED'}</span>
          </li>
        </ul>
      </section>
    </section>
  `
}
