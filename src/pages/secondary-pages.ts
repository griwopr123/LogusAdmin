import { renderContactsPage } from './contacts-page'
import { renderNewsPage } from './news-page'
import { renderFaqPage } from './faq-page'
import { renderDocumentsPage } from './documents-page'
import { renderRulesPage } from './rules-page'
import { renderPartnersPage } from './partners-page'
import { renderProjectsPage } from './projects-page'

export interface SecondaryPageItem {
  slug: string
  title: { en: string; lv: string }
  body: { en: string; lv: string }
}

export const secondaryPages: SecondaryPageItem[] = [
  { slug: 'news', title: { en: 'News', lv: 'Jaunumi' }, body: { en: 'Latest updates about LOGUS Debate activities, announcements, and community highlights.', lv: 'Jaunākās ziņas par LOGUS Debate aktivitātēm, paziņojumiem un kopienas notikumiem.' } },
  { slug: 'blog', title: { en: 'Blog', lv: 'Blogs' }, body: { en: 'Articles about debating, argumentation, and communication from our mentors and students.', lv: 'Raksti par debatēm, argumentāciju un komunikāciju no mūsu mentoriem un studentiem.' } },
  { slug: 'faq', title: { en: 'FAQ', lv: 'BUJ' }, body: { en: 'Answers to common questions about training, tournaments, and participation rules.', lv: 'Atbildes uz biežāk uzdotajiem jautājumiem par apmācībām, turnīriem un dalību.' } },
  { slug: 'rules', title: { en: 'Debate Rules', lv: 'Debašu Noteikumi' }, body: { en: 'Overview of formats, scoring principles, and judging criteria we use in events.', lv: 'Pārskats par formātiem, vērtēšanas principiem un tiesāšanas kritērijiem mūsu pasākumos.' } },
  { slug: 'documents', title: { en: 'Documents', lv: 'Dokumenti' }, body: { en: 'Association bylaws, ethics code, and annual reports.', lv: 'Biedrības statūti, ētikas kodekss un gada pārskati.' } },
  { slug: 'projects', title: { en: 'Projects', lv: 'Projekti' }, body: { en: 'Youth programmes, school visits, and funded initiatives.', lv: 'Jaunatnes programmas, skolu vizītes un finansētie projekti.' } },
  { slug: 'coaches', title: { en: 'Coaches', lv: 'Treneri' }, body: { en: 'Meet the experienced coaches and guest experts supporting participant growth.', lv: 'Iepazīsti pieredzējušos trenerus un viesekspertus, kas palīdz dalībnieku izaugsmei.' } },
  { slug: 'testimonials', title: { en: 'Testimonials', lv: 'Atsauksmes' }, body: { en: 'Stories and feedback from students, parents, and partners of LOGUS Debate.', lv: 'Studentu, vecāku un partneru stāsti un atsauksmes par LOGUS Debate.' } },
  { slug: 'media', title: { en: 'Media', lv: 'Mediji' }, body: { en: 'Photos, videos, and media materials from our tournaments and workshops.', lv: 'Foto, video un citi mediju materiāli no mūsu turnīriem un semināriem.' } },
  { slug: 'careers', title: { en: 'Careers', lv: 'Karjera' }, body: { en: 'Join our team as a coordinator, trainer, or volunteer in ongoing projects.', lv: 'Pievienojies komandai kā koordinators, treneris vai brīvprātīgais projektos.' } },
  { slug: 'partners', title: { en: 'Partners', lv: 'Partneri' }, body: { en: 'Information for schools, NGOs, and sponsors interested in collaboration.', lv: 'Informācija skolām, NVO un sponsoriem, kuri interesējas par sadarbību.' } },
  { slug: 'contacts', title: { en: 'Contacts', lv: 'Kontakti' }, body: { en: 'Ways to reach us for registration, partnership, and general inquiries.', lv: 'Veidi, kā ar mums sazināties par reģistrāciju, sadarbību un citiem jautājumiem.' } },
]

export function renderSecondaryPage(slug: string, lang: string): string | null {
  if (slug === 'contacts') {
    return renderContactsPage(lang)
  }

  if (slug === 'news') {
    return renderNewsPage(lang)
  }

  if (slug === 'faq') {
    return renderFaqPage(lang)
  }

  if (slug === 'rules') {
    return renderRulesPage(lang)
  }

  if (slug === 'documents') {
    return renderDocumentsPage(lang)
  }

  if (slug === 'partners') {
    return renderPartnersPage(lang)
  }

  if (slug === 'projects' || slug === 'project') {
    return renderProjectsPage(lang)
  }

  const page = secondaryPages.find((item) => item.slug === slug)
  if (!page) return null

  const isLv = lang === 'lv'
  const title = isLv ? page.title.lv : page.title.en
  const body = isLv ? page.body.lv : page.body.en

  return /* html */ `
    <section class="secondary-page" id="secondary-page">
      <h2>${title}</h2>
      <p>${body}</p>
      <a href="#home" class="btn">${isLv ? 'Uz sākumu' : 'Back to home'}</a>
    </section>
  `
}
