import { documentsData, documentCategories, type DocumentCategory } from '../data/documents-data'
import { inView, animate } from 'motion'

function pick(isLv: boolean, pair: { en: string; lv: string }): string {
  return isLv ? pair.lv : pair.en
}

export function renderDocumentsPage(lang: string): string {
  const isLv = lang === 'lv'

  const filters = documentCategories
    .map(
      (cat, i) => /* html */ `
      <button
        type="button"
        class="docs-filter${i === 0 ? ' is-active' : ''}"
        data-docs-filter="${cat.id}"
        aria-pressed="${i === 0 ? 'true' : 'false'}"
      >
        ${pick(isLv, cat.label)}
      </button>
    `,
    )
    .join('')

  const cards = documentsData
    .map(
      (doc) => /* html */ `
      <article class="docs-card" data-docs-category="${doc.category}" data-docs-id="${doc.id}">
        <h2 class="docs-card-title">${pick(isLv, doc.title)}</h2>
        <p class="docs-card-excerpt">${pick(isLv, doc.excerpt)}</p>
        <a href="#document/${doc.id}" class="docs-card-btn">
          ${isLv ? 'Lasīt dokumentu' : 'Read document'}
        </a>
      </article>
    `,
    )
    .join('')

  return /* html */ `
    <div class="docs-page" id="documents-page">
      <div class="docs-list" id="docsList">
        ${cards}
      </div>

      <p class="docs-empty" id="docsEmpty" hidden>
        ${isLv ? 'Šajā kategorijā dokumentu nav.' : 'No documents in this category.'}
      </p>
    </div>
  `
}

export function setupDocumentsFilter(): void {
  const list = document.getElementById('docsList')
  const empty = document.getElementById('docsEmpty')
  const filters = document.querySelectorAll<HTMLButtonElement>('.docs-filter')
  const cards = document.querySelectorAll<HTMLElement>('.docs-card')

  if (!list || filters.length === 0) return

  const applyFilter = (category: DocumentCategory) => {
    let visible = 0
    cards.forEach((card) => {
      const match = card.dataset.docsCategory === category
      card.hidden = !match
      if (match) visible += 1
    })
    if (empty) empty.hidden = visible > 0
  }

  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.docsFilter as DocumentCategory
      filters.forEach((b) => {
        const active = b === btn
        b.classList.toggle('is-active', active)
        b.setAttribute('aria-pressed', active ? 'true' : 'false')
      })
      applyFilter(category)
    })
  })

  applyFilter('statutes')
}

export function setupDocumentsAnimations(): void {
  inView('.docs-card', (el) => {
    animate(el as HTMLElement, { opacity: [0, 1], y: [14, 0] } as any, { duration: 0.4, ease: 'ease-out' } as any)
  })
}
