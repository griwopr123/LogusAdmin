import './style.scss'
import './events.scss'
import { animate, inView } from 'motion'
import { renderEventsPage, setupEventsAnimations } from './events-page'
import { renderEventDetail, setupEventDetailAnimations } from './event-detail'
import { renderAboutPage } from './about-page'
import { renderDonationPage } from './donation-page'
import { renderSecondaryPage } from './secondary-pages'

const translations = {
  en: {
    team: 'Team',
    about: 'About Us',
    donation: 'Donation',

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
    about: 'Par Mums',
    team: 'Komanda',
    donation: 'Ziedojumi',

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
    <li><a class="drawer-secondary-link" href="#page/blog">${isLv ? 'Blogs' : 'Blog'}</a></li>
    <li><a class="drawer-secondary-link" href="#page/faq">${isLv ? 'BUJ' : 'FAQ'}</a></li>
    <li><a class="drawer-secondary-link" href="#page/rules">${isLv ? 'Noteikumi' : 'Rules'}</a></li>
    <li><a class="drawer-secondary-link" href="#page/coaches">${isLv ? 'Treneri' : 'Coaches'}</a></li>
    <li><a class="drawer-secondary-link" href="#page/testimonials">${isLv ? 'Atsauksmes' : 'Testimonials'}</a></li>
    <li><a class="drawer-secondary-link" href="#page/media">${isLv ? 'Mediji' : 'Media'}</a></li>
    <li><a class="drawer-secondary-link" href="#page/careers">${isLv ? 'Karjera' : 'Careers'}</a></li>
    <li><a class="drawer-secondary-link" href="#page/partners">${isLv ? 'Partneri' : 'Partners'}</a></li>
    <li><a class="drawer-secondary-link" href="#page/contacts">${isLv ? 'Kontakti' : 'Contacts'}</a></li>
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
  <header>
    <nav>
      <div class="nav-left">
        <div class="logo">
          <a href="#home" style="display:flex;align-items:center;gap:0.5rem;text-decoration:none;color:inherit;">
            <img src="/logo.jpg" alt="LOGUS Debate Logo">
            <span>LOGUS</span>
          </a>
        </div>
        <div class="hamburger" id="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <ul class="nav-links" id="navLinks">
        <li><a href="#about">${t('about')}</a></li>
        <li><a href="#team">${t('team')}</a></li>
        <li><a href="#donation">${t('donation')}</a></li>
        <li class="drawer-divider"></li>
        <li class="drawer-title">${currentLanguage === 'lv' ? 'Papildus' : 'More'}</li>
        ${renderDrawerSecondaryLinks(currentLanguage)}
      </ul>
      <div class="nav-right">
        <div class="language-switcher" id="languageSwitcher">
          <button class="lang-btn ${currentLanguage === 'en' ? 'active' : ''}" data-lang="en">ENG</button>
          <button class="lang-btn ${currentLanguage === 'lv' ? 'active' : ''}" data-lang="lv">LAT</button>
        </div>
        <!-- <button class="theme-toggle" id="themeToggle">${isDarkMode ? '☀️' : '🌙'}</button> -->
      </div>
    </nav>
  </header>

  <main>
    <section class="hero" id="home">
      <div class="hero-comparison-slider" id="heroSlider">
        <div class="hero-comparison-before">
          <div class="hero-content">
            <img src="/logo.jpg" alt="LOGUS Debate" class="hero-logo">
            <h1>LOGUS Debate</h1>
            <p>${t('subtitle')}</p>
            <div style="margin-top: 2rem;">
              <a href="#about" class="btn">${t('meetUs')}</a>
              <a href="#events" class="btn btn-outline">${t('events')}</a>
            </div>
          </div>
        </div>
        <div class="hero-comparison-after dark-mode">
          <div class="hero-content">
            <img src="/logo.jpg" alt="LOGUS Debate" class="hero-logo">
            <h1>LOGUS Debate</h1>
            <p>${t('subtitle')}</p>
            <div style="margin-top: 2rem;">
              <a href="#about" class="btn">${t('meetUs')}</a>
              <a href="#events" class="btn btn-outline">${t('events')}</a>
            </div>
          </div>
        </div>
        <div class="hero-comparison-handle" id="heroHandle"></div>
      </div>
    </section>

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
  setupHeroComparisonSlider()
}

function renderAboutView() {
  app.innerHTML = /* html */ `
  <header>
    <nav>
      <div class="nav-left">
        <div class="logo">
          <a href="#home" style="display:flex;align-items:center;gap:0.5rem;text-decoration:none;color:inherit;">
            <img src="/logo.jpg" alt="LOGUS Debate Logo">
            <span>LOGUS</span>
          </a>
        </div>
        <div class="hamburger" id="hamburger">
          <span></span><span></span><span></span>
        </div>
      </div>
      <ul class="nav-links" id="navLinks">
        <li><a href="#about" class="active-link">${t('about')}</a></li>
        <li><a href="#team">${t('team')}</a></li>
        <li><a href="#donation">${t('donation')}</a></li>
        <li class="drawer-divider"></li>
        <li class="drawer-title">${currentLanguage === 'lv' ? 'Papildus' : 'More'}</li>
        ${renderDrawerSecondaryLinks(currentLanguage)}
      </ul>
      <div class="nav-right">
        <div class="language-switcher" id="languageSwitcher">
          <button class="lang-btn ${currentLanguage === 'en' ? 'active' : ''}" data-lang="en">ENG</button>
          <button class="lang-btn ${currentLanguage === 'lv' ? 'active' : ''}" data-lang="lv">LAT</button>
        </div>
      </div>
    </nav>
  </header>
  <main class="page-main">
    ${renderAboutPage(currentLanguage)}
  </main>
  ${renderSharedFooter()}
  `
  setupEventListeners()
  setupScrollAnimation()
}

// ── Events page (standalone) ──
function renderEventsView() {
  app.innerHTML = /* html */ `
  <header>
    <nav>
      <div class="nav-left">
        <div class="logo">
          <a href="#home" style="display:flex;align-items:center;gap:0.5rem;text-decoration:none;color:inherit;">
            <img src="/logo.jpg" alt="LOGUS Debate Logo">
            <span>LOGUS</span>
          </a>
        </div>
        <div class="hamburger" id="hamburger">
          <span></span><span></span><span></span>
        </div>
      </div>
      <ul class="nav-links" id="navLinks">
        <li><a href="#about">${t('about')}</a></li>
        <li><a href="#team" class="active-link">${t('team')}</a></li>
        <li><a href="#donation">${t('donation')}</a></li>
        <li class="drawer-divider"></li>
        <li class="drawer-title">${currentLanguage === 'lv' ? 'Papildus' : 'More'}</li>
        ${renderDrawerSecondaryLinks(currentLanguage)}
      </ul>
      <div class="nav-right">
        <div class="language-switcher" id="languageSwitcher">
          <button class="lang-btn ${currentLanguage === 'en' ? 'active' : ''}" data-lang="en">ENG</button>
          <button class="lang-btn ${currentLanguage === 'lv' ? 'active' : ''}" data-lang="lv">LAT</button>
        </div>
      </div>
    </nav>
  </header>
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
  <header>
    <nav>
      <div class="nav-left">
        <div class="logo">
          <a href="#home" style="display:flex;align-items:center;gap:0.5rem;text-decoration:none;color:inherit;">
            <img src="/logo.jpg" alt="LOGUS Debate Logo">
            <span>LOGUS</span>
          </a>
        </div>
        <div class="hamburger" id="hamburger">
          <span></span><span></span><span></span>
        </div>
      </div>
      <ul class="nav-links" id="navLinks">
        <li><a href="#about">${t('about')}</a></li>
        <li><a href="#team" class="active-link">${t('team')}</a></li>
        <li><a href="#donation">${t('donation')}</a></li>
        <li class="drawer-divider"></li>
        <li class="drawer-title">${currentLanguage === 'lv' ? 'Papildus' : 'More'}</li>
        ${renderDrawerSecondaryLinks(currentLanguage)}
      </ul>
      <div class="nav-right">
        <div class="language-switcher" id="languageSwitcher">
          <button class="lang-btn ${currentLanguage === 'en' ? 'active' : ''}" data-lang="en">ENG</button>
          <button class="lang-btn ${currentLanguage === 'lv' ? 'active' : ''}" data-lang="lv">LAT</button>
        </div>
      </div>
    </nav>
  </header>
  <main class="page-main">
    ${renderDonationPage(currentLanguage)}
  </main>
  ${renderSharedFooter()}
  `

  setupEventListeners()
  setupScrollAnimation()
}

// ── Event detail page ──
function renderEventView(eventId: string) {
  const detail = renderEventDetail(eventId, currentLanguage)
  if (!detail) { navigateTo('events'); return }

  app.innerHTML = /* html */ `
  <header>
    <nav>
      <div class="nav-left">
        <div class="logo">
          <a href="#home" style="display:flex;align-items:center;gap:0.5rem;text-decoration:none;color:inherit;">
            <img src="/logo.jpg" alt="LOGUS Debate Logo">
            <span>LOGUS</span>
          </a>
        </div>
        <div class="hamburger" id="hamburger">
          <span></span><span></span><span></span>
        </div>
      </div>
      <ul class="nav-links" id="navLinks">
        <li><a href="#about">${t('about')}</a></li>
        <li><a href="#team">${t('team')}</a></li>
        <li><a href="#donation">${t('donation')}</a></li>
        <li class="drawer-divider"></li>
        <li class="drawer-title">${currentLanguage === 'lv' ? 'Papildus' : 'More'}</li>
        ${renderDrawerSecondaryLinks(currentLanguage)}
      </ul>
      <div class="nav-right">
        <div class="language-switcher" id="languageSwitcher">
          <button class="lang-btn ${currentLanguage === 'en' ? 'active' : ''}" data-lang="en">ENG</button>
          <button class="lang-btn ${currentLanguage === 'lv' ? 'active' : ''}" data-lang="lv">LAT</button>
        </div>
      </div>
    </nav>
  </header>
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
  <header>
    <nav>
      <div class="nav-left">
        <div class="logo">
          <a href="#home" style="display:flex;align-items:center;gap:0.5rem;text-decoration:none;color:inherit;">
            <img src="/logo.jpg" alt="LOGUS Debate Logo">
            <span>LOGUS</span>
          </a>
        </div>
        <div class="hamburger" id="hamburger">
          <span></span><span></span><span></span>
        </div>
      </div>
      <ul class="nav-links" id="navLinks">
        <li><a href="#about">${t('about')}</a></li>
        <li><a href="#team">${t('team')}</a></li>
        <li><a href="#donation">${t('donation')}</a></li>
        <li class="drawer-divider"></li>
        <li class="drawer-title">${currentLanguage === 'lv' ? 'Papildus' : 'More'}</li>
        ${renderDrawerSecondaryLinks(currentLanguage)}
      </ul>
      <div class="nav-right">
        <div class="language-switcher" id="languageSwitcher">
          <button class="lang-btn ${currentLanguage === 'en' ? 'active' : ''}" data-lang="en">ENG</button>
          <button class="lang-btn ${currentLanguage === 'lv' ? 'active' : ''}" data-lang="lv">LAT</button>
        </div>
      </div>
    </nav>
  </header>
  <main class="page-main">
    ${detail}
  </main>
  ${renderSharedFooter()}
  `

  setupEventListeners()
  setupScrollAnimation()
}

// ── Simple hash router ──
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
  } else if (hash === 'donation') {
    renderDonationView()
  } else if (hash.startsWith('page/')) {
    const pageSlug = hash.split('/')[1]
    renderSecondaryView(pageSlug)
  } else if (hash.startsWith('event/')) {
    const eventId = hash.split('/')[1]
    renderEventView(eventId)
  } else {
    renderPage()
    // Scroll to section if hash matches a section id
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
  const hamburger = document.getElementById('hamburger')
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

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks?.classList.toggle('active')
      overlay.classList.toggle('active', Boolean(isOpen))
      document.body.classList.toggle('drawer-open', Boolean(isOpen))
    })
  }

  overlay.addEventListener('click', closeDrawer)

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer()
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
        handleRoute()
      }
    })
  })

  const themeToggle = document.getElementById('themeToggle')
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      isDarkMode = !isDarkMode
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
      document.body.classList.toggle('dark-mode', isDarkMode)
      themeToggle.textContent = isDarkMode ? '☀️' : '🌙'
    })
  }
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

  if (header) {
    animate(
      header as any,
      { opacity: [0, 1], y: [-18, 0] } as any,
      { duration: 0.35, ease: 'ease-out' } as any,
    )
  }

  if (heroContent) {
    animate(
      heroContent as any,
      { opacity: [0, 1], y: [28, 0] } as any,
      { duration: 0.6, ease: 'ease-out' } as any,
    )
  }

  inView('section', (element) => {
    if (element.classList.contains('hero')) return
    animate(
      element as any,
      { opacity: [0, 1], y: [28, 0] } as any,
      { duration: 0.5, ease: 'ease-out' } as any,
    )
  })

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

  inView('footer', (element) => {
    animate(
      element as any,
      { opacity: [0, 1], y: [20, 0] } as any,
      { duration: 0.45, ease: 'ease-out' } as any,
    )
  })
}

if (isDarkMode) {
  document.body.classList.add('dark-mode')
} else {
  document.body.classList.remove('dark-mode')
  localStorage.setItem('theme', 'light')
}

// Initial route
handleRoute()
