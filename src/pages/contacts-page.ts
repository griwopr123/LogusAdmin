import { getTeamMembers } from '../services/content-store'

const ORG = {
  nameLv: 'Biedrība "LOGUS Debate"',
  nameEn: 'Association "LOGUS Debate"',
  regNo: '40008123456',
  streetLv: 'LOGUS Centrs, Rīga, Latvija, LV-1010',
  streetEn: 'LOGUS Centre, Riga, Latvia, LV-1010',
  email: 'info@logusdebate.lv',
  phone: '+37112345678',
  phoneDisplay: '+371 12345678',
  hoursLv: 'P.–Pk., 10:00–17:00',
  hoursEn: 'Mon–Fri, 10:00–17:00',
}

const DEPARTMENTS = [
  {
    labelLv: 'Valdes kontakti',
    labelEn: 'Board contacts',
    email: 'valde@logusdebate.lv',
    hintLv: 'Ja vēlaties sazināties ar visu valdi vienlaikus.',
    hintEn: 'If you want to reach the full board at once.',
  },
  {
    labelLv: 'Pasākumu kontakti',
    labelEn: 'Events contacts',
    email: 'pasakumi@logusdebate.lv',
    hintLv: 'Ja vēlaties reģistrēties turnīram, semināram vai līgai.',
    hintEn: 'For tournament, workshop, or league registration.',
  },
  {
    labelLv: 'Sadarbības kontakti',
    labelEn: 'Partnership contacts',
    email: 'sadarbiba@logusdebate.lv',
    hintLv: 'Ja vēlaties sadarboties kā skola, sponsors vai NVO.',
    hintEn: 'For schools, sponsors, and NGO collaboration.',
  },
  {
    labelLv: 'Mediju kontakti',
    labelEn: 'Media contacts',
    email: 'mediji@logusdebate.lv',
    hintLv: 'Ja vēlaties sazināties par mājaslapu, sociālajiem medijiem vai LOGUS Debate vizuālo identitāti.',
    hintEn: 'For the website, social media, or LOGUS Debate visual identity.',
  },
  {
    labelLv: 'Dalības un treniņu kontakti',
    labelEn: 'Membership & training',
    email: 'daliba@logusdebate.lv',
    hintLv: 'Ja vēlaties pievienoties nodarbībām vai uzzināt par līmeņiem un grafiku.',
    hintEn: 'To join sessions or ask about levels and schedules.',
  },
]

const ROLE_EMAILS = [
  'programmas@logusdebate.lv',
  'trenini@logusdebate.lv',
  'coaching@logusdebate.lv',
  'junior@logusdebate.lv',
]

const INQUIRIES = [
  {
    subjectEn: 'LOGUS Debate membership',
    subjectLv: 'Dalība LOGUS Debate',
    labelEn: 'Membership & training',
    labelLv: 'Dalība un treniņi',
    descEn: 'Sessions, levels, and schedules.',
    descLv: 'Nodarbības, līmeņi un grafiks.',
  },
  {
    subjectEn: 'Event registration',
    subjectLv: 'Pasākuma reģistrācija',
    labelEn: 'Event registration',
    labelLv: 'Pasākumu reģistrācija',
    descEn: 'Tournaments and workshops.',
    descLv: 'Turnīri un semināri.',
  },
  {
    subjectEn: 'Partnership inquiry',
    subjectLv: 'Sadarbība / partnerība',
    labelEn: 'Partnership',
    labelLv: 'Sadarbība',
    descEn: 'Schools, sponsors, NGOs.',
    descLv: 'Skolas, sponsori, NVO.',
  },
  {
    subjectEn: 'Media inquiry',
    subjectLv: 'Mediji',
    labelEn: 'Media & press',
    labelLv: 'Mediji',
    descEn: 'Press and interviews.',
    descLv: 'Prese un intervijas.',
  },
]

function pick(isLv: boolean, pair: { en: string; lv: string }): string {
  return isLv ? pair.lv : pair.en
}

