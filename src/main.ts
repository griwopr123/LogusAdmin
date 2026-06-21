import './styles/style.scss'
import './styles/events.scss'
import './styles/donation.scss'
import './styles/contacts.scss'
import './styles/news.scss'
import './styles/faq.scss'
import './styles/documents.scss'
import './styles/projects.scss'
import './styles/partners.scss'
import './styles/rules.scss'
import './styles/team.scss'
import './styles/archive.scss'
import './styles/about.scss'
import { animate, inView } from 'motion'
import { renderEventsPage, setupEventsAnimations } from './pages/events-page'
import type { EventItem } from './data/events-data'
import { getEventsItems, getSocialLinks, getSponsorItems, loadSiteContent } from './services/content-store'
import { getSitePages, loadSitePages, pickLang, resolveSiteImage } from './services/site-pages-store'
import { renderEventDetail, setupEventDetailAnimations } from './details/event-detail'
import { renderAboutPage, setupAboutAnimations } from './pages/about-page'
import { renderDonationPage, setupDonationCopy } from './pages/donation-page'
import { renderTeamPage, setupTeamAnimations } from './pages/team-page'
import { renderSecondaryPage } from './pages/secondary-pages'
import { renderNewsDetail, setupNewsDetailAnimations } from './details/news-detail'
import { setupNewsAnimations } from './pages/news-page'
import { setupFaqForm, setupFaqAccordion, setupFaqAnimations } from './pages/faq-page'
import { renderProjectDetail, setupProjectDetailAnimations, setupProjectCarousel } from './details/project-detail'
import { setupDocumentsAnimations } from './pages/documents-page'
import { setupProjectsAnimations } from './pages/projects-page'
import { setupArchivePage } from './pages/archive-page'
import { getRouteFromLocation, hrefForRoute, migrateLegacyHash, pushRoute } from './utils/routes'
import { searchSite, highlightSearchText, invalidateSearchIndex, type SearchResult } from './utils/site-search'

