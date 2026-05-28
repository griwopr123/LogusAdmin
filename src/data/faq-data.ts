export interface FaqItem {
  id: string
  question: { en: string; lv: string }
  answer: { en: string; lv: string }
}

export const faqData: FaqItem[] = [
  {
    id: 'who-can-join',
    question: {
      en: 'Who can join LOGUS Debate?',
      lv: 'Kas var pievienoties LOGUS Debate?',
    },
    answer: {
      en: 'We welcome young people and students who want to develop argumentation and public speaking. Sessions are grouped by age and experience — beginners are always welcome.',
      lv: 'Mēs aicinām jauniešus un studentus, kas vēlas attīstīt argumentāciju un publisko runu. Nodarbības tiek grupētas pēc vecuma un pieredzes — iesācēji vienmēr ir laipni gaidīti.',
    },
  },
  {
    id: 'experience',
    question: {
      en: 'Do I need prior debate experience?',
      lv: 'Vai man ir nepieciešama iepriekšēja debašu pieredze?',
    },
    answer: {
      en: 'No. We run introductory sessions and mentor support so you can start from zero. Many members began without any tournament background.',
      lv: 'Nē. Mēs rīkojam ievada nodarbības un nodrošinām mentoru atbalstu, lai varētu sākt no nulles. Daudzi dalībnieki sāka bez turnīru pieredzes.',
    },
  },
  {
    id: 'format',
    question: {
      en: 'What debate format do you use?',
      lv: 'Kādu debašu formātu jūs izmantojat?',
    },
    answer: {
      en: 'Our main format is British Parliamentary (BP). Training also covers argument structure, rebuttal, and speaker roles used in international competitions.',
      lv: 'Galvenais formāts ir British Parliamentary (BP). Treniņos apgūst arī argumentu struktūru, atspēkošanu un runātāju lomas, ko izmanto starptautiskās sacensībās.',
    },
  },
  {
    id: 'register',
    question: {
      en: 'How do I register for training or events?',
      lv: 'Kā pieteikties treniņiem vai pasākumiem?',
    },
    answer: {
      en: 'Send an email to info@logusdebate.lv with your name, age, and whether you are interested in regular training or a specific event. We will reply with the next steps and schedule.',
      lv: 'Nosūti e-pastu uz info@logusdebate.lv ar vārdu, vecumu un to, vai interesē regulāri treniņi vai konkrēts pasākums. Atbildēsim ar nākamajiem soļiem un grafiku.',
    },
  },
  {
    id: 'cost',
    question: {
      en: 'Are sessions free or paid?',
      lv: 'Vai nodarbības ir bezmaksas vai maksas?',
    },
    answer: {
      en: 'LOGUS offers both free community programmes and paid intensive courses or tournaments. Details are announced per season — ask us by email for current options.',
      lv: 'LOGUS piedāvā gan bezmaksas kopienas programmas, gan maksas intensīvos kursus vai turnīrus. Informācija tiek publicēta katrā sezonā — pa e-pastu vari uzzināt aktuālās iespējas.',
    },
  },
  {
    id: 'age',
    question: {
      en: 'What age groups do you work with?',
      lv: 'Ar kādām vecuma grupām jūs strādājat?',
    },
    answer: {
      en: 'We organise groups for different ages, typically from around 14 upwards. League nights and championships specify age divisions (e.g. 14–16 and 17–19).',
      lv: 'Organizējam grupas dažādiem vecumiem, parasti no aptuveni 14 gadiem. Līgas vakari un čempionāti norāda vecuma divīzijas (piem., 14–16 un 17–19).',
    },
  },
  {
    id: 'location',
    question: {
      en: 'Where do sessions take place?',
      lv: 'Kur notiek nodarbības?',
    },
    answer: {
      en: 'Most in-person activities are in Riga at LOGUS Centre or partner venues. Some programmes run online — check the Events page or contact us for the current location.',
      lv: 'Lielākā daļa klātienes aktivitāšu notiek Rīgā LOGUS centrā vai partneru telpās. Daļa programmu notiek tiešsaistē — skaties Pasākumu sadaļu vai raksti mums par aktuālo vietu.',
    },
  },
  {
    id: 'events-list',
    question: {
      en: 'Where can I see upcoming tournaments and workshops?',
      lv: 'Kur redzēt gaidāmos turnīrus un seminārus?',
    },
    answer: {
      en: 'Visit the Events section on this website for dates and registration. Major announcements also appear in News and on our Instagram.',
      lv: 'Apmeklē šīs mājaslapas sadaļu Pasākumi, lai redzētu datumus un reģistrāciju. Svarīgi paziņojumi arī Jaunumos un mūsu Instagram.',
    },
  },
  {
    id: 'schools',
    question: {
      en: 'Can schools or teachers collaborate with LOGUS?',
      lv: 'Vai skolas vai skolotāji var sadarboties ar LOGUS?',
    },
    answer: {
      en: 'Yes. We work with schools on debate programmes, teacher seminars, and guest workshops. Email sadarbiba@logusdebate.lv or the general address with your proposal.',
      lv: 'Jā. Sadarbojamies ar skolām pie debašu programmām, skolotāju semināriem un viesnodarbībām. Raksti uz sadarbiba@logusdebate.lv vai uz vispārējo e-pastu ar savu ideju.',
    },
  },
]

export const FAQ_EMAIL = 'info@logusdebate.lv'
