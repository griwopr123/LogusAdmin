import { getSitePages, pickLang } from '../services/site-pages-store'

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
  const donation = getSitePages().donation

  const impactItems = donation.impact
    .map(
      (item) => /* html */ `
      <li class="donation-impact-item">
        <span class="donation-impact-value">${item.value}</span>
        <span class="donation-impact-label">${pickLang(isLv, item.label)}</span>
      </li>
    `,
    )
    .join('')

  return /* html */ `
    <section class="donation-page donation-page--dark" id="donation">
      <header class="donation-hero" aria-labelledby="donation-heading">
        <div class="donation-hero-media" role="presentation"></div>
        <div class="donation-hero-scrim" aria-hidden="true"></div>
        <div class="donation-hero-inner">
          <p class="donation-kicker">${pickLang(isLv, donation.kicker)}</p>
          <h1 id="donation-heading" class="donation-heading">
            ${pickLang(isLv, donation.heading)}
          </h1>
          <p class="donation-subtitle">
            ${pickLang(isLv, donation.subtitle)}
          </p>
        </div>
      </header>

      <div class="donation-page-body">
        <p class="donation-note">
          ${pickLang(isLv, donation.note)}
        </p>

        <article class="donation-bank-card">
          <h2 class="donation-bank-title">${pickLang(isLv, donation.bank_title)}</h2>

          <dl class="donation-bank-rows">
            <div class="donation-bank-row">
              <dt>${isLv ? 'Saņēmējs' : 'Recipient'}</dt>
              <dd class="donation-copyable">
                ${copyableValue('donation-recipient-value', donation.recipient)}
                ${copyButton(isLv, 'donation-recipient-value', isLv ? 'Kopēt saņēmēju' : 'Copy recipient')}
              </dd>
            </div>
            <div class="donation-bank-row donation-bank-row--iban">
              <dt>IBAN</dt>
              <dd class="donation-copyable">
                ${copyableValue('donation-iban-value', donation.iban, 'donation-mono')}
                ${copyButton(isLv, 'donation-iban-value', isLv ? 'Kopēt IBAN' : 'Copy IBAN', true)}
              </dd>
            </div>
            <div class="donation-bank-row">
              <dt>${isLv ? 'Banka' : 'Bank'}</dt>
              <dd class="donation-copyable">
                ${copyableValue('donation-bank-value', pickLang(isLv, donation.bank))}
                ${copyButton(isLv, 'donation-bank-value', isLv ? 'Kopēt banku' : 'Copy bank')}
              </dd>
            </div>
            <div class="donation-bank-row">
              <dt>BIC / SWIFT</dt>
              <dd class="donation-copyable">
                ${copyableValue('donation-bic-value', donation.bic, 'donation-mono')}
                ${copyButton(isLv, 'donation-bic-value', isLv ? 'Kopēt BIC' : 'Copy BIC')}
              </dd>
            </div>
            <div class="donation-bank-row">
              <dt>${isLv ? 'Maksājuma mērķis' : 'Payment reference'}</dt>
              <dd class="donation-copyable">
                ${copyableValue('donation-reference-value', pickLang(isLv, donation.reference))}
                ${copyButton(isLv, 'donation-reference-value', isLv ? 'Kopēt mērķi' : 'Copy reference')}
              </dd>
            </div>
          </dl>

          <p class="donation-bank-foot">
            ${isLv
              ? 'Pēc pārskaitījuma, ja vēlaties, nosūtiet apliecinājumu uz'
              : 'After transferring, you may send confirmation to'}
            <a class="donation-mail" href="mailto:${donation.confirm_email}">${donation.confirm_email}</a>
          </p>
        </article>
      </div>

      <section class="donation-impact" aria-labelledby="donation-impact-heading">
        <h2 id="donation-impact-heading" class="visually-hidden">
          ${isLv ? 'Ietekmes rādītāji' : 'Impact at a glance'}
        </h2>
        <ul class="donation-impact-grid">
          ${impactItems}
        </ul>
      </section>
    </section>
  `
}