const translations = {
  en: {
    home: 'Home',
    events: 'Events',
    partners: 'Partners',
    contact: 'Contact',
    team: 'Team',
    about: 'About Us',
    donation: 'Donation',
    navMore: 'More',
    searchToggle: 'Search',
    searchPlaceholder: 'Search pages, events, people…',
    searchNoResults: 'No results',
    searchHint: 'Type to search · Enter for first result',
    statusOpen: 'OPEN',
    statusLive: 'LIVE',
    statusConcluded: 'CONCLUDED',
    eventsHomeTitle: 'Upcoming events',
    heroLine1: 'LATVIA\'S HOME FOR',
    heroHighlight: 'PROFESSIONAL',
    heroLine2: 'DEBATE',
    phoneWidgetLabel: 'Call us',
    clubPoint1: 'British Parliamentary and open formats — training for tournaments and life.',
    clubPoint2: 'Youth and students from Riga and beyond — inclusive community.',
    clubPoint3: 'Critical thinking, argumentation, and confident public speaking.',
    clubCta: 'Read more',

    meetUs: 'Meet Us',
    eventsList: 'Events',
    aboutTitle: 'About Us',
    whatIs: 'What is LOGUS Debate?',
    whatIsDesc: 'LOGUS Debate is the leading debate club in Latvia, dedicated to the intellectual development of youth and the promotion of critical thinking.',
    qualityDesc: 'We provide high-quality training and experience in debating that prepares participants for a challenging world.',
    mission: 'Our Mission',
    missionDesc: 'Foster the potential of young people by developing argumentation skills, confidence and strategic thinking.',
    inclusiveDesc: 'We create an inclusive community where everyone can develop and excel in the art of debate.',
    nextEvents: 'Upcoming Events',
    sponsors: 'Our Partners',
    juniorChampionship: 'Junior Debate Championship',
    championshipDesc: 'The largest debate championship in Latvia where young people from across the country compete. Format: British Parliamentary.',
    summerSchool: 'Summer Debate School',
    summerDesc: 'An intensive course for young debaters. Learn from experienced instructors and international specialists.',
    onlineDebate: 'Online Debate Series',
    onlineDesc: 'Weekly sessions perfect for improving your skills from anywhere. Open to all levels.',
    internationalCamp: 'International Debate Camp',
    campDesc: 'Compete with debaters from other countries. Expand your horizons and make international friendships.',
    teacherSeminar: 'Debate Seminar for Teachers',
    seminarDesc: 'Specially designed classes for educators who want to introduce their students to the art of debate in school.',
    autumnLeague: 'Autumn League Begins',
    autumnDesc: 'Regular debate league for young people of all ages. Compete every Friday evening with peers in your age group.',
    sponsor: 'Sponsor',
    address: 'Address: Riga, Latvia',
    email: 'Email: info@logusdebate.lv',
    phone: 'Phone: +371 12345678',
    hours: 'Visiting hours: 10:00 - 17:00',
    quickLinks: 'Quick Links',
    information: 'Information',
    registered: 'LOGUS Debate is registered as an association and fully complies with Latvian laws.',
    programs: 'We offer free and paid training programs for all interested young people.',
    copyright: '© 2026 LOGUS Debate. All rights reserved.',
    subtitle: 'Latvia\'s Most Modern Debate Club',
  },
  lv: {
    home: 'Sākums',
    events: 'Pasākumi',
    partners: 'Partneri',
    contact: 'Kontakti',
    about: 'Par Mums',
    team: 'Komanda',
    donation: 'Ziedojumi',
    navMore: 'Vairāk',
    searchToggle: 'Meklēt',
    searchPlaceholder: 'Meklēt lapas, pasākumus, personas…',
    searchNoResults: 'Nekas nav atrasts',
    searchHint: 'Rakstiet, lai meklētu · Enter — pirmais rezultāts',
    statusOpen: 'ATVĒRTS',
    statusLive: 'TIEŠRAIDĒ',
    statusConcluded: 'NOSLĒGTS',
    eventsHomeTitle: 'Gaidāmie pasākumi',
    heroLine1: 'VIETA LATVIJĀ',
    heroHighlight: 'PROFESIONĀLĀM',
    heroLine2: 'DEBATĒM',
    phoneWidgetLabel: 'Zvaniet',
    clubPoint1: 'British Parliamentary un citi formāti — sagatavošana sacensībām un dzīvei.',
    clubPoint2: 'Jaunieši un studenti no Rīgas un citur — atvērta kopiena.',
    clubPoint3: 'Kritiskā domāšana, argumentācija un pārliecinoša publiskā runa.',
    clubCta: 'Lasīt vairāk',

    meetUs: 'Iepazīstieties ar mums',
    eventsList: 'Pasākumi',
    aboutTitle: 'Par Mums',
    whatIs: 'Kas ir LOGUS Debate?',
    whatIsDesc: 'LOGUS Debate ir vadošais debašu klubs Latvijā, kas veltīts jaunatnes intelektuālajai attīstībai un kritiskās domāšanas veicināšanai.',
    qualityDesc: 'Mēs nodrošinām augstākās kvalitātes apmācības un pieredzi debatēšanā, kas sagatavo dalībniekus izaicinošai pasaulei.',
    mission: 'Mūsu Misija',
    missionDesc: 'Veicināt jaunatnes potenciālu, attīstot argumentēšanas prasmes, pašpārliecību un stratēģisko domāšanu.',
    inclusiveDesc: 'Mēs izveidojam inkluzīvu kopienu, kurā katrs var attīstīties un sekmēt savu talantus debatēšanas mākslā.',
    nextEvents: 'Nākamie Pasākumi',
    sponsors: 'Mūsu Partneri',
    juniorChampionship: 'Jaunioru Debašu Čempionāts',
    championshipDesc: 'Lielākais debašu čempionāts Latvijā, kurā piedalās jaunieši no visas valsts. Konkursa formāts: British Parliamentary.',
    summerSchool: 'Vasaras Debašu Skola',
    summerDesc: 'Intensīvs mācību kurss jaunajiem debatieriem. Mācīsies no pieredzējušiem instruktoriem un starptautiskiem speciālistiem.',
    onlineDebate: 'Online Debašu Sērija',
    onlineDesc: 'Teju nedēļas sesijas, kas ideālas, lai pilnveidotu savas prasmes no jebkuras vietas. Atvērts visiem līmeņiem.',
    internationalCamp: 'Starptautiskas Debašu Nometne',
    campDesc: 'Piedalies kopā ar debatieriem no citām valstīm. Paplašini savu redzesloku un izveido starptautiskas draudzības.',
    teacherSeminar: 'Debašu Seminārs Skolotājiem',
    seminarDesc: 'Speciāli izstrādātas mācības pedagogiem, kas vēlas iepazīstināt savus audzēkņus ar debatēšanas mākslu skolā.',
    autumnLeague: 'Rudens Ligā Sākas',
    autumnDesc: 'Regulāra debašu ligā jauniešiem visās grupu vecumā. Katru piektdienas vakaru sacensības ar cilvēkiem tavā vecuma grupā.',
    sponsor: 'Sponsors',
    address: 'Adrese: Rīga, Latvija',
    email: 'E-pasts: info@logusdebate.lv',
    phone: 'Tel: +371 12345678',
    hours: 'Apmeklējuma laiks: 10:00 - 17:00',
    quickLinks: 'Ātras Saites',
    information: 'Informācija',
    registered: 'LOGUS Debate ir reģistrēta kā biedrība un darbojas pilnībā atbilstoši Latvijas likumiem.',
    programs: 'Mēs piedāvājam bezmaksas un maksas apmācības programmnas visiem lidzīgiem jauniešiem.',
    copyright: '© 2026 LOGUS Debate. Visas tiesības aizsargātas.',
    subtitle: 'Latvijas Modernākais Debašu Klubs',
  },
}

