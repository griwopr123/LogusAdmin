import { rulesData } from '../data/rules-data'

function pick(isLv: boolean, pair: { en: string; lv: string }): string {
  return isLv ? pair.lv : pair.en
}

export function renderRulesPage(lang: string): string {
  const isLv = lang === 'lv'

  const groups = rulesData
    .map((group, groupIndex) => {
      const num = groupIndex + 1
      const subs = group.items
        .map(
          (item, subIndex) => /* html */ `
          <li class="rules-subitem">
            <span class="rules-num rules-num--sub">${num}.${subIndex + 1}</span>
            <p class="rules-text">${pick(isLv, item.text)}</p>
          </li>
        `,
        )
        .join('')

      return /* html */ `
        <li class="rules-group">
          <div class="rules-item rules-item--main">
            <span class="rules-num">${num}.</span>
            <p class="rules-text rules-text--main">${pick(isLv, group.text)}</p>
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
      <h1 class="rules-page-title">${isLv ? 'Debašu noteikumi' : 'Debate rules'}</h1>
      <ol class="rules-list">
        ${groups}
      </ol>
    </div>
  `
}

export function setupRulesAnimations(): void {}
