import { getDocumentItems } from '../services/content-store'

function pick(isLv: boolean, pair: { en: string; lv: string }): string {
  return isLv ? pair.lv : pair.en
}

export function renderDocumentDetail(docId: string, lang: string): string | null {
  const doc = getDocumentItems().find((d) => d.id === docId)
  if (!doc) return null

  const isLv = lang === 'lv'
  const items = (isLv ? doc.content.lv : doc.content.en)
    .map((p) => `<li class="docs-paper-item">${p}</li>`)
    .join('')

  return /* html */ `
    <article class="docs-detail" id="document-detail">
      <a href="/page/documents" class="docs-detail-back">
        ← ${isLv ? 'Atpakaļ uz dokumentiem' : 'Back to documents'}
      </a>

      <div class="docs-paper">

        <h1 class="docs-detail-title">${pick(isLv, doc.title)}</h1>
        <p class="docs-paper-place">${pick(isLv, doc.place)}</p>
        <p class="docs-paper-date">${doc.issueDate}</p>

        <div class="docs-paper-section">
          <h2 class="docs-paper-section-title">
            <span class="docs-paper-section-num">I</span>
            ${pick(isLv, doc.sectionTitle)}
          </h2>
          <p class="docs-paper-lead">${pick(isLv, doc.excerpt)}</p>
          <ol class="docs-paper-list">
            ${items}
          </ol>
        </div>
      </div>
    </article>
  `
}

export function setupDocumentDetailAnimations(): void {
  /* plain document page */
}