let currentLanguage = localStorage.getItem('language') || 'en'
let isDarkMode = false

const t = (key: string) => translations[currentLanguage as keyof typeof translations]?.[key as keyof typeof translations['en']] || key
const renderMoreMenuLinks = (lang: string) => {
  const isLv = lang === 'lv'

  return /* html */ `
    <ul class="nav-more-list">
      <li><a class="nav-dropdown-link" href="/events">${isLv ? 'Pasākumi' : 'Events'}</a></li>
      <li><a class="nav-dropdown-link" href="/page/news">${isLv ? 'Jaunumi' : 'News'}</a></li>
      <li><a class="nav-dropdown-link" href="/page/faq">${isLv ? 'BUJ' : 'FAQ'}</a></li>
      <li><a class="nav-dropdown-link" href="/page/rules">${isLv ? 'Noteikumi' : 'Rules'}</a></li>
      <li><a class="nav-dropdown-link" href="/page/partners">${isLv ? 'Partneri' : 'Partners'}</a></li>
      <li><a class="nav-dropdown-link" href="/page/projects">${isLv ? 'Projekti' : 'Projects'}</a></li>
      <li><a class="nav-dropdown-link" href="/page/arhive">${isLv ? 'Arhīvs' : 'Archive'}</a></li>
      <li><a class="nav-dropdown-link" href="/page/documents">${isLv ? 'Dokumenti' : 'Documents'}</a></li>
      <li><a class="nav-dropdown-link" href="/page/contacts">${isLv ? 'Kontakti' : 'Contacts'}</a></li>
    </ul>
  `
}

function renderNavSearch(variant: 'bar' | 'drawer') {
  const isDrawer = variant === 'drawer'
  const formId = isDrawer ? 'navDrawerSearchForm' : 'navSearchForm'
  const inputId = isDrawer ? 'navDrawerSearchInput' : 'navSearchInput'
  const resultsId = isDrawer ? 'navDrawerSearchResults' : 'navSearchResults'

  const form = /* html */ `
    <form class="nav-search-form${isDrawer ? ' nav-search-form--drawer' : ''}" id="${formId}" role="search">
      <label class="visually-hidden" for="${inputId}">${t('searchToggle')}</label>
      <input
        type="search"
        id="${inputId}"
        class="nav-search-input"
        placeholder="${t('searchPlaceholder')}"
        autocomplete="off"
        aria-autocomplete="list"
        aria-controls="${resultsId}"
        aria-expanded="false"
      >
      <div class="nav-search-results" id="${resultsId}" role="listbox" hidden></div>
    </form>
  `

  if (isDrawer) {
    return /* html */ `
      <div class="nav-drawer-search">
        ${form}
      </div>
    `
  }

  return /* html */ `
    <div class="nav-search-wrap nav-search--bar">
      <button type="button" class="nav-search-toggle" id="navSearchToggle" aria-expanded="false" aria-label="${t('searchToggle')}">
        <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
      </button>
      ${form}
    </div>
  `
}

type NavActive = 'about' | 'team' | 'donation'

function navActiveClass(active: NavActive | undefined, key: NavActive) {
  return active === key ? ' class="active-link"' : ''
}

function renderSiteHeader(active?: NavActive) {
  return /* html */ `
  <header>
    <nav>
      <div class="logo" style="z-index: 1004;">
        <a href="/" style="display:flex;align-items:center;gap:0.5rem;text-decoration:none;color:inherit;">
          <img src="/logo.png" alt="LOGUS Debate Logo">
          <!-- <span>LOGUS</span> -->
        </a>
      </div>
      <div class="nav-left">
        <div class="nav-more-wrap" id="navMoreWrap">
          <button type="button" class="nav-more-btn" id="navMoreBtn" aria-expanded="false" aria-haspopup="true" aria-label="${currentLanguage === 'lv' ? 'Izvēlne' : 'Menu'}">
            <span class="nav-burger" aria-hidden="true">
              <span class="nav-burger-line"></span>
              <span class="nav-burger-line"></span>
              <span class="nav-burger-line"></span>
            </span>
          </button>
          <div class="nav-more-panel" id="navMorePanel" role="menu">
            ${renderNavSearch('drawer')}
            ${renderMoreMenuLinks(currentLanguage)}
          </div>
        </div>
      </div>
      <div class="nav-cluster">
        <ul class="nav-links" id="navLinks">
          <li><a href="/about"${navActiveClass(active, 'about')}>${t('about')}</a></li>
          <li><a href="/team"${navActiveClass(active, 'team')}>${t('team')}</a></li>
          <li><a href="/donation"${navActiveClass(active, 'donation')}>${t('donation')}</a></li>
        </ul>
        ${renderNavSearch('bar')}
      </div>
      <div class="nav-right">
        <div class="language-switcher" id="languageSwitcher">
          <button class="lang-btn ${currentLanguage === 'en' ? 'active' : ''}" data-lang="en">ENG</button>
          <button class="lang-btn ${currentLanguage === 'lv' ? 'active' : ''}" data-lang="lv">LAT</button>
        </div>
      </div>
    </nav>
  </header>
  `
}

