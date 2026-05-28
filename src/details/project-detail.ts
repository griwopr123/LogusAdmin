import { projectsData } from '../data/projects-data'

function pick(isLv: boolean, pair: { en: string; lv: string }): string {
  return isLv ? pair.lv : pair.en
}

export function renderProjectDetail(projectId: string, lang: string): string | null {
  const project = projectsData.find((p) => p.id === projectId)
  if (!project) return null

  const isLv = lang === 'lv'
  const title = pick(isLv, project.title)
  const heroIntro = pick(isLv, project.heroIntro)
  const aboutLabel = isLv ? 'Par projektu' : 'About the project'
  const fundingLabel = isLv ? 'Finansējums' : 'Funding'

  const paragraphs = isLv ? project.body.lv : project.body.en
  const bodyHtml = paragraphs.map((p) => `<p>${p}</p>`).join('')

  const gallery = project.gallery.length ? project.gallery : [project.image]
  const slides = gallery
    .map(
      (src, i) =>
        `<img class="project-carousel-slide${i === 0 ? ' is-active' : ''}" src="${src}" alt="" loading="lazy" decoding="async" />`,
    )
    .join('')

  const fundingBlock = project.funded
    ? /* html */ `
      <div class="project-hero-funding">
        <p class="project-hero-funding-label">${fundingLabel}</p>
        <div class="project-hero-funding-logos">
          <img src="/logo.png" alt="logo" style="width: 50px; height: auto;" />
        </div>
      </div>
    `
    : ''

  return /* html */ `
    <article class="project-detail" id="project-detail">

      <header
        class="project-hero"
        style="background-image: url('${project.heroImage}');"
        role="img"
        aria-label="${title}"
      >
        <div class="project-hero-overlay" aria-hidden="true"></div>
        <div class="project-hero-inner">
          <h1 class="project-hero-title">${title}</h1>
          <p class="project-hero-intro">${heroIntro}</p>
          ${fundingBlock}
        </div>
      </header>

      <div class="project-detail-main">
        <section class="project-about">
          <h2 class="project-about-title">${aboutLabel}</h2>
          <div class="project-about-body">${bodyHtml}</div>
        </section>

        <section class="project-carousel" aria-label="${isLv ? 'Projekta galerija' : 'Project gallery'}">
          <button type="button" class="project-carousel-btn project-carousel-prev" aria-label="${isLv ? 'Iepriekšējais' : 'Previous'}">‹</button>
          <div class="project-carousel-frame">
            ${slides}
          </div>
          <button type="button" class="project-carousel-btn project-carousel-next" aria-label="${isLv ? 'Nākamais' : 'Next'}">›</button>
        </section>
      </div>
    </article>
  `
}

export function setupProjectDetailAnimations(): void {}

export function setupProjectCarousel(): void {
  const frame = document.querySelector('.project-carousel-frame')
  if (!frame) return

  const slides = Array.from(frame.querySelectorAll<HTMLImageElement>('.project-carousel-slide'))
  if (slides.length <= 1) return

  let index = 0

  const show = (next: number) => {
    slides[index]?.classList.remove('is-active')
    index = (next + slides.length) % slides.length
    slides[index]?.classList.add('is-active')
  }

  document.querySelector('.project-carousel-prev')?.addEventListener('click', () => show(index - 1))
  document.querySelector('.project-carousel-next')?.addEventListener('click', () => show(index + 1))
}
