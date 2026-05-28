import { projectsData } from '../data/projects-data'
import { inView, animate } from 'motion'

function pick(isLv: boolean, pair: { en: string; lv: string }): string {
  return isLv ? pair.lv : pair.en
}

export function renderProjectsPage(lang: string): string {
  const isLv = lang === 'lv'

  const cards = projectsData
    .map(
      (project) => /* html */ `
      <article class="project-card">
        <a class="project-card-media" href="#project/${project.id}">
          <img
            class="project-card-image"
            src="${project.image}"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </a>
        <div class="project-card-body">
          <h2 class="project-card-title">
            <a href="#project/${project.id}">${pick(isLv, project.title)}</a>
          </h2>
          <p class="project-card-excerpt">${pick(isLv, project.excerpt)}</p>
        </div>
      </article>
    `,
    )
    .join('')

  return /* html */ `
    <div class="projects-page" id="projects-page">
      <div class="projects-grid" role="list">
        ${cards}
      </div>
    </div>
  `
}

export function setupProjectsAnimations(): void {
  inView('.project-card', (el) => {
    animate(el as HTMLElement, { opacity: [0, 1], y: [16, 0] } as any, { duration: 0.45, ease: 'ease-out' } as any)
  })
}