function formatEventListDate(dateRaw: string): string {
  const trimmed = dateRaw.trim()
  return trimmed.replace(/-/g, '.').replace(/(\d{1,2}:\d{2}):\d{2}\b/, '$1')
}

function eventListDatetimeAttr(dateRaw: string): string {
  const trimmed = dateRaw.trim()
  if (trimmed.includes(' ')) {
    return trimmed.replace(' ', 'T').replace(/:\d{2}$/, '')
  }
  return trimmed
}

function getEventStatus(ev: EventItem): 'open' | 'live' | 'concluded' {
  const d = new Date(ev.date + 'T12:00:00')
  const today = new Date()
  d.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)
  if (d < today) return 'concluded'
  if (d.getTime() === today.getTime()) return 'live'
  return 'open'
}

function renderHomeEventsSection(): string {
  const isLv = currentLanguage === 'lv'
  const home = getSitePages().home
  const sorted = [...getEventsItems()].sort((a, b) => a.date.localeCompare(b.date))

  const rows = sorted.map((ev) => {
    const title = isLv ? ev.title.lv : ev.title.en
    const desc = isLv ? ev.description.lv : ev.description.en
    const status = getEventStatus(ev)
    const statusKey = status === 'open' ? 'statusOpen' : status === 'live' ? 'statusLive' : 'statusConcluded'
    const statusLabel = t(statusKey)
    const dateFmt = formatEventListDate(ev.date)
    const statusClass = `event-status event-status--${status}`

    return /* html */ `
      <a class="event-list-row" href="${hrefForRoute(`event/${ev.id}`)}">
        <div class="event-list-meta">
          <time class="event-list-date" datetime="${eventListDatetimeAttr(ev.date)}">${dateFmt}</time>
          <span class="${statusClass}">
            ${status === 'live' ? '<span class="event-status-dot" aria-hidden="true"></span>' : ''}
            <span class="event-status-text">${statusLabel}</span>
          </span>
        </div>
        <div class="event-list-body">
          <span class="event-list-title">${title}</span>
          <span class="event-list-desc">${desc}</span>
        </div>
        <span class="event-list-arrow" aria-hidden="true">→</span>
      </a>
    `
  }).join('')

  return /* html */ `
    <section class="home-events" id="upcoming-events" aria-labelledby="home-events-heading">
      <div class="home-events-inner">
        <h2 id="home-events-heading" class="home-events-title">${pickLang(isLv, home.events_home_title)}</h2>
        <div class="event-list" role="list">
          ${rows}
        </div>
      </div>
    </section>
  `
}

function renderHomeSponsorsSection(): string {
  const sponsors = getSponsorItems()

  const slides =
    sponsors.length > 0
      ? sponsors
          .map(
            (sponsor) => /* html */ `
          <div class="swiper-slide">
            <img src="${sponsor.image}" alt="Sponsor" loading="lazy" decoding="async">
          </div>
        `,
          )
          .join('')
      : [1, 2, 3, 4, 5, 6]
          .map(
            (n) => /* html */ `
          <div class="swiper-slide">
            <div class="swiper-slide-sponsor-text">${t('sponsor')} ${n}</div>
          </div>
        `,
          )
          .join('')

  return /* html */ `
    <section class="sponsors" id="sponsors">
      <div class="swiper" id="sponsorSwiper">
        <div class="swiper-wrapper">
          ${slides}
        </div>
      </div>
    </section>
  `
}

function renderClubIntroSection(): string {
  const isLv = currentLanguage === 'lv'
  const home = getSitePages().home
  const points = home.club_points
    .map((point) => `<li>${pickLang(isLv, point)}</li>`)
    .join('')

  return /* html */ `
    <section class="club-split" id="club-intro" aria-labelledby="club-intro-heading">
      <div class="club-split-visual" role="img" aria-label=""></div>
      <div class="club-split-content">
        <h2 id="club-intro-heading" class="club-split-heading">${pickLang(isLv, home.club_heading)}</h2>
        <p class="club-split-lead">${pickLang(isLv, home.club_lead)}</p>
        <ul class="club-split-list">
          ${points}
        </ul>
        <a href="/about" class="btn btn-club-outline">${pickLang(isLv, home.club_cta)}</a>
      </div>
    </section>
  `
}

