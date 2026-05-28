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
import { animate, inView } from 'motion'
import { renderEventsPage, setupEventsAnimations, categoryLabels } from './pages/events-page'
import { eventsData, type EventItem } from './data/events-data'
import { renderEventDetail, setupEventDetailAnimations } from './details/event-detail'
import { renderAboutPage } from './pages/about-page'
import { renderDonationPage, setupDonationCopy } from './pages/donation-page'
import { renderTeamPage, setupTeamAnimations } from './pages/team-page'
import { renderSecondaryPage } from './pages/secondary-pages'
import { renderNewsDetail, setupNewsDetailAnimations } from './details/news-detail'
import { setupNewsAnimations } from './pages/news-page'
import { setupFaqForm, setupFaqAccordion, setupFaqAnimations } from './pages/faq-page'
import { renderDocumentDetail, setupDocumentDetailAnimations } from './details/document-detail'
import { renderProjectDetail, setupProjectDetailAnimations, setupProjectCarousel } from './details/project-detail'
import { setupDocumentsFilter, setupDocumentsAnimations } from './pages/documents-page'
import { setupProjectsAnimations } from './pages/projects-page'
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
const renderDrawerSecondaryLinks = (lang: string) => {
  const isLv = lang === 'lv'

  return /* html */ `
    <li><a class="drawer-secondary-link" href="#page/news">${isLv ? 'Jaunumi' : 'News'}</a></li>
    <li><a class="drawer-secondary-link" href="#page/faq">${isLv ? 'BUJ' : 'FAQ'}</a></li>
    <li><a class="drawer-secondary-link" href="#page/rules">${isLv ? 'Noteikumi' : 'Rules'}</a></li>
    <li><a class="drawer-secondary-link" href="#page/partners">${isLv ? 'Partneri' : 'Partners'}</a></li>
    <li><a class="drawer-secondary-link" href="#page/contacts">${isLv ? 'Kontakti' : 'Contacts'}</a></li>
    <li><a class="drawer-secondary-link" href="#page/documents">${isLv ? 'Dokumenti' : 'Documents'}</a></li>
  `
}

