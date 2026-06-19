import { aboutPillars, aboutStats, aboutValues } from './about-data'
import { archiveTabs } from './archive-data'
import { faqData, FAQ_EMAIL } from './faq-data'
import { rulesData } from './rules-data'
import type { SitePages } from './site-pages-types'

export const defaultSitePages: SitePages = {
  home: {
    hero_line1: { en: "LATVIA'S HOME FOR", lv: 'VIETA LATVIJĀ' },
    hero_highlight: { en: 'PROFESSIONAL', lv: 'PROFESIONĀLĀM' },
    hero_line2: { en: 'DEBATE', lv: 'DEBATĒM' },
    hero_image: '/bg-image.jpg',
    meet_us: { en: 'Meet Us', lv: 'Iepazīstieties ar mums' },
    events_home_title: { en: 'Upcoming events', lv: 'Gaidāmie pasākumi' },
    club_heading: { en: 'What is LOGUS Debate?', lv: 'Kas ir LOGUS Debate?' },
    club_lead: {
      en: 'LOGUS Debate is the leading debate club in Latvia, dedicated to the intellectual development of youth and the promotion of critical thinking.',
      lv: 'LOGUS Debate ir vadošais debašu klubs Latvijā, kas veltīts jauniešu intelektuālajai attīstībai un kritiskās domāšanas veicināšanai.',
    },
    club_points: [
      {
        en: 'British Parliamentary and open formats — training for tournaments and life.',
        lv: 'British Parliamentary un citi formāti — sagatavošana sacensībām un dzīvei.',
      },
      {
        en: 'Youth and students from Riga and beyond — inclusive community.',
        lv: 'Jaunieši un studenti no Rīgas un citur — atvērta kopiena.',
      },
      {
        en: 'Critical thinking, argumentation, and confident public speaking.',
        lv: 'Kritiskā domāšana, argumentācija un pārliecinoša publiskā runa.',
      },
    ],
    club_cta: { en: 'Read more', lv: 'Lasīt vairāk' },
  },
  footer: {
    tagline: {
      en: "Latvia's leading debate club dedicated to youth intellectual and personal development.",
      lv: 'Latvijas vadošais debašu klubs, veltīts jaunatnes intelektuālajai un personīgajai attīstībai.',
    },
    address: { en: 'Address: Riga, Latvia', lv: 'Adrese: Rīga, Latvija' },
    email: 'Email: info@logusdebate.lv',
    phone: 'Phone: +371 12345678',
    hours: { en: 'Visiting hours: 10:00 - 17:00', lv: 'Apmeklējuma laiks: 10:00 - 17:00' },
    registered: {
      en: 'LOGUS Debate is registered as an association and fully complies with Latvian laws.',
      lv: 'LOGUS Debate ir reģistrēta kā biedrība un pilnībā atbilst Latvijas likumiem.',
    },
    programs: {
      en: 'We offer free and paid training programs for all interested young people.',
      lv: 'Mēs piedāvājam bezmaksas un maksas apmācību programmas visiem ieinteresētajiem jauniešiem.',
    },
    copyright: { en: '© 2026 LOGUS Debate. All rights reserved.', lv: '© 2026 LOGUS Debate. Visas tiesības aizsargātas.' },
  },
  about: {
    hero_kicker: 'LOGUS Debate',
    hero_title: { en: 'About us', lv: 'Par mums' },
    hero_lead: {
      en: "Latvia's home for debate — where young people build argumentation, confidence, and teamwork.",
      lv: 'Latvijas vieta debašu pasaulē — kur jaunieši attīsta argumentāciju, pārliecību un komandas darbu.',
    },
    intro_heading: { en: 'What is LOGUS Debate?', lv: 'Kas ir LOGUS Debate?' },
    intro_p1: {
      en: 'We are an association and debate club bringing together youth, students, and mentors from Riga and across Latvia. Sessions are structured — clear goals, a supportive atmosphere, and high standards.',
      lv: 'Mēs esam biedrība un debašu klubs, kas apvieno jauniešus, studentus un mentorus no Rīgas un visas Latvijas. Nodarbības notiek strukturēti — ar skaidriem mērķiem, atbalstošu atmosfēru un augstu prasību līmeni.',
    },
    intro_p2: {
      en: 'Our main competitive format is British Parliamentary (BP). We also run practice debates, school programmes, summer schools, and international collaborations.',
      lv: 'Galvenais sacensību formāts ir British Parliamentary (BP). Papildus rīkojam treniņdebates, skolu programmas, vasaras skolas un starptautiskus sadarbības projektus.',
    },
    location_heading: { en: 'Find us', lv: 'Kur mūs atrast' },
    location_text: {
      en: 'Based in Riga — training and tournaments run in person and online. Exact venue and times are shared when you register for an event.',
      lv: 'Bāze Rīgā — nodarbības un turnīri notiek klātienē un tiešsaistē. Precīzu adresi un laiku norādām reģistrācijā uz konkrētu pasākumu.',
    },
    email: 'info@logusdebate.lv',
    phone: '+371 12345678',
    location: { en: 'Riga, Latvia', lv: 'Rīga, Latvija' },
    pillars: aboutPillars.map((p) => ({ id: p.id, title: p.title, text: p.text })),
    values: aboutValues.map((v) => ({ id: v.id, title: v.title, text: v.text })),
    stats: aboutStats.map((s) => ({ value: s.value, label: s.label })),
  },
  faq: {
    page_title: { en: 'FAQ', lv: 'BUJ' },
    page_subtitle: {
      en: 'Answers to common questions about membership, training, and events.',
      lv: 'Atbildes uz biežāk uzdotajiem jautājumiem par dalību, treniņiem un pasākumiem.',
    },
    write_title: { en: "Didn't find an answer?", lv: 'Nav atbildes?' },
    write_lead: {
      en: 'Write to us — we reply by email within 1–2 business days.',
      lv: 'Uzraksti mums — atbildēsim uz e-pastu 1–2 darba dienu laikā.',
    },
    email: FAQ_EMAIL,
    items: faqData.map((item) => ({
      id: item.id,
      question: item.question,
      answer: item.answer,
    })),
  },
  rules: {
    page_title: { en: 'Debate rules', lv: 'Debašu noteikumi' },
    groups: rulesData.map((group) => ({
      text: group.text,
      items: group.items.map((item) => ({ text: item.text })),
    })),
  },
  contacts: {
    page_title: 'CONTACTS US',
    org_name: { en: 'Association "LOGUS Debate"', lv: 'Biedrība "LOGUS Debate"' },
    reg_no: '40008123456',
    street: { en: 'LOGUS Centre, Riga, Latvia, LV-1010', lv: 'LOGUS Centrs, Rīga, Latvija, LV-1010' },
    email: 'info@logusdebate.lv',
    phone: '+37112345678',
    phone_display: '+371 12345678',
    hours: { en: 'Mon–Fri, 10:00–17:00', lv: 'P.–Pk., 10:00–17:00' },
    departments: [
      {
        label: { en: 'Board contacts', lv: 'Valdes kontakti' },
        email: 'valde@logusdebate.lv',
        hint: { en: 'If you want to reach the full board at once.', lv: 'Ja vēlaties sazināties ar visu valdi vienlaikus.' },
      },
      {
        label: { en: 'Events contacts', lv: 'Pasākumu kontakti' },
        email: 'pasakumi@logusdebate.lv',
        hint: { en: 'For tournament, workshop, or league registration.', lv: 'Ja vēlaties reģistrēties turnīram, semināram vai līgai.' },
      },
      {
        label: { en: 'Partnership contacts', lv: 'Sadarbības kontakti' },
        email: 'sadarbiba@logusdebate.lv',
        hint: { en: 'For schools, sponsors, and NGO collaboration.', lv: 'Ja vēlaties sadarboties kā skola, sponsors vai NVO.' },
      },
      {
        label: { en: 'Media contacts', lv: 'Mediju kontakti' },
        email: 'mediji@logusdebate.lv',
        hint: { en: 'For the website, social media, or LOGUS Debate visual identity.', lv: 'Ja vēlaties sazināties par mājaslapu, sociālajiem medijiem vai LOGUS Debate vizuālo identitāti.' },
      },
      {
        label: { en: 'Membership & training', lv: 'Dalības un treniņu kontakti' },
        email: 'daliba@logusdebate.lv',
        hint: { en: 'To join sessions or ask about levels and schedules.', lv: 'Ja vēlaties pievienoties nodarbībām vai uzzināt par līmeņiem un grafiku.' },
      },
    ],
    inquiries: [
      {
        subject: { en: 'LOGUS Debate membership', lv: 'Dalība LOGUS Debate' },
        label: { en: 'Membership & training', lv: 'Dalība un treniņi' },
        description: { en: 'Sessions, levels, and schedules.', lv: 'Nodarbības, līmeņi un grafiks.' },
      },
      {
        subject: { en: 'Event registration', lv: 'Pasākuma reģistrācija' },
        label: { en: 'Event registration', lv: 'Pasākumu reģistrācija' },
        description: { en: 'Tournaments and workshops.', lv: 'Turnīri un semināri.' },
      },
      {
        subject: { en: 'Partnership inquiry', lv: 'Sadarbība / partnerība' },
        label: { en: 'Partnership', lv: 'Sadarbība' },
        description: { en: 'Schools, sponsors, NGOs.', lv: 'Skolas, sponsori, NVO.' },
      },
      {
        subject: { en: 'Media inquiry', lv: 'Mediji' },
        label: { en: 'Media & press', lv: 'Mediji' },
        description: { en: 'Press and interviews.', lv: 'Prese un intervijas.' },
      },
    ],
    role_emails: [
      'programmas@logusdebate.lv',
      'trenini@logusdebate.lv',
      'coaching@logusdebate.lv',
      'junior@logusdebate.lv',
    ],
  },
  donation: {
    kicker: { en: 'Donate', lv: 'Ziedojums' },
    heading: { en: 'Support debate in Latvia', lv: 'Atbalsti debašu izaugsmi Latvijā' },
    subtitle: {
      en: 'Your contribution helps run tournaments, training, and open debate to young people across the country.',
      lv: 'Tavs ieguldījums palīdz rīkot turnīrus, nodrošināt treniņus un atvērt debašu vidi jauniešiem visā valstī.',
    },
    note: {
      en: 'We do not accept card payments — please use a bank transfer to the account below.',
      lv: 'Maksājumu ar karti nepiedāvājam — ziedojumu var nosūtīt tikai ar bankas pārskaitījumu uz zemāk norādīto kontu.',
    },
    bank_title: { en: 'Bank details', lv: 'Bankas rekvizīti' },
    recipient: 'Biedrība "LOGUS Debate"',
    iban: 'LV00HABA0000000000000',
    bank: { en: 'Swedbank AS', lv: 'Swedbank AS' },
    bic: 'HABALV22',
    reference: { en: 'Donation / Support youth debate', lv: 'Ziedojums / Atbalsts jauniešu debatēm' },
    confirm_email: 'info@logusdebate.lv',
    impact: [
      { value: '1,247', label: { en: 'SUPPORTERS', lv: 'ATBALSTĪTĀJI' } },
      { value: '342', label: { en: 'DEBATES FUNDED', lv: 'FINANSĒTĀS DEBATES' } },
      { value: '89', label: { en: 'EVENTS HOSTED', lv: 'PASĀKUMI' } },
      { value: '16', label: { en: 'SCHOOLS REACHED', lv: 'SKOLAS' } },
    ],
  },
  archive: {
    hero_title: { en: 'Archive', lv: 'Arhīvs' },
    hero_intro: {
      en: 'LOGUS Debate history, yearbooks, and newsletters — milestones, stories, and photographs from our journey.',
      lv: 'LOGUS Debate vēsture, gadagrāmatas un apkārtraksti — stūrakmeņi, stāsti un fotogrāfijas no kopienas gaitas.',
    },
    gallery_title: { en: 'Archive photographs', lv: 'Arhīva fotogrāfijas' },
    gallery_lead: {
      en: 'A glimpse of tournaments, training, and community events — filter by year and month.',
      lv: 'Ieskats turnīros, treniņos un kopienas pasākumos — filtrējiet pēc gada un mēneša.',
    },
    photos_empty: {
      en: 'Photographs will be added soon.',
      lv: 'Fotogrāfijas drīzumā tiks pievienotas.',
    },
  },
  team_join: {
    title: { en: 'THINK YOU BELONG HERE?', lv: 'DOMĀ, KA TE IR TAVA VIETA?' },
    text: {
      en: "We're always looking for minds that refuse to accept easy answers. If you have the rigor, we have the platform.",
      lv: 'Mēs vienmēr meklējam prātus, kas nepieņem vieglas atbildes. Ja tev ir disciplīna, mums ir platforma.',
    },
    button: { en: 'APPLY TO JOIN', lv: 'PIESAKIES DALĪBAI' },
    quote: {
      en: 'DISCOMFORT IS THE PRECONDITION OF GROWTH',
      lv: 'NEĒRTĪBA IR IZAUGSMES PRIEKŠNOSACĪJUMS',
    },
  },
  archive_tabs: archiveTabs.map((tab) => ({
    id: tab.id,
    label: tab.label,
    intro: tab.intro,
    sections: tab.sections.map((section) => ({
      id: section.id,
      title: section.title,
      paragraphs: section.paragraphs,
    })),
  })),
}
