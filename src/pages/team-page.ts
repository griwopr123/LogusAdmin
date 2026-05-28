import { animate, inView } from 'motion'

export interface TeamMember {
  name: { en: string; lv: string }
  role: { en: string; lv: string }
}

const teamQuote = {
  en: 'DISCOMFORT IS THE PRECONDITION OF GROWTH',
  lv: 'NEĒRTĪBA IR IZAUGSMES PRIEKŠNOSACĪJUMS',
}

export const teamMembers: TeamMember[] = [
  {
    name: { en: 'Anete Kalniņa', lv: 'Anete Kalniņa' },
    role: { en: 'Programme Director', lv: 'Programmas vadītāja' },
  },
  {
    name: { en: 'Mārtiņš Zariņš', lv: 'Mārtiņš Zariņš' },
    role: { en: 'Head Coach — BP', lv: 'Galvenais treneris — BP' },
  },
  {
    name: { en: 'Elīna Liepiņa', lv: 'Elīna Liepiņa' },
    role: { en: 'Senior Coach', lv: 'Vecākā trenere' },
  },
  {
    name: { en: 'Roberts Bērziņš', lv: 'Roberts Bērziņš' },
    role: { en: 'Junior Circuit Lead', lv: 'Jauniešu līgas vadītājs' },
  }
]

function pick(isLv: boolean, pair: { en: string; lv: string }): string {
  return isLv ? pair.lv : pair.en
}

export function renderTeamPage(lang: string): string {
  const isLv = lang === 'lv'

  const cards = teamMembers
    .map((m) => {
      return /* html */ `
    <article class="team-card">
      <div class="team-card-photo">
        <img
          class="team-card-img"
          src="/bg-image.jpg"
          alt="${pick(isLv, m.name)}"
          loading="lazy"
          decoding="async"
        />
        <div class="team-card-quote" aria-hidden="true">
          <span class="team-card-quote-line"></span>
          <p class="team-card-quote-text">${pick(isLv, teamQuote)}</p>
        </div>
      </div>
      <div class="team-card-meta">
        <h3 class="team-card-name">${pick(isLv, m.name)}</h3>
        <p class="team-card-role">${pick(isLv, m.role)}</p>
      </div>
    </article>
  `
    })
    .join('')

  return /* html */ `
    <div class="team-page team-page--editorial" id="team">
      <!-- <header class="team-page-hed">
         <p class="team-page-hed-kicker">LOGUS Debate</p>
         <h1 class="team-page-hed-title">${isLv ? 'Komanda' : 'Team'}</h1>
       </header> -->

      <div class="team-grid-editorial" role="list">
        ${cards}
      </div>

      <section class="team-join team-join--editorial team-join--cta-banner" aria-labelledby="team-join-heading">
        <div class="team-join-inner">
          <div class="team-join-copy">
            <h2 id="team-join-heading" class="team-join-title">
              ${isLv ? 'DOMĀ, KA TE IR TAVA VIETA?' : 'THINK YOU BELONG HERE?'}
            </h2>
            <p class="team-join-text">
              ${isLv
                ? 'Mēs vienmēr meklējam prātus, kas nepieņem vieglas atbildes. Ja tev ir disciplīna, mums ir platforma.'
                : "We're always looking for minds that refuse to accept easy answers. If you have the rigor, we have the platform."}
            </p>
          </div>
          <div class="team-join-actions">
            <a class="team-join-btn team-join-btn--apply" href="mailto:info@logusdebate.lv?subject=${encodeURIComponent(isLv ? 'Pieteikums LOGUS Debate' : 'LOGUS Debate application')}">
              ${isLv ? 'PIESAKIES DALĪBAI' : 'APPLY TO JOIN'}
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
