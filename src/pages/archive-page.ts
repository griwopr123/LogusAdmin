import { archiveTabs } from '../data/archive-data'
import type { ArchivePhoto } from '../data/archive-data'
import { getArchivePhotos } from '../services/content-store'
import { animate, inView } from 'motion'

function pick(isLv: boolean, pair: { en: string; lv: string }): string {
  return isLv ? pair.lv : pair.en
}

function renderParagraphs(paragraphs: string[]): string {
  return paragraphs.map((p) => `<p>${p}</p>`).join('')
}

function formatArchiveDate(dateIso: string, isLv: boolean): string {
  const stamp = new Date(`${dateIso}T12:00:00`)
  if (Number.isNaN(stamp.getTime())) return dateIso

  return stamp.toLocaleDateString(isLv ? 'lv-LV' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function collectArchiveYears(photos: ArchivePhoto[]): string[] {
  const years = new Set<string>()
  photos.forEach((photo) => {
    const year = photo.photoDate.slice(0, 4)
    if (/^\d{4}$/.test(year)) years.add(year)
  })
  return [...years].sort((a, b) => Number(b) - Number(a))
}

function collectArchiveMonths(photos: ArchivePhoto[], year: string): string[] {
  const months = new Set<string>()
  photos.forEach((photo) => {
    const photoYear = photo.photoDate.slice(0, 4)
    const month = photo.photoDate.slice(5, 7)
    if (!/^\d{2}$/.test(month)) return
    if (year !== 'all' && photoYear !== year) return
    months.add(month)
  })
  return [...months].sort()
}

function formatArchiveMonth(month: string, isLv: boolean): string {
  const stamp = new Date(2020, Math.max(0, parseInt(month, 10) - 1), 1)
  return stamp.toLocaleDateString(isLv ? 'lv-LV' : 'en-GB', { month: 'long' })
}

function renderArchiveFilters(photos: ArchivePhoto[], isLv: boolean): string {
  if (photos.length < 2) return ''

  const years = collectArchiveYears(photos)
  const allLabel = isLv ? 'Visi' : 'All'

  const yearButtons = [
    `<button type="button" class="archive-filter-btn is-active" data-archive-year="all">${allLabel}</button>`,
    ...years.map(
      (year) => /* html */ `
        <button type="button" class="archive-filter-btn" data-archive-year="${year}">${year}</button>
      `,
    ),
  ].join('')

  return /* html */ `
    <div class="archive-gallery-toolbar" data-archive-toolbar>
      <div class="archive-gallery-filters" data-archive-year-filters role="group" aria-label="${isLv ? 'Filtrēt pēc gada' : 'Filter by year'}">
        <span class="archive-filter-label">${isLv ? 'Gads' : 'Year'}</span>
        ${yearButtons}
      </div>
      <div class="archive-gallery-filters archive-gallery-filters--months hidden" data-archive-month-filters role="group" aria-label="${isLv ? 'Filtrēt pēc mēneša' : 'Filter by month'}"></div>
    </div>
  `
}

function renderMilestonePanel(tabId: string, sectionId: string, isLv: boolean): string {
  const tab = archiveTabs.find((t) => t.id === tabId) ?? archiveTabs[0]
  const section = tab.sections.find((s) => s.id === sectionId) ?? tab.sections[0]

  return /* html */ `
    <div class="archive-milestones-panel" data-tab-panel="${tab.id}">
      <h2 class="archive-milestones-title">
        ${pick(isLv, tab.label)}
      </h2>
      <div class="archive-milestones-layout">
        <nav class="archive-sidebar" aria-label="${isLv ? 'Sadaļas' : 'Sections'}">
          ${tab.sections
            .map((item) => {
              const active = item.id === sectionId ? ' is-active' : ''
              return /* html */ `
              <button
                type="button"
                class="archive-sidebar-link${active}"
                data-archive-section="${item.id}"
                data-archive-tab="${tab.id}"
              >${pick(isLv, item.title)}</button>
            `
            })
            .join('')}
        </nav>
        <div class="archive-content" data-archive-content>
          ${renderParagraphs(isLv ? section.paragraphs.lv : section.paragraphs.en)}
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
        >${pick(isLv, tab.label)}</button>
      `
    })
    .join('')

  const tabPanels = archiveTabs
    .map((tab, index) => {
      const hidden = index === 0 ? '' : ' hidden'
      const intro = pick(isLv, tab.intro)
      const firstSection = tab.sections[0]

      if (!firstSection) {
        return /* html */ `
            <div class="archive-milestones-panel archive-milestones-panel--simple" data-tab-panel="${tab.id}">
              <h2 class="archive-milestones-title">${pick(isLv, tab.label)}</h2>
              <div class="archive-content archive-content--standalone">
                <p class="archive-tab-intro">${intro}</p>
              </div>
            </div>
          `
      }

      return /* html */ `
        <div class="archive-tab-panel${hidden}" data-archive-tab-panel="${tab.id}">
          <p class="archive-tab-lead">${intro}</p>
          ${renderMilestonePanel(tab.id, firstSection.id, isLv)}
        </div>
      `
    })
    .join('')

  const photoItems = [...getArchivePhotos()].sort((a, b) => b.photoDate.localeCompare(a.photoDate))
  const filters = renderArchiveFilters(photoItems, isLv)

  const photos = photoItems.length
    ? photoItems
        .map((photo) => {
          const year = photo.photoDate.slice(0, 4)
          const month = photo.photoDate.slice(5, 7)
          const dateLabel = formatArchiveDate(photo.photoDate, isLv)

          return /* html */ `
      <figure class="archive-photo" data-archive-year="${year}" data-archive-month="${month}" data-archive-date="${photo.photoDate}">
        <img src="${photo.src}" alt="${dateLabel}" loading="lazy" decoding="async">
        <figcaption class="archive-photo-date">
          <time datetime="${photo.photoDate}">${dateLabel}</time>
        </figcaption>
      </figure>
    `
        })
        .join('')
    : /* html */ `
      <p class="archive-gallery-empty">
        ${isLv ? 'Fotogrāfijas drīzumā tiks pievienotas.' : 'Photographs will be added soon.'}
      </p>
    `

  return /* html */ `
    <article class="archive-page" id="archive-page" data-lang="${isLv ? 'lv' : 'en'}">
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
              ? 'Ieskats turnīros, treniņos un kopienas pasākumos — filtrējiet pēc gada un mēneša.'
              : 'A glimpse of tournaments, training, and community events — filter by year and month.'}
          </p>
          ${filters}
          <div class="archive-photo-grid" data-archive-photo-grid>
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

function setupArchivePhotoFilters(root: HTMLElement, isLv: boolean): void {
  const toolbar = root.querySelector('[data-archive-toolbar]')
  const yearFilters = root.querySelector('[data-archive-year-filters]')
  const monthFilters = root.querySelector('[data-archive-month-filters]')
  const grid = root.querySelector('[data-archive-photo-grid]')
  if (!toolbar || !yearFilters || !monthFilters || !grid) return

  const photos = Array.from(grid.querySelectorAll<HTMLElement>('.archive-photo'))
  if (photos.length < 2) return

  const photoItems: ArchivePhoto[] = photos.map((el) => ({
    id: el.dataset.archiveDate ?? '',
    src: '',
    photoDate: el.dataset.archiveDate ?? '',
  }))

  let activeYear = 'all'
  let activeMonth = 'all'
  const allLabel = isLv ? 'Visi' : 'All'
  const monthAllLabel = isLv ? 'Visi mēneši' : 'All months'

  const renderMonthButtons = () => {
    const months = collectArchiveMonths(photoItems, activeYear)
    monthFilters.classList.toggle('hidden', months.length < 2)

    if (months.length < 2) {
      monthFilters.innerHTML = ''
      activeMonth = 'all'
      return
    }

    if (activeMonth !== 'all' && !months.includes(activeMonth)) {
      activeMonth = 'all'
    }

    const buttons = [
      `<button type="button" class="archive-filter-btn${activeMonth === 'all' ? ' is-active' : ''}" data-archive-month="all">${monthAllLabel}</button>`,
      ...months.map(
        (month) => /* html */ `
          <button
            type="button"
            class="archive-filter-btn${activeMonth === month ? ' is-active' : ''}"
            data-archive-month="${month}"
          >${formatArchiveMonth(month, isLv)}</button>
        `,
      ),
    ].join('')

    monthFilters.innerHTML = `
      <span class="archive-filter-label">${isLv ? 'Mēnesis' : 'Month'}</span>
      ${buttons}
    `
  }

  const applyFilter = () => {
    let visibleCount = 0

    photos.forEach((photo) => {
      const photoYear = photo.dataset.archiveYear ?? ''
      const photoMonth = photo.dataset.archiveMonth ?? ''
      const yearMatch = activeYear === 'all' || photoYear === activeYear
      const monthMatch = activeMonth === 'all' || photoMonth === activeMonth
      const show = yearMatch && monthMatch
      photo.classList.toggle('is-hidden', !show)
      if (show) visibleCount += 1
    })

    yearFilters.querySelectorAll<HTMLButtonElement>('[data-archive-year]').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.archiveYear === activeYear)
    })

    monthFilters.querySelectorAll<HTMLButtonElement>('[data-archive-month]').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.archiveMonth === activeMonth)
    })

    let empty = grid.querySelector<HTMLElement>('.archive-filter-empty')
    if (visibleCount === 0) {
      if (!empty) {
        empty = document.createElement('p')
        empty.className = 'archive-filter-empty'
        empty.textContent = isLv
          ? 'Šim periodam fotogrāfiju nav.'
          : 'No photos for this period.'
        grid.appendChild(empty)
      }
    } else {
      empty?.remove()
    }
  }

  toolbar.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    const yearBtn = target.closest<HTMLButtonElement>('[data-archive-year]')
    const monthBtn = target.closest<HTMLButtonElement>('[data-archive-month]')

    if (yearBtn?.dataset.archiveYear) {
      activeYear = yearBtn.dataset.archiveYear
      activeMonth = 'all'
      renderMonthButtons()
      applyFilter()
      return
    }

    if (monthBtn?.dataset.archiveMonth) {
      activeMonth = monthBtn.dataset.archiveMonth
      applyFilter()
    }
  })

  renderMonthButtons()
  applyFilter()
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
    if (content) content.innerHTML = getArchiveContentHtml(tabId, sectionId, isLv)
  }

  root.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
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

  setupArchivePhotoFilters(root, isLv)

  inView('.archive-photo:not(.is-hidden)', (el) => {
    animate(el as HTMLElement, { opacity: [0, 1], y: [14, 0] } as any, { duration: 0.4, ease: 'ease-out' } as any)
  })
}