export function renderContactsPage(lang: string): string {
  const isLv = lang === 'lv'

  const inquiryList = INQUIRIES.map((item) => {
    const subject = isLv ? item.subjectLv : item.subjectEn
    const label = isLv ? item.labelLv : item.labelEn
    const desc = isLv ? item.descLv : item.descEn

    return /* html */ `
      <li>
        <a class="contacts-topic-link" href="mailto:${ORG.email}?subject=${encodeURIComponent(subject)}">
          <span class="contacts-topic-text">
            <span class="contacts-topic-name">${label}</span>
            <span class="contacts-topic-desc">${desc}</span>
          </span>
          <i class="fa-solid fa-arrow-right contacts-topic-icon" aria-hidden="true"></i>
        </a>
      </li>
    `
  }).join('')

  const departmentBlocks = DEPARTMENTS.map((d) => /* html */ `
    <div class="contacts-detail-block">
      <p class="contacts-detail-line">
        <strong>${isLv ? d.labelLv : d.labelEn}:</strong>
        <a href="mailto:${d.email}">${d.email}</a>
      </p>
      <p class="contacts-detail-hint">${isLv ? d.hintLv : d.hintEn}</p>
    </div>
  `).join('')

  const teamRows = getTeamMembers()
    .map((m, i) => {
      const name = pick(isLv, m.name)
      const role = pick(isLv, m.role)
      const email = ROLE_EMAILS[i] ?? ORG.email
      return /* html */ `
        <li class="contacts-team-row">
          <span class="contacts-team-name">${name}</span>
          <span class="contacts-team-sep" aria-hidden="true">|</span>
          <a href="mailto:${email}">${email}</a>
          <span class="contacts-team-role">${role}</span>
        </li>
      `
    })
    .join('')

  return /* html */ `
    <article class="contacts-page" id="contacts">

      <div class="contacts-shell">
        <h1 class="contacts-org-title">CONTACTS US</h1>
        <div class="contacts-org-block" aria-label="${isLv ? 'Organizācijas dati' : 'Organisation details'}">
          <p class="contacts-org-name">${isLv ? ORG.nameLv : ORG.nameEn}</p>
          <dl class="contacts-org-dl">
            <div class="contacts-org-row">
              <dt>${isLv ? 'Reģistrācijas numurs' : 'Registration no.'}</dt>
              <dd>${ORG.regNo}</dd>
            </div>
            <div class="contacts-org-row">
              <dt>${isLv ? 'Biroja adrese' : 'Office address'}</dt>
              <dd>${isLv ? ORG.streetLv : ORG.streetEn}</dd>
            </div>
            <div class="contacts-org-row">
              <dt>${isLv ? 'E-pasts' : 'Email'}</dt>
              <dd><a href="mailto:${ORG.email}">${ORG.email}</a></dd>
            </div>
            <div class="contacts-org-row">
              <dt>${isLv ? 'Telefona nr.' : 'Phone'}</dt>
              <dd><a href="tel:${ORG.phone}">${ORG.phoneDisplay}</a></dd>
            </div>
            <div class="contacts-org-row">
              <dt>${isLv ? 'Darba laiks' : 'Office hours'}</dt>
              <dd>${isLv ? ORG.hoursLv : ORG.hoursEn}</dd>
            </div>
            <div class="contacts-org-row">
              <dt>${isLv ? 'Reģistrācijas numurs' : 'Registration no.'}</dt>
              <dd>${ORG.regNo}</dd>
            </div>
            <div class="contacts-org-row">
              <dt>${isLv ? 'Biroja adrese' : 'Office address'}</dt>
              <dd>${isLv ? ORG.streetLv : ORG.streetEn}</dd>
            </div>
            <div class="contacts-org-row">
              <dt>${isLv ? 'E-pasts' : 'Email'}</dt>
              <dd><a href="mailto:${ORG.email}">${ORG.email}</a></dd>
            </div>
            <div class="contacts-org-row">
              <dt>${isLv ? 'Telefona nr.' : 'Phone'}</dt>
              <dd><a href="tel:${ORG.phone}">${ORG.phoneDisplay}</a></dd>
            </div>
            <div class="contacts-org-row">
              <dt>${isLv ? 'Darba laiks' : 'Office hours'}</dt>
              <dd>${isLv ? ORG.hoursLv : ORG.hoursEn}</dd>
            </div>
          </dl>
        </div>

      </div>
    </article>
  `
}
