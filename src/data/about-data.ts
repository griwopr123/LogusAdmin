export interface AboutPillar {
  id: string
  title: { en: string; lv: string }
  text: { en: string; lv: string }
}

export interface AboutValue {
  id: string
  title: { en: string; lv: string }
  text: { en: string; lv: string }
}

export const aboutPillars: AboutPillar[] = [
  {
    id: 'training',
    title: { en: 'Training', lv: 'Treniņi' },
    text: {
      en: 'Weekly sessions with structured cases, speaker roles, and mentor feedback for all levels.',
      lv: 'Iknedēļas nodarbības ar strukturētiem case, runātāju lomām un mentoru atgriezenisko saiti visiem līmeņiem.',
    },
  },
  {
    id: 'tournaments',
    title: { en: 'Tournaments', lv: 'Turnīri' },
    text: {
      en: 'Junior championships, open leagues, and international invitations in British Parliamentary format.',
      lv: 'Jaunioru čempionāti, atvērtās līgas un starptautiski ielūgumi British Parliamentary formātā.',
    },
  },
  {
    id: 'mentoring',
    title: { en: 'Mentoring', lv: 'Mentorings' },
    text: {
      en: 'Personal growth plans, tab training, and pathways from first round to national teams.',
      lv: 'Personīgās izaugsmes plāni, tab apmācība un ceļš no pirmā raunda līdz valsts komandām.',
    },
  },
  {
    id: 'community',
    title: { en: 'Community', lv: 'Kopiena' },
    text: {
      en: 'An inclusive club in Riga and beyond — schools, volunteers, and alumni stay connected.',
      lv: 'Iekļaujošs klubs Rīgā un ārpus tās — skolas, brīvprātīgie un absolventi paliek saistīti.',
    },
  },
]

export const aboutValues: AboutValue[] = [
  {
    id: 'rigour',
    title: { en: 'Intellectual rigour', lv: 'Intelektuāla stingrība' },
    text: {
      en: 'We take argument seriously — evidence, structure, and respectful rebuttal matter more than volume.',
      lv: 'Argumentu uztveram nopietni — pierādījumi, struktūra un cieņpilna atspēkošana ir svarīgāka par skaļumu.',
    },
  },
  {
    id: 'access',
    title: { en: 'Open access', lv: 'Atvērta pieeja' },
    text: {
      en: 'Motivated beginners are welcome. We provide intro sessions before competitive rounds.',
      lv: 'Motivēti iesācēji ir laipni gaidīti. Pirms sacensību raundiem nodrošinām ievada nodarbības.',
    },
  },
  {
    id: 'growth',
    title: { en: 'Long-term growth', lv: 'Ilgtermiņa izaugsme' },
    text: {
      en: 'Skills built in debate transfer to school, university, careers, and civic participation.',
      lv: 'Debatēs iegūtās prasmes noder skolā, augstskolā, karjerā un pilsoniskajā dzīvē.',
    },
  },
]

export const aboutStats = [
  { value: '200+', label: { en: 'Active debaters yearly', lv: 'Aktīvi debatieri gadā' } },
  { value: 'BP', label: { en: 'Core tournament format', lv: 'Galvenais turnīru formāts' } },
  { value: 'Riga', label: { en: 'Home base & outreach', lv: 'Bāze un izbraukums' } },
]
