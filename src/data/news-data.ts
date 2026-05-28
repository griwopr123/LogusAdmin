/** Mock posts — later replace with Instagram API / embed feed */
export const NEWS_IMAGE = '/news.avif'

export interface NewsItem {
  id: string
  date: string
  image: string
  instagramUrl?: string
  title: { en: string; lv: string }
  excerpt: { en: string; lv: string }
  body: { en: string; lv: string }
}

export const newsData: NewsItem[] = [
  {
    id: 'junior-championship-2026',
    date: '2026-05-10',
    image: NEWS_IMAGE,
    instagramUrl: 'https://www.instagram.com/',
    title: {
      en: 'Junior Championship registration is open',
      lv: 'Atklāta Jaunioru čempionāta reģistrācija',
    },
    excerpt: {
      en: 'Sign up for Latvia\'s largest youth debate championship — British Parliamentary format, Riga.',
      lv: 'Piesakies Latvijas lielākajam jauniešu debašu čempionātam — British Parliamentary formāts, Rīga.',
    },
    body: {
      en: 'Registration for the Junior Debate Championship is now open. The tournament brings together debaters from across Latvia for two days of competitive British Parliamentary rounds, training sessions, and feedback from experienced judges. Early registration is recommended — places are limited. Follow us on Instagram for live updates, photos, and behind-the-scenes content from the LOGUS community.',
      lv: 'Jaunioru Debašu Čempionāta reģistrācija ir atklāta. Turnīrs apvieno debatierus no visas Latvijas divām sacensību dienām British Parliamentary formātā, treniņiem un atgriezenisko saiti no pieredzējušiem tiesnešiem. Ieteicams reģistrēties laikus — vietu skaits ir ierobežots. Seko mums Instagram, lai saņemtu jaunumus, foto un ieskatu LOGUS kopienā.',
    },
  },
  {
    id: 'summer-school-announcement',
    date: '2026-04-22',
    image: NEWS_IMAGE,
    instagramUrl: 'https://www.instagram.com/',
    title: {
      en: 'Summer Debate School — dates announced',
      lv: 'Paziņotas Vasaras debašu skolas datumi',
    },
    excerpt: {
      en: 'Five intensive days of argumentation, rebuttal, and public speaking in June.',
      lv: 'Piecas intensīvas dienas ar argumentāciju, atspēkošanu un publisko runu jūnijā.',
    },
    body: {
      en: 'We are pleased to announce the Summer Debate School programme for June. Participants will work with national and international coaches on case preparation, speaker roles, and tournament strategy. The school is open to motivated beginners and returning debaters. Full schedule and application details are shared on our Instagram — stay tuned for daily stories during the event week.',
      lv: 'Ar prieku paziņojam Vasaras Debašu Skolas programmu jūnijam. Dalībnieki strādās ar valsts un starptautiskiem treneriem pie case sagatavošanas, runātāju lomām un turnīru stratēģijas. Skola ir atvērta motivētiem iesācējiem un atgriežoties debatieriem. Pilns grafiks un pieteikuma informācija tiek publicēta Instagram — seko stāstiem pasākuma nedēļā.',
    },
  },
  {
    id: 'league-friday-kickoff',
    date: '2026-04-05',
    image: NEWS_IMAGE,
    instagramUrl: 'https://www.instagram.com/',
    title: {
      en: 'Friday league nights are back',
      lv: 'Atgriežas piektdienas līgas vakari',
    },
    excerpt: {
      en: 'Weekly practice debates for youth — join any Friday at LOGUS Centre.',
      lv: 'Iknedēļas treniņdebates jauniešiem — pievienojies jebkurā piektdienā LOGUS centrā.',
    },
    body: {
      en: 'The autumn league format continues with Friday evening rounds at LOGUS Centre. Age divisions 14–16 and 17–19 ensure fair match-ups; newcomers receive a short intro before their first round. No prior tournament experience required. Check Instagram for pairings, motion releases, and community highlights after each night.',
      lv: 'Rudens līgas formāts turpinās ar piektdienas vakara raundiem LOGUS centrā. Vecuma grupas 14–16 un 17–19 nodrošina taisnīgas sacensības; jaunie dalībnieki pirms pirmā raunda saņem īsu ievadu. Iepriekšēja turnīru pieredze nav obligāta. Instagram publicējam pārus, motions un kopienu pēc katras nakts.',
    },
  },
  {
    id: 'nordic-baltic-open-media',
    date: '2026-03-18',
    image: NEWS_IMAGE,
    instagramUrl: 'https://www.instagram.com/',
    title: {
      en: 'Nordic-Baltic Open — call for volunteers',
      lv: 'Ziemeļvalstu–Baltijas atklātais — brīvprātīgo aicinājums',
    },
    excerpt: {
      en: 'Help run the international tournament in Riga this November.',
      lv: 'Palīdzi rīkot starptautisko turnīru Rīgā šī gada novembrī.',
    },
    body: {
      en: 'LOGUS Debate is hosting the Nordic-Baltic Debate Open and looking for volunteers in tab, media, and hospitality roles. This is a great opportunity to see high-level BP debate up close and meet teams from across the region. Training is provided. Apply via email or DM on Instagram; selected volunteers will be announced on our news feed.',
      lv: 'LOGUS Debate rīko Ziemeļvalstu–Baltijas Debašu Atklāto un meklē brīvprātīgos tab, mediju un viesmīlības lomās. Lieliska iespēja redzēt augsta līmeņa BP debates un iepazīt komandas no reģiona. Apmācība tiek nodrošināta. Pieteikties pa e-pastu vai Instagram DM; izvēlētos publicēsim jaunumu sadaļā.',
    },
  },
]
