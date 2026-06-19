import { getSitePages, pickLang } from '../services/site-pages-store'

export function renderRulesPage(lang: string): string {
  const isLv = lang === 'lv'
  const rules = getSitePages().rules

  const groups = rules.groups
    .map((group, groupIndex) => {
      const num = groupIndex + 1
      const subs = group.items
        .map(
          (item, subIndex) => /* html */ `
          <li class="rules-subitem">
            <span class="rules-num rules-num--sub">${num}.${subIndex + 1}</span>
            <p class="rules-text">${pickLang(isLv, item.text)}</p>
          </li>
        `,
        )
        .join('')

      return /* html */ `
        <li class="rules-group">
          <div class="rules-item rules-item--main">
            <span class="rules-num">${num}.</span>
            <p class="rules-text rules-text--main">${pickLang(isLv, group.text)}</p>
          </div>
          <ol class="rules-sublist">
            ${subs}
          </ol>
        </li>
      `
    })
    .join('')

  return /* html */ `
    <div class="rules-page" id="rules-page">
      <h1 class="rules-page-title">${pickLang(isLv, rules.page_title)}</h1>
      <ol class="rules-list">
        ${groups}
      </ol>
    </div>
  `
}

export function setupRulesAnimations(): void {}
