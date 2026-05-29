import { archivePhotos, archiveTabs } from '../data/archive-data'
import { animate, inView } from 'motion'

function pick(isLv: boolean, pair: { en: string; lv: string }): string {
  return isLv ? pair.lv : pair.en
}

function renderParagraphs(paragraphs: string[]): string {
  return paragraphs.map((p) => `<p>${p}</p>`).join('')
}

function renderMilestonePanel(tabId: string, sectionId: string, isLv: boolean): string {
  const tab = archiveTabs.find((t) => t.id === tabId) ?? archiveTabs[0]
  const section = tab.sections.find((s) => s.id === sectionId) ?? tab.sections[0]
  const paragraphs = isLv ? section.paragraphs.lv : section.paragraphs.en

  return /* html */ `
    <div class="archive-milestones-panel" data-tab-panel="${tab.id}">
      <h2 class="archive-milestones-title">
        ${isLv ? 'Stūrakmeņi vēstures gaitā' : 'Milestones in our history'}
      </h2>
      <div class="archive-milestones-layout">
        <nav class="archive-sidebar" aria-label="${isLv ? 'Sadaļas' : 'Sections'}">
          ${tab.sections
            .map((item) => {
              const active = item.id === section.id ? ' is-active' : ''
              return /* html */ `
              <button
                type="button"
                class="archive-sidebar-link${active}"
                data-archive-section="${item.id}"
                data-archive-tab="${tab.id}"
              >
                ${pick(isLv, item.title)}
              </button>
            `
            })
            .join('')}
        </nav>
        <div class="archive-content" data-archive-content>
          ${renderParagraphs(paragraphs)}
        </div>
      </div>
    </div>
  `
}

export function renderArchivePage(lang: string): string {
  const isLv = lang === 'lv'
  const tabButtons = archiveTabs
    .map((tab, index) => {
      const active = index === 0 ? ' is-active' : ''
      return /* html */ `
        <button
          type="button"
          class="archive-hero-tab${active}"
          data-archive-tab="${tab.id}"
        >
          ${pick(isLv, tab.label)}
        </button>
      `
    })
    .join('')

  const tabPanels = archiveTabs
    .map((tab, index) => {
      const hidden = index === 0 ? '' : ' hidden'
      const section = tab.sections[0]
      const intro = pick(isLv, tab.intro)
      const milestones =
        tab.id === 'history'
          ? renderMilestonePanel(tab.id, section.id, isLv)
          : /* html */ `
            <div class="archive-milestones-panel archive-milestones-panel--simple" data-tab-panel="${tab.id}">
              <h2 class="archive-milestones-title">${pick(isLv, tab.label)}</h2>
              <div class="archive-content archive-content--standalone">
                <p class="archive-tab-intro">${intro}</p>
                ${renderParagraphs(isLv ? section.paragraphs.lv : section.paragraphs.en)}
              </div>
            </div>
          `

      return /* html */ `
        <div class="archive-tab-panel${hidden}" data-archive-tab-panel="${tab.id}">
          <p class="archive-tab-lead">${intro}</p>
          ${milestones}
        </div>
      `
    })
    .join('')

  const photos = archivePhotos
    .map(
      (photo) => /* html */ `
      <figure class="archive-photo">
        <img src="${photo.src}" alt="${pick(isLv, photo.caption)}" loading="lazy" decoding="async">
        <figcaption>${pick(isLv, photo.caption)}</figcaption>
      </figure>
    `,
    )
    .join('')

  return /* html */ `
    <article class="archive-page" id="archive-page">
      <section class="archive-hero" aria-labelledby="archive-hero-title">
        <div class="archive-hero-media" role="presentation"></div>
        <div class="archive-hero-scrim" aria-hidden="true"></div>
        <div class="archive-hero-inner">
          <h1 id="archive-hero-title" class="archive-hero-title">
            ${isLv ? 'Arhīvs' : 'Archive'}
          </h1>
          <p class="archive-hero-intro">
            ${isLv
              ? 'LOGUS Debate vēsture, gadagrāmatas un apkārtraksti — stūrakmeņi, stāsti un fotogrāfijas no kopienas gaitas.'
              : 'LOGUS Debate history, yearbooks, and newsletters — milestones, stories, and photographs from our journey.'}
          </p>
          <div class="archive-hero-tabs" role="tablist">
            ${tabButtons}
          </div>
        </div>
      </section>

      <section class="archive-body">
        <div class="archive-body-inner">
          ${tabPanels}
        </div>
      </section>

      <section class="archive-gallery" aria-labelledby="archive-gallery-heading">
        <div class="archive-gallery-inner">
          <h2 id="archive-gallery-heading" class="archive-gallery-title">
            ${isLv ? 'Arhīva fotogrāfijas' : 'Archive photographs'}
          </h2>
          <p class="archive-gallery-lead">
            ${isLv
              ? 'Ieskats turnīros, treniņos un kopienas pasākumos — arhīvs tiek papildināts katru sezonu.'
              : 'A glimpse of tournaments, training, and community events — the archive grows each season.'}
          </p>
          <div class="archive-photo-grid">
            ${photos}
          </div>
        </div>
      </section>
    </article>
  `
}

function getArchiveContentHtml(tabId: string, sectionId: string, isLv: boolean): string {
  const tab = archiveTabs.find((t) => t.id === tabId)
  if (!tab) return ''
  const section = tab.sections.find((s) => s.id === sectionId)
  if (!section) return ''
  const paragraphs = isLv ? section.paragraphs.lv : section.paragraphs.en
  return renderParagraphs(paragraphs)
}

export function setupArchivePage(lang: string): void {
  const isLv = lang === 'lv'
  const root = document.getElementById('archive-page')
  if (!root) return

  const setActiveTab = (tabId: string) => {
    root.querySelectorAll('[data-archive-tab]').forEach((el) => {
      if (el instanceof HTMLButtonElement && el.classList.contains('archive-hero-tab')) {
        el.classList.toggle('is-active', el.dataset.archiveTab === tabId)
      }
    })
    root.querySelectorAll('[data-archive-tab-panel]').forEach((panel) => {
      panel.classList.toggle('hidden', panel.getAttribute('data-archive-tab-panel') !== tabId)
    })
  }

  const setActiveSection = (tabId: string, sectionId: string) => {
    const panel = root.querySelector(`[data-archive-tab-panel="${tabId}"]`)
    if (!panel) return

    panel.querySelectorAll('.archive-sidebar-link').forEach((link) => {
      link.classList.toggle(
        'is-active',
        link instanceof HTMLButtonElement && link.dataset.archiveSection === sectionId,
      )
    })

    const content = panel.querySelector('[data-archive-content]')
    if (content) {
      content.innerHTML = getArchiveContentHtml(tabId, sectionId, isLv)
    }
  }

  root.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    const tabBtn = target.closest('[data-archive-tab]') as HTMLButtonElement | null
    const sectionBtn = target.closest('[data-archive-section]') as HTMLButtonElement | null

    if (tabBtn?.classList.contains('archive-hero-tab')) {
      const tabId = tabBtn.dataset.archiveTab
      if (tabId) setActiveTab(tabId)
      return
    }

    if (sectionBtn) {
      const tabId = sectionBtn.dataset.archiveTab
      const sectionId = sectionBtn.dataset.archiveSection
      if (tabId && sectionId) setActiveSection(tabId, sectionId)
    }
  })

  inView('.archive-photo', (el) => {
    animate(el as HTMLElement, { opacity: [0, 1], y: [14, 0] } as any, { duration: 0.4, ease: 'ease-out' } as any)
  })
}