const getFontAwesomeIcon = (platform: string): string => {
  const platformLower = platform.toLowerCase()
  const iconMap: Record<string, string> = {
    facebook: 'fa-facebook-f',
    instagram: 'fa-instagram',
    twitter: 'fa-x-twitter',
    linkedin: 'fa-linkedin-in',
    youtube: 'fa-youtube',
    other: 'fa-link',
  }
  return iconMap[platformLower] || `fa-${platformLower}`
}

const renderSharedFooter = () => {
  const footer = getSitePages().footer
  const isLv = currentLanguage === 'lv'
  const socialLinks = getSocialLinks()

  const socialLinksHtml = socialLinks.length > 0
    ? socialLinks.map(link => 
        `<a href="${link.url.trim()}" title="${link.platform}" aria-label="${link.platform}" target="_blank" rel="noopener noreferrer"><i class="fa-brands ${getFontAwesomeIcon(link.platform)}"></i></a>`
      ).join('')
    : `<a href="javascript:void(0)" title="Facebook" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="javascript:void(0)" title="Instagram" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
          <a href="javascript:void(0)" title="Twitter" aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
          <a href="javascript:void(0)" title="LinkedIn" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>`

  return /* html */ `
  <footer id="contact">
    <div class="footer-content">
      <div class="footer-section">
        <h3>LOGUS Debate</h3>
        <p>${pickLang(isLv, footer.tagline)}</p>
        <div class="social-links">
          ${socialLinksHtml}
        </div>
      </div>
      <div class="footer-section">
        <h3>${t('contact')}</h3>
        <p>${pickLang(isLv, footer.address)}</p>
        <p>${footer.email}</p>
        <p>${footer.phone}</p>
        <p>${pickLang(isLv, footer.hours)}</p>
      </div>
      <div class="footer-section">
        <h3>${t('quickLinks')}</h3>
        <ul class="footer-quick-links">
          <li><a href="/">${t('home')}</a></li>
          <li><a href="/about">${t('about')}</a></li>
          <li><a href="/events">${t('events')}</a></li>
          <li><a href="/page/partners">${t('partners')}</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>${t('information')}</h3>
        <p>${pickLang(isLv, footer.registered)}</p>
        <p>${pickLang(isLv, footer.programs)}</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>${pickLang(isLv, footer.copyright)}</p>
    </div>
  </footer>
`
}

const app = document.querySelector<HTMLDivElement>('#app')!

function renderPage() {
  const isLv = currentLanguage === 'lv'
  const home = getSitePages().home
  const heroImage = resolveSiteImage(home.hero_image)

  app.innerHTML = /* html */ `
  ${renderSiteHeader()}

  <main class="main-landing">
    <section class="hero hero--immersive" id="home">
      <div class="hero-bg" style="background-image: url('${heroImage}');" role="img" aria-label=""></div>
      <div class="hero-overlay" aria-hidden="true"></div>
      <div class="hero-inner">
        <div class="hero-content hero-content--left">
          <h1 class="hero-headline">
            <span class="hero-headline-line">${pickLang(isLv, home.hero_line1)}</span>
            <span class="hero-headline-line"><span class="hero-highlight">${pickLang(isLv, home.hero_highlight)}</span> ${pickLang(isLv, home.hero_line2)}</span>
          </h1>
          <div class="hero-actions">
            <a href="/club-intro" class="btn btn-hero-primary">${pickLang(isLv, home.meet_us)}</a>
            <a href="/upcoming-events" class="btn btn-hero-ghost">${t('events')}</a>
          </div>
        </div>
      </div>
    </section>

    ${renderHomeEventsSection()}

    ${renderClubIntroSection()}

    ${renderHomeSponsorsSection()}
  </main>

  ${renderSharedFooter()}
  `

  setupEventListeners()
  initSwiper()
  setupScrollAnimation()
}

function renderAboutView() {
  app.innerHTML = /* html */ `
  ${renderSiteHeader('about')}
  <main class="page-main">
    ${renderAboutPage(currentLanguage)}
  </main>
  ${renderSharedFooter()}
  `
  setupEventListeners()
  setupScrollAnimation()
  setupAboutAnimations()
}

function renderTeamView() {
  app.innerHTML = /* html */ `
  ${renderSiteHeader('team')}
  <main class="page-main">
    ${renderTeamPage(currentLanguage)}
  </main>
  ${renderSharedFooter()}
  `

  setupEventListeners()
  setupScrollAnimation()
  setupTeamAnimations()
}

// ── Events page (standalone) ──
function renderEventsView() {
  app.innerHTML = /* html */ `
  ${renderSiteHeader()}
  <main class="page-main page-main--events">
    ${renderEventsPage(currentLanguage)}
  </main>
  ${renderSharedFooter()}
  `
  setupEventListeners()
  setupEventsAnimations()
}

