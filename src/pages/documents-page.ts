import { getDocumentItems } from '../services/content-store'
import { inView, animate } from 'motion'

function pick(isLv: boolean, pair: { en: string; lv: string }): string {
  return isLv ? pair.lv : pair.en
}

export function renderDocumentsPage(lang: string): string {
  const isLv = lang === 'lv'

  const cards = getDocumentItems()
    .map(
      (doc) => {
        const hasUrl = Boolean(doc.documentUrl)
        return /* html */ `
      <article class="docs-card" data-docs-id="${doc.id}">
        <h2 class="docs-card-title">${pick(isLv, doc.title)}</h2>
        <p class="docs-card-excerpt">${pick(isLv, doc.excerpt)}</p>
        ${hasUrl
          ? `<a href="${doc.documentUrl}" class="docs-card-btn" target="_blank" rel="noopener noreferrer">
              ${isLv ? 'Atvērt dokumentu' : 'Open document'}
            </a>`
          : `<span class="docs-card-btn" aria-disabled="true">
              ${isLv ? 'Saite nav pieejama' : 'Link unavailable'}
            </span>`}
      </article>
    `
      },
    )
    .join('')

  return /* html */ `
    <section class="docs-page" id="documents-page">
      <h1 class="docs-page-title">${isLv ? 'Dokumenti' : 'Documents'}</h1>
      <p class="docs-page-subtitle">
        ${isLv
          ? 'Biedrības statūti, ētikas kodekss un gada pārskati.'
          : 'Association bylaws, ethics code, and annual reports.'}
      </p>

      <div class="docs-list" id="docsList" role="list">
        ${cards}
      </div>
    </section>
  `
}

export function setupDocumentsAnimations(): void {
  inView('.docs-card', (el) => {
    animate(el as HTMLElement, { opacity: [0, 1], y: [14, 0] } as any, { duration: 0.4, ease: 'ease-out' } as any)
  })
}