const renderDropdownSecondaryLinks = (lang: string) => {
  const isLv = lang === 'lv'

  return /* html */ `
    <ul class="nav-more-list">
      <li><a class="nav-dropdown-link" href="#home">${isLv ? 'Sākums' : 'Home'}</a></li>
      <li><a class="nav-dropdown-link" href="#events">${isLv ? 'Pasākumi' : 'Events'}</a></li>
      <li><a class="nav-dropdown-link" href="#page/news">${isLv ? 'Jaunumi' : 'News'}</a></li>
      <li><a class="nav-dropdown-link" href="#page/faq">${isLv ? 'BUJ' : 'FAQ'}</a></li>
      <li><a class="nav-dropdown-link" href="#page/rules">${isLv ? 'Noteikumi' : 'Rules'}</a></li>
      <li><a class="nav-dropdown-link" href="#page/partners">${isLv ? 'Partneri' : 'Partners'}</a></li>
      <li><a class="nav-dropdown-link" href="#page/projects">${isLv ? 'Projekta' : 'Project'}</a></li>
      <li><a class="nav-dropdown-link" href="#page/contacts">${isLv ? 'Arhīva' : 'Arhive'}</a></li>
      <li><a class="nav-dropdown-link" href="#page/documents">${isLv ? 'Dokumenti' : 'Documents'}</a></li>
      <li><a class="nav-dropdown-link" href="#page/contacts">${isLv ? 'Kontakti' : 'Contacts'}</a></li>
    </ul>
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
      <div class="nav-left">
        <div class="logo">
          <a href="#home" style="display:flex;align-items:center;gap:0.5rem;text-decoration:none;color:inherit;">
            <img src="/logo.png" alt="LOGUS Debate Logo">
            <!-- <span>LOGUS</span> -->
          </a>
        </div>
        <div class="nav-more-wrap" id="navMoreWrap">
          <button type="button" class="nav-more-btn" id="navMoreBtn" aria-expanded="false" aria-haspopup="true" aria-label="${currentLanguage === 'lv' ? 'Izvēlne' : 'Menu'}">
            <span class="nav-burger" aria-hidden="true">
              <span class="nav-burger-line"></span>
              <span class="nav-burger-line"></span>
              <span class="nav-burger-line"></span>
            </span>
          </button>
          <div class="nav-more-panel" id="navMorePanel" role="menu">
            ${renderDropdownSecondaryLinks(currentLanguage)}
          </div>
        </div>
      </div>
      <div class="nav-cluster">
        <ul class="nav-links" id="navLinks">
          <li class="nav-drawer-only"><a href="#home">${t('home')}</a></li>
          <li class="nav-drawer-only"><a href="#events">${t('events')}</a></li>
          <li><a href="#about"${navActiveClass(active, 'about')}>${t('about')}</a></li>
          <li><a href="#team"${navActiveClass(active, 'team')}>${t('team')}</a></li>
          <li><a href="#donation"${navActiveClass(active, 'donation')}>${t('donation')}</a></li>
          <li class="drawer-divider"></li>
          <li class="drawer-title">${currentLanguage === 'lv' ? 'Papildus' : 'More'}</li>
          ${renderDrawerSecondaryLinks(currentLanguage)}
        </ul>
        <div class="nav-search-wrap">
          <button type="button" class="nav-search-toggle" id="navSearchToggle" aria-expanded="false" aria-label="${t('searchToggle')}">
            <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          </button>
          <form class="nav-search-form" id="navSearchForm" role="search">
            <label class="visually-hidden" for="navSearchInput">${t('searchToggle')}</label>
            <input
              type="search"
              id="navSearchInput"
              class="nav-search-input"
              placeholder="${t('searchPlaceholder')}"
              autocomplete="off"
              aria-autocomplete="list"
              aria-controls="navSearchResults"
              aria-expanded="false"
            >
            <div class="nav-search-results" id="navSearchResults" role="listbox" hidden></div>
          </form>
        </div>
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
  const sorted = [...eventsData].sort((a, b) => a.date.localeCompare(b.date))

  const rows = sorted.map((ev) => {
    const title = isLv ? ev.title.lv : ev.title.en
    const desc = isLv ? ev.description.lv : ev.description.en
    const cat = categoryLabels[ev.category]
      ? (isLv ? categoryLabels[ev.category].lv : categoryLabels[ev.category].en)
      : ev.category
    const status = getEventStatus(ev)
    const statusKey = status === 'open' ? 'statusOpen' : status === 'live' ? 'statusLive' : 'statusConcluded'
    const statusLabel = t(statusKey)
    const dateFmt = ev.date.replace(/-/g, '.')
    const statusClass = `event-status event-status--${status}`

    return /* html */ `
      <a class="event-list-row" href="#event/${ev.id}">
        <div class="event-list-meta">
          <time class="event-list-date" datetime="${ev.date}">${dateFmt}</time>
          <span class="${statusClass}">
            ${status === 'live' ? '<span class="event-status-dot" aria-hidden="true"></span>' : ''}
            <span class="event-status-text">${statusLabel}</span>
          </span>
        </div>
        <div class="event-list-body">
          <span class="event-list-cat">${cat}</span>
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
        <h2 id="home-events-heading" class="home-events-title">${t('eventsHomeTitle')}</h2>
        <div class="event-list" role="list">
          ${rows}
        </div>
      </div>
    </section>
  `
}

function renderClubIntroSection(): string {
  return /* html */ `
    <section class="club-split" id="club-intro" aria-labelledby="club-intro-heading">
      <div class="club-split-visual" role="img" aria-label=""></div>
      <div class="club-split-content">
        <h2 id="club-intro-heading" class="club-split-heading">${t('whatIs')}</h2>
        <p class="club-split-lead">${t('whatIsDesc')}</p>
        <ul class="club-split-list">
          <li>${t('clubPoint1')}</li>
          <li>${t('clubPoint2')}</li>
          <li>${t('clubPoint3')}</li>
        </ul>
        <a href="#about" class="btn btn-club-outline">${t('clubCta')}</a>
      </div>
    </section>
  `
}

const renderSharedFooter = () => /* html */ `
  <footer id="contact">
    <div class="footer-content">
      <div class="footer-section">
        <h3>LOGUS Debate</h3>
        <p>${currentLanguage === 'en' ? 'Latvia\'s leading debate club dedicated to youth intellectual and personal development.' : currentLanguage === 'lv' ? 'Latvijas vadošais debašu klubs, veltīts jaunatnes intelektuālajai un personīgajai attīstībai.' : 'Ведущий дебатный клуб Латвии, посвященный интеллектуальному и личному развитию молодежи.'}</p>
        <div class="social-links">
          <a href="#" title="Facebook">f</a>
          <a href="#" title="Instagram">in</a>
          <a href="#" title="Twitter">x</a>
          <a href="#" title="LinkedIn">in</a>
        </div>
      </div>
      <div class="footer-section">
        <h3>${t('contact')}</h3>
        <p>${t('address')}</p>
        <p>${t('email')}</p>
        <p>${t('phone')}</p>
        <p>${t('hours')}</p>
      </div>
      <div class="footer-section">
        <h3>${t('quickLinks')}</h3>
        <ul style="list-style: none;">
          <li><a href="#home">${t('home')}</a></li>
          <li><a href="#about">${t('about')}</a></li>
          <li><a href="#events">${t('events')}</a></li>
                    <li><a href="#events">${t('events')}</a></li>
          <li><a href="#sponsors">${t('partners')}</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>${t('information')}</h3>
        <p>${t('registered')}</p>
        <p>${t('programs')}</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>${t('copyright')}</p>
    </div>
  </footer>
`

const app = document.querySelector<HTMLDivElement>('#app')!

function renderPage() {
  app.innerHTML = /* html */ `
  ${renderSiteHeader()}

  <main class="main-landing">
    <section class="hero hero--immersive" id="home">
      <div class="hero-bg" style="background-image: url('/bg-image.jpg');" role="img" aria-label=""></div>
      <div class="hero-overlay" aria-hidden="true"></div>
      <div class="hero-inner">
        <div class="hero-content hero-content--left">
          <h1 class="hero-headline">
            <span class="hero-headline-line">${t('heroLine1')}</span>
            <span class="hero-headline-line"><span class="hero-highlight">${t('heroHighlight')}</span> ${t('heroLine2')}</span>
          </h1>
          <div class="hero-actions">
            <a href="#club-intro" class="btn btn-hero-primary">${t('meetUs')}</a>
            <a href="#upcoming-events" class="btn btn-hero-ghost">${t('events')}</a>
          </div>
        </div>
      </div>
    </section>

    ${renderHomeEventsSection()}

    ${renderClubIntroSection()}

    <section class="sponsors" id="sponsors">
      <!-- <h2>${t('sponsors')}</h2> -->
      <div class="swiper" id="sponsorSwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="swiper-slide-sponsor-text">${t('sponsor')} 1</div>
          </div>
          <div class="swiper-slide">
            <div class="swiper-slide-sponsor-text">${t('sponsor')} 2</div>
          </div>
          <div class="swiper-slide">
            <div class="swiper-slide-sponsor-text">${t('sponsor')} 3</div>
          </div>
          <div class="swiper-slide">
            <div class="swiper-slide-sponsor-text">${t('sponsor')} 4</div>
          </div>
          <div class="swiper-slide">
            <div class="swiper-slide-sponsor-text">${t('sponsor')} 5</div>
          </div>
          <div class="swiper-slide">
            <div class="swiper-slide-sponsor-text">${t('sponsor')} 6</div>
          </div>
        </div>
      </div>
    </section>
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
  <main class="page-main">
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
  <main class="page-main">
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
    setupDocumentsFilter()
    setupDocumentsAnimations()
  }
  if (slug === 'projects' || slug === 'project') {
    setupProjectsAnimations()
  }
}