function renderDonationView() {
  app.innerHTML = /* html */ `
  ${renderSiteHeader('donation')}
  <main class="page-main">
    ${renderDonationPage(currentLanguage)}
  </main>
  ${renderSharedFooter()}
  `

  setupEventListeners()
  setupScrollAnimation()
  setupDonationCopy()
}

function renderEventView(eventId: string) {
  const detail = renderEventDetail(eventId, currentLanguage)
  if (!detail) { navigateTo('events'); return }

  app.innerHTML = /* html */ `
  ${renderSiteHeader()}
  <main class="page-main page-main--events">
    ${detail}
  </main>
  ${renderSharedFooter()}
  `
  setupEventListeners()
  setupEventDetailAnimations()
}

function renderSecondaryView(slug: string) {
  const detail = renderSecondaryPage(slug, currentLanguage)
  if (!detail) { navigateTo('home'); return }

  app.innerHTML = /* html */ `
  ${renderSiteHeader()}
  <main class="page-main">
    ${detail}
  </main>
  ${renderSharedFooter()}
  `

  setupEventListeners()
  setupScrollAnimation()
  if (slug === 'news') setupNewsAnimations()
  if (slug === 'faq') {
    setupFaqAnimations()
    setupFaqAccordion()
    setupFaqForm(currentLanguage)
  }
  if (slug === 'documents') {
    setupDocumentsAnimations()
  }
  if (slug === 'projects' || slug === 'project') {
    setupProjectsAnimations()
  }
  if (slug === 'arhive' || slug === 'archive') {
    setupArchivePage(currentLanguage)
  }
}

function renderNewsDetailView(newsId: string) {
  const detail = renderNewsDetail(newsId, currentLanguage)
  if (!detail) { navigateTo('page/news'); return }

  app.innerHTML = /* html */ `
  ${renderSiteHeader()}
  <main class="page-main page-main--flush">
    ${detail}
  </main>
  ${renderSharedFooter()}
  `

  setupEventListeners()
  setupNewsDetailAnimations()
}

function renderProjectDetailView(projectId: string) {
  const detail = renderProjectDetail(projectId, currentLanguage)
  if (!detail) {
    navigateTo('page/projects')
    return
  }

  app.innerHTML = /* html */ `
  ${renderSiteHeader()}
  <main class="page-main page-main--flush">
    ${detail}
  </main>
  ${renderSharedFooter()}
  `

  setupEventListeners()
  setupProjectDetailAnimations()
  setupProjectCarousel()
}

function navigateTo(route: string) {
  pushRoute(route)
  handleRoute()
}

