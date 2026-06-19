import { animate, inView } from 'motion'
import { getTeamMembers } from '../services/content-store'
import { getSitePages, pickLang } from '../services/site-pages-store'

export function renderTeamPage(lang: string): string {
  const isLv = lang === 'lv'
  const teamJoin = getSitePages().team_join

  const cards = getTeamMembers()
    .map((m) => {
      const photoSrc = m.photo || '/bg-image.jpg'
      return /* html */ `
    <article class="team-card">
      <div class="team-card-photo">
        <img
          class="team-card-img"
          src="${photoSrc}"
          alt="${pickLang(isLv, m.name)}"
          loading="lazy"
          decoding="async"
        />
        <div class="team-card-quote" aria-hidden="true">
          <span class="team-card-quote-line"></span>
          <p class="team-card-quote-text">${pickLang(isLv, teamJoin.quote)}</p>
        </div>
      </div>
      <div class="team-card-meta">
        <h3 class="team-card-name">${pickLang(isLv, m.name)}</h3>
        <p class="team-card-role">${pickLang(isLv, m.role)}</p>
      </div>
    </article>
  `
    })
    .join('')

  return /* html */ `
    <div class="team-page team-page--editorial" id="team">
      <div class="team-grid-editorial" role="list">
        ${cards}
      </div>

      <section class="team-join team-join--editorial team-join--cta-banner" aria-labelledby="team-join-heading">
        <div class="team-join-inner">
          <div class="team-join-copy">
            <h2 id="team-join-heading" class="team-join-title">
              ${pickLang(isLv, teamJoin.title)}
            </h2>
            <p class="team-join-text">
              ${pickLang(isLv, teamJoin.text)}
            </p>
          </div>
          <div class="team-join-actions">
            <a class="team-join-btn team-join-btn--apply" href="mailto:info@logusdebate.lv?subject=${encodeURIComponent(isLv ? 'Pieteikums LOGUS Debate' : 'LOGUS Debate application')}">
              ${pickLang(isLv, teamJoin.button)}
            </a>
          </div>
        </div>
      </section>
    </div>
  `
}

export function setupTeamAnimations(): void {
  inView('.team-page-hed', (el) => {
    animate(el as HTMLElement, { opacity: [0, 1], y: [16, 0] } as any, { duration: 0.5, ease: 'ease-out' } as any)
  })

  inView('.team-card', (el) => {
    animate(el as HTMLElement, { opacity: [0, 1], y: [20, 0] } as any, { duration: 0.45, ease: 'ease-out' } as any)
  })

  inView('.team-join--editorial', (el) => {
    animate(el as HTMLElement, { opacity: [0, 1], y: [16, 0] } as any, { duration: 0.45, ease: 'ease-out' } as any)
  })
}
