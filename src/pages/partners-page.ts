import { getPartnerItems } from '../services/content-store'
import { animate, inView } from 'motion'

function pick(isLv: boolean, pair: { en: string; lv: string }): string {
  return isLv ? pair.lv : pair.en
}

export function renderPartnersPage(lang: string): string {
  const isLv = lang === 'lv'

  const items = getPartnerItems()
    .map(
      (partner) => /* html */ `
      <a
        class="partners-row"
        href="${partner.url}"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="partners-row-copy">
          <p class="partners-row-kicker">${pick(isLv, partner.category)}</p>
          <h2 class="partners-row-title">${pick(isLv, partner.name)}</h2>
          <p class="partners-row-text">${pick(isLv, partner.description)}</p>
        </div>
        <span class="partners-row-arrow" aria-hidden="true">→</span>
      </a>
    `,
    )
    .join('')

  return /* html */ `
    <section class="partners-page" id="partners-page">
      <div class="partners-list">
        ${items}
      </div>
    </section>
  `
}

export function setupPartnersAnimations(): void {
  inView('.partners-row', (el) => {
    animate(el as HTMLElement, { opacity: [0, 1], y: [12, 0] } as any, { duration: 0.38, ease: 'ease-out' } as any)
  })
}
