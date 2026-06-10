import { getProjectItems } from '../services/content-store'

function pick(isLv: boolean, pair: { en: string; lv: string }): string {
  return isLv ? pair.lv : pair.en
}

export function renderProjectDetail(projectId: string, lang: string): string | null {
  const project = getProjectItems().find((p) => p.id === projectId)
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
      (src, i) => /* html */ `
        <div class="project-carousel-slide${i === 0 ? ' is-active' : ''}" data-index="${i}">
          <img src="${src}" alt="${title} — ${i + 1}" loading="lazy" decoding="async" />
        </div>
      `,
    )
    .join('')

  const dots = gallery
    .map(
      (_, i) => /* html */ `
        <button
          type="button"
          class="project-carousel-dot${i === 0 ? ' is-active' : ''}"
          data-index="${i}"
          aria-label="${isLv ? `Bilde ${i + 1}` : `Slide ${i + 1}`}"
        ></button>
      `,
    )
    .join('')

  const sponsorLogos = project.sponsorLogos ?? []
  const fundingBlock = sponsorLogos.length > 0
    ? /* html */ `
      <div class="project-hero-funding">
        <p class="project-hero-funding-label">${fundingLabel}</p>
        <div class="project-hero-funding-logos">
          ${sponsorLogos
            .map(
              (src, i) => /* html */ `
                <img class="project-hero-sponsor-logo" src="${src}" alt="${isLv ? 'Projekta sponsors' : 'Project sponsor'} ${i + 1}" loading="lazy" decoding="async" />
              `,
            )
            .join('')}
        </div>
      </div>
    `
    : ''

  const carouselControls = gallery.length > 1
    ? /* html */ `
        <button type="button" class="project-carousel-btn project-carousel-prev" aria-label="${isLv ? 'Iepriekšējais' : 'Previous'}">‹</button>
        <button type="button" class="project-carousel-btn project-carousel-next" aria-label="${isLv ? 'Nākamais' : 'Next'}">›</button>
        <div class="project-carousel-dots" role="tablist" aria-label="${isLv ? 'Galerijas navigācija' : 'Gallery navigation'}">
          ${dots}
        </div>
        <p class="project-carousel-counter" aria-live="polite">
          <span class="project-carousel-counter-current">1</span> / <span class="project-carousel-counter-total">${gallery.length}</span>
        </p>
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

        <section
          class="project-carousel${gallery.length > 1 ? ' project-carousel--slider' : ''}"
          aria-label="${isLv ? 'Projekta galerija' : 'Project gallery'}"
          ${gallery.length > 1 ? 'tabindex="0"' : ''}
        >
          <div class="project-carousel-viewport">
            <div class="project-carousel-track" style="--slide-count: ${gallery.length};">
              ${slides}
            </div>
          </div>
          ${carouselControls}
        </section>
      </div>
    </article>
  `
}

export function setupProjectDetailAnimations(): void {}

export function setupProjectCarousel(): void {
  const carousel = document.querySelector('.project-carousel--slider')
  if (!carousel) return

  const track = carousel.querySelector<HTMLElement>('.project-carousel-track')
  const slides = Array.from(carousel.querySelectorAll<HTMLElement>('.project-carousel-slide'))
  const dots = Array.from(carousel.querySelectorAll<HTMLButtonElement>('.project-carousel-dot'))
  const counterCurrent = carousel.querySelector<HTMLElement>('.project-carousel-counter-current')
  const prevBtn = carousel.querySelector<HTMLButtonElement>('.project-carousel-prev')
  const nextBtn = carousel.querySelector<HTMLButtonElement>('.project-carousel-next')

  if (!track || slides.length <= 1) return

  let index = 0
  let touchStartX = 0
  let touchDeltaX = 0

  const update = (next: number) => {
    index = (next + slides.length) % slides.length
    track.style.transform = `translateX(-${index * 100}%)`

    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === index)
    })

    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index)
      dot.setAttribute('aria-selected', i === index ? 'true' : 'false')
    })

    if (counterCurrent) {
      counterCurrent.textContent = String(index + 1)
    }
  }

  prevBtn?.addEventListener('click', () => update(index - 1))
  nextBtn?.addEventListener('click', () => update(index + 1))

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const target = Number(dot.dataset.index)
      if (!Number.isNaN(target)) update(target)
    })
  })

  const viewport = carousel.querySelector<HTMLElement>('.project-carousel-viewport')
  viewport?.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0]?.clientX ?? 0
      touchDeltaX = 0
    },
    { passive: true },
  )

  viewport?.addEventListener(
    'touchmove',
    (e) => {
      const currentX = e.changedTouches[0]?.clientX ?? 0
      touchDeltaX = currentX - touchStartX
    },
    { passive: true },
  )

  viewport?.addEventListener(
    'touchend',
    () => {
      if (Math.abs(touchDeltaX) < 40) return
      update(touchDeltaX < 0 ? index + 1 : index - 1)
    },
    { passive: true },
  )

  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') update(index - 1)
    if (e.key === 'ArrowRight') update(index + 1)
  })

  update(0)
}
