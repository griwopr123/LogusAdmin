import { getTeamMembers } from '../services/content-store'
import { getSitePages, pickLang } from '../services/site-pages-store'

export function renderContactsPage(lang: string): string {
  const isLv = lang === 'lv'
  const contacts = getSitePages().contacts

  const departmentBlocks = contacts.departments
    .map((d) => /* html */ `
    <div class="contacts-detail-block">
      <p class="contacts-detail-line">
        <strong>${pickLang(isLv, d.label)}:</strong>
        <a href="mailto:${d.email}">${d.email}</a>
      </p>
      <p class="contacts-detail-hint">${pickLang(isLv, d.hint)}</p>
    </div>
  `)
    .join('')

  const teamRows = getTeamMembers()
    .map((m, i) => {
      const name = pickLang(isLv, m.name)
      const role = pickLang(isLv, m.role)
      const email = contacts.role_emails[i] ?? contacts.email
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
        <h1 class="contacts-org-title">${contacts.page_title}</h1>
        <div class="contacts-org-block" aria-label="${isLv ? 'Organizācijas dati' : 'Organisation details'}">
          <p class="contacts-org-name">${pickLang(isLv, contacts.org_name)}</p>
          <dl class="contacts-org-dl">
            <div class="contacts-org-row">
              <dt>${isLv ? 'Reģistrācijas numurs' : 'Registration no.'}</dt>
              <dd>${contacts.reg_no}</dd>
            </div>
            <div class="contacts-org-row">
              <dt>${isLv ? 'Biroja adrese' : 'Office address'}</dt>
              <dd>${pickLang(isLv, contacts.street)}</dd>
            </div>
            <div class="contacts-org-row">
              <dt>${isLv ? 'E-pasts' : 'Email'}</dt>
              <dd><a href="mailto:${contacts.email}">${contacts.email}</a></dd>
            </div>
            <div class="contacts-org-row">
              <dt>${isLv ? 'Telefona nr.' : 'Phone'}</dt>
              <dd><a href="tel:${contacts.phone}">${contacts.phone_display}</a></dd>
            </div>
            <div class="contacts-org-row">
              <dt>${isLv ? 'Darba laiks' : 'Office hours'}</dt>
              <dd>${pickLang(isLv, contacts.hours)}</dd>
            </div>
          </dl>
        </div>

        <!--<section class="contacts-departments" aria-labelledby="contacts-departments-heading">
          <h2 id="contacts-departments-heading">${isLv ? 'Departamenti' : 'Departments'}</h2>
          ${departmentBlocks}
        </section>

        <section class="contacts-team" aria-labelledby="contacts-team-heading">
          <h2 id="contacts-team-heading">${isLv ? 'Komanda' : 'Team contacts'}</h2>
          <ul class="contacts-team-list">${teamRows}</ul>
        </section> -->
      </div>
    </article>
  `
}