function renderDocumentDetailView(docId: string) {
  const detail = renderDocumentDetail(docId, currentLanguage)
  if (!detail) { navigateTo('page/documents'); return }

  app.innerHTML = /* html */ `
  ${renderSiteHeader()}
  <main class="page-main">
    ${detail}
  </main>
  ${renderSharedFooter()}
  `

  setupEventListeners()
  setupDocumentDetailAnimations()
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

function navigateTo(hash: string) {
  window.location.hash = hash
}

function handleRoute() {
  const hash = window.location.hash.slice(1) || 'home'
  window.scrollTo(0, 0)

  if (hash === 'events') {
    renderEventsView()
  } else if (hash === 'about') {
    renderAboutView()
  } else if (hash === 'team') {
    renderTeamView()
  } else if (hash === 'donation') {
    renderDonationView()
  } else if (hash.startsWith('page/')) {
    const pageSlug = hash.split('/')[1]
    renderSecondaryView(pageSlug)
  } else if (hash.startsWith('news/')) {
    const newsId = hash.split('/')[1]
    renderNewsDetailView(newsId)
  } else if (hash.startsWith('document/')) {
    const docId = hash.split('/')[1]
    renderDocumentDetailView(docId)
  } else if (hash.startsWith('event/')) {
    const eventId = hash.split('/')[1]
    renderEventView(eventId)
  } else if (hash.startsWith('project/')) {
    const projectId = hash.slice('project/'.length)
    renderProjectDetailView(projectId)
  } else {
    renderPage()
    if (hash !== 'home') {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }
}

window.addEventListener('hashchange', handleRoute)

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
  const navLinks = document.getElementById('navLinks')

  const existingOverlay = document.querySelector('.nav-drawer-overlay')
  if (existingOverlay) {
    existingOverlay.remove()
  }

  const overlay = document.createElement('div')
  overlay.className = 'nav-drawer-overlay'
  document.body.appendChild(overlay)

  const closeDrawer = () => {
    navLinks?.classList.remove('active')
    overlay.classList.remove('active')
    document.body.classList.remove('drawer-open')
  }


  overlay.addEventListener('click', closeDrawer)

  const navMoreBtn = document.getElementById('navMoreBtn')
  const navMoreWrap = document.getElementById('navMoreWrap')
  const navSearchToggle = document.getElementById('navSearchToggle')
  const navSearchForm = document.getElementById('navSearchForm')
  const navSearchInput = document.getElementById('navSearchInput') as HTMLInputElement | null

  const closeNavMore = () => {
    navMoreWrap?.classList.remove('is-open')
    navMoreBtn?.setAttribute('aria-expanded', 'false')
  }

  const closeSearch = () => {
    navSearchForm?.classList.remove('is-visible')
    navSearchToggle?.classList.remove('is-open')
    navSearchToggle?.setAttribute('aria-expanded', 'false')
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer()
      closeNavMore()
      closeSearch()
    }
  })

  const navElements = document.querySelectorAll('.nav-links a')
  navElements.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer()
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
    navMoreWrap?.classList.toggle('is-open', next)
    navMoreBtn.setAttribute('aria-expanded', next ? 'true' : 'false')
  })

  document.addEventListener('click', (e) => {
    if (navMoreWrap && !navMoreWrap.contains(e.target as Node)) {
      closeNavMore()
    }
  })

  navSearchToggle?.addEventListener('click', (e) => {
    e.stopPropagation()
    const open = !navSearchForm?.classList.contains('is-visible')
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

  setupNavSearch(navSearchForm, navSearchInput, closeSearch)
}

function setupNavSearch(
  form: HTMLElement | null,
  input: HTMLInputElement | null,
  closeSearch: () => void,
) {
  const resultsEl = document.getElementById('navSearchResults')
  if (!form || !input || !resultsEl) return

  let activeIndex = -1
  let currentResults: SearchResult[] = []

  const goTo = (hash: string) => {
    closeSearch()
    input.value = ''
    hideResults()
    window.location.hash = hash.replace(/^#/, '')
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
        data-hash="${r.hash}"
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
        const hash = (btn as HTMLElement).dataset.hash
        if (hash) goTo(hash)
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
      goTo(currentResults[idx].hash)
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
        goTo(currentResults[activeIndex].hash)
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



handleRoute()