function handleRoute() {
  migrateLegacyHash()
  const route = getRouteFromLocation()
  window.scrollTo(0, 0)

  if (route === 'events') {
    renderEventsView()
  } else if (route === 'about') {
    renderAboutView()
  } else if (route === 'team') {
    renderTeamView()
  } else if (route === 'donation') {
    renderDonationView()
  } else if (route.startsWith('page/')) {
    const pageSlug = route.split('/')[1]
    renderSecondaryView(pageSlug)
  } else if (route.startsWith('news/')) {
    const newsId = route.split('/')[1]
    renderNewsDetailView(newsId)
  } else if (route.startsWith('event/')) {
    const eventId = route.split('/')[1]
    renderEventView(eventId)
  } else if (route.startsWith('project/')) {
    const projectId = route.slice('project/'.length)
    renderProjectDetailView(projectId)
  } else {
    renderPage()
    if (route !== 'home') {
      setTimeout(() => {
        document.getElementById(route)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }
}

window.addEventListener('popstate', handleRoute)

function setupHeroComparisonSlider() {
  const slider = document.getElementById('heroSlider')
  const handle = document.getElementById('heroHandle')
  const after = document.querySelector('.hero-comparison-after') as HTMLElement

  if (!slider || !handle || !after) return

  let isActive = false

  const handleMouseDown = () => {
    isActive = true
  }

  const handleMouseUp = () => {
    isActive = false
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isActive) return

    const rect = slider.getBoundingClientRect()
    let x = e.clientX - rect.left

    if (x < 0) x = 0
    if (x > rect.width) x = rect.width

    const percentage = (x / rect.width) * 100

    after.style.width = (100 - percentage) + '%'
    handle.style.left = percentage + '%'
  }

  handle.addEventListener('mousedown', handleMouseDown)
  document.addEventListener('mouseup', handleMouseUp)
  document.addEventListener('mousemove', handleMouseMove)

  handle.addEventListener('touchstart', () => {
    isActive = true
  })

  document.addEventListener('touchend', () => {
    isActive = false
  })

  document.addEventListener('touchmove', (e: TouchEvent) => {
    if (!isActive) return

    const rect = slider.getBoundingClientRect()
    let x = e.touches[0].clientX - rect.left

    if (x < 0) x = 0
    if (x > rect.width) x = rect.width

    const percentage = (x / rect.width) * 100

    after.style.width = (100 - percentage) + '%'
    handle.style.left = percentage + '%'
  })
}

function setupEventListeners() {
  const existingOverlay = document.querySelector('.nav-drawer-overlay')
  if (existingOverlay) {
    existingOverlay.remove()
  }

  const overlay = document.createElement('div')
  overlay.className = 'nav-drawer-overlay'
  document.body.appendChild(overlay)

  const mobileNavMq = window.matchMedia('(max-width: 768px)')
  const isMobileNav = () => mobileNavMq.matches

  const navMoreBtn = document.getElementById('navMoreBtn')
  const navMoreWrap = document.getElementById('navMoreWrap')
  const navSearchToggle = document.getElementById('navSearchToggle')
  const navSearchForm = document.getElementById('navSearchForm')
  const navSearchInput = document.getElementById('navSearchInput') as HTMLInputElement | null
  const navDrawerSearchForm = document.getElementById('navDrawerSearchForm')
  const navDrawerSearchInput = document.getElementById('navDrawerSearchInput') as HTMLInputElement | null

  const closeNavMore = () => {
    navMoreWrap?.classList.remove('is-open')
    navMoreBtn?.setAttribute('aria-expanded', 'false')
    overlay.classList.remove('active')
    document.body.classList.remove('drawer-open')
  }

  overlay.addEventListener('click', closeNavMore)

  mobileNavMq.addEventListener('change', () => {
    closeNavMore()
    closeSearch()
    closeDrawerSearch()
  })

  const closeSearch = () => {
    navSearchForm?.classList.remove('is-visible')
    navSearchToggle?.classList.remove('is-open')
    navSearchToggle?.setAttribute('aria-expanded', 'false')
  }

  const closeDrawerSearch = () => {
    if (!navDrawerSearchInput || !navDrawerSearchForm) return
    navDrawerSearchInput.value = ''
    const resultsEl = document.getElementById('navDrawerSearchResults')
    if (resultsEl) {
      resultsEl.hidden = true
      resultsEl.innerHTML = ''
    }
    navDrawerSearchInput.setAttribute('aria-expanded', 'false')
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeNavMore()
      closeSearch()
      closeDrawerSearch()
    }
  })

  document.querySelectorAll('.nav-more-panel a').forEach(link => {
    link.addEventListener('click', () => {
      closeNavMore()
      closeDrawerSearch()
    })
  })

  const langButtons = document.querySelectorAll('.lang-btn')
  langButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const newLang = (e.target as HTMLElement).getAttribute('data-lang')
      if (newLang) {
        currentLanguage = newLang
        localStorage.setItem('language', newLang)
        invalidateSearchIndex()
        handleRoute()
      }
    })
  })


  navMoreBtn?.addEventListener('click', (e) => {
    e.stopPropagation()
    const next = !navMoreWrap?.classList.contains('is-open')
    if (next) {
      closeSearch()
      navMoreWrap?.classList.add('is-open')
      navMoreBtn.setAttribute('aria-expanded', 'true')
      if (isMobileNav()) {
        overlay.classList.add('active')
        document.body.classList.add('drawer-open')
        setTimeout(() => navDrawerSearchInput?.focus(), 120)
      }
      return
    }

    closeNavMore()
    closeDrawerSearch()
  })

  document.addEventListener('click', (e) => {
    if (isMobileNav()) return
    if (navMoreWrap && !navMoreWrap.contains(e.target as Node)) {
      closeNavMore()
    }
  })

  navSearchToggle?.addEventListener('click', (e) => {
    e.stopPropagation()
    const open = !navSearchForm?.classList.contains('is-visible')
    if (open) closeNavMore()
    navSearchForm?.classList.toggle('is-visible', open)
    navSearchToggle.classList.toggle('is-open', open)
    navSearchToggle.setAttribute('aria-expanded', open ? 'true' : 'false')
    if (open) {
      setTimeout(() => navSearchInput?.focus(), 0)
    }
  })

  document.addEventListener('click', (e) => {
    if (navSearchForm && navSearchToggle && !navSearchForm.contains(e.target as Node) && !navSearchToggle.contains(e.target as Node)) {
      closeSearch()
    }
  })

  setupNavSearch(navSearchForm, navSearchInput, closeSearch, 'navSearchResults')
  setupNavSearch(navDrawerSearchForm, navDrawerSearchInput, closeDrawerSearch, 'navDrawerSearchResults', closeNavMore)
}

function setupNavSearch(
  form: HTMLElement | null,
  input: HTMLInputElement | null,
  closeSearch: () => void,
  resultsId: string,
  onNavigate?: () => void,
) {
  const resultsEl = document.getElementById(resultsId)
  if (!form || !input || !resultsEl) return

  let activeIndex = -1
  let currentResults: SearchResult[] = []

  const goTo = (route: string) => {
    closeSearch()
    onNavigate?.()
    input.value = ''
    hideResults()
    navigateTo(route.replace(/^#/, ''))
  }

  const hideResults = () => {
    resultsEl.hidden = true
    resultsEl.innerHTML = ''
    input.setAttribute('aria-expanded', 'false')
    activeIndex = -1
    currentResults = []
  }

  const renderResults = (results: SearchResult[]) => {
    currentResults = results
    activeIndex = -1

    if (results.length === 0) {
      const q = input.value.trim()
      if (q.length < 1) {
        hideResults()
        return
      }
      resultsEl.innerHTML = /* html */ `
        <p class="nav-search-empty">${t('searchNoResults')}</p>
      `
      resultsEl.hidden = false
      input.setAttribute('aria-expanded', 'true')
      return
    }

    const query = input.value.trim()
    const items = results.map((r, i) => /* html */ `
      <button
        type="button"
        class="nav-search-result"
        role="option"
        data-index="${i}"
        data-route="${r.route}"
        id="navSearchOption-${i}"
      >
        <span class="nav-search-result-title">${highlightSearchText(r.title, query)}</span>
        <span class="nav-search-result-meta">${highlightSearchText(r.subtitle, query)}</span>
      </button>
    `).join('')

    resultsEl.innerHTML = items
    resultsEl.hidden = false
    input.setAttribute('aria-expanded', 'true')

    resultsEl.querySelectorAll('.nav-search-result').forEach((btn) => {
      btn.addEventListener('mousedown', (e) => {
        e.preventDefault()
        const route = (btn as HTMLElement).dataset.route
        if (route) goTo(route)
      })
    })
  }

  const setActiveOption = (index: number) => {
    const buttons = resultsEl.querySelectorAll('.nav-search-result')
    buttons.forEach((btn, i) => {
      btn.classList.toggle('is-active', i === index)
      if (i === index) {
        input.setAttribute('aria-activedescendant', btn.id)
      }
    })
    if (index < 0) {
      input.removeAttribute('aria-activedescendant')
    }
    activeIndex = index
  }

  const runSearch = () => {
    const q = input.value.trim()
    if (q.length < 1) {
      hideResults()
      return
    }
    renderResults(searchSite(q, currentLanguage))
  }

  const navigateFirst = () => {
    if (currentResults.length === 0) {
      runSearch()
    }
    if (currentResults.length > 0) {
      const idx = activeIndex >= 0 ? activeIndex : 0
      goTo(currentResults[idx].route)
    }
  }

  input.addEventListener('input', runSearch)
  input.addEventListener('focus', () => {
    if (input.value.trim().length > 0) runSearch()
  })

  input.addEventListener('keydown', (e) => {
    const buttons = resultsEl.querySelectorAll('.nav-search-result')
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (buttons.length === 0) runSearch()
      const next = activeIndex < buttons.length - 1 ? activeIndex + 1 : 0
      setActiveOption(next)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (buttons.length === 0) return
      const prev = activeIndex > 0 ? activeIndex - 1 : buttons.length - 1
      setActiveOption(prev)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeIndex >= 0 && currentResults[activeIndex]) {
        goTo(currentResults[activeIndex].route)
      } else {
        navigateFirst()
      }
    } else if (e.key === 'Escape') {
      hideResults()
    }
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    navigateFirst()
  })
}

function initSwiper() {
  new (window as any).Swiper('#sponsorSwiper', {
    loop: true,
    autoplay: true,
    speed: 500,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 30,
      }
    },
  })
}

function setupScrollAnimation() {
  const header = document.querySelector('header')
  const heroContent = document.querySelector('.hero-content')


  if (heroContent) {
    animate(
      heroContent as any,
      { opacity: [0, 1], y: [28, 0] } as any,
      { duration: 0.6, ease: 'ease-out' } as any,
    )
  }


  inView('.about-grid > div', (element) => {
    animate(
      element as any,
      { opacity: [0, 1], y: [18, 0] } as any,
      { duration: 0.45, ease: 'ease-out' } as any,
    )
  })

  inView('.swiper-slide', (element) => {
    animate(
      element as any,
      { opacity: [0, 1], scale: [0.98, 1] } as any,
      { duration: 0.4, ease: 'ease-out' } as any,
    )
  })

  inView('.event-list-row', (element) => {
    animate(
      element as any,
      { opacity: [0, 1], y: [14, 0] } as any,
      { duration: 0.4, ease: 'ease-out' } as any,
    )
  })

  inView('.club-split', (element) => {
    animate(
      element as any,
      { opacity: [0, 1], y: [22, 0] } as any,
      { duration: 0.5, ease: 'ease-out' } as any,
    )
  })
}

async function bootstrap() {
  migrateLegacyHash()
  await loadSiteContent()
  await loadSitePages()
  invalidateSearchIndex()
  handleRoute()
}

bootstrap()
