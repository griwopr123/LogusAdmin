export const PROJECT_IMAGE = '/project.jpg'

export interface ProjectItem {
  id: string
  image: string
  heroImage: string
  gallery: string[]
  funded: boolean
  title: { en: string; lv: string }
  excerpt: { en: string; lv: string }
  heroIntro: { en: string; lv: string }
  body: { en: string[]; lv: string[] }
}

export const projectsData: ProjectItem[] = [
  {
    id: 'youth-festival-marupe',
    image: PROJECT_IMAGE,
    heroImage: PROJECT_IMAGE,
    gallery: [PROJECT_IMAGE],
    funded: true,
    title: {
      en: 'Youth festival in Mārupe municipality',
      lv: 'Jauniešu svētki Mārupes novadā',
    },
    excerpt: {
      en: 'On 24 April participants joined a visit to explore how the European Union works in practice…',
      lv: '24. aprīlī dalībnieki piedalījās vizītē, kurā bija iespēja padziļināti iepazīt Eiropas Savienības darbību…',
    },
    heroIntro: {
      en: 'A youth engagement programme bringing together schools, local government, and LOGUS debaters.',
      lv: 'Jaunatnes iesaistes programma, kas apvieno skolas, pašvaldību un LOGUS debatētājus.',
    },
    body: {
      en: [
        'The project strengthens non-formal education for young people aged 13–25 through debate and civic dialogue.',
        'Activities included representative meetings, team training, and youth initiative projects supported by LOGUS mentors.',
      ],
      lv: [
        'Projekts stiprina neformālo izglītību jauniešiem vecumā no 13 līdz 25 gadiem, izmantojot debates un pilsonisko dialogu.',
        'Pasākumos notika pārstāvju tikšanās, komandu apmācības un jauniešu iniciatīvu projekti LOGUS mentoru atbalstā.',
      ],
    },
  },
  {
    id: 'visit-riga-98-school',
    image: PROJECT_IMAGE,
    heroImage: PROJECT_IMAGE,
    gallery: [PROJECT_IMAGE],
    funded: false,
    title: {
      en: 'Visit to Riga Secondary School No. 98',
      lv: 'Vizīte Rīgas 98. vidusskolā',
    },
    excerpt: {
      en: 'Debate demonstration and workshop for students — introduction to argumentation and BP format…',
      lv: 'Debašu demonstrācija un darbnīca skolēniem — ievads argumentācijā un BP formātā…',
    },
    heroIntro: {
      en: 'LOGUS coaches introduced debate as a tool for critical thinking during a full-day school visit.',
      lv: 'LOGUS treneri skolā iepazīstināja ar debatēm kā kritiskās domāšanas rīku.',
    },
    body: {
      en: [
        'Students took part in a shortened BP round and Q&A with experienced debaters.',
        'The school received materials to continue debate clubs with LOGUS support.',
      ],
      lv: [
        'Skolēni piedalījās saīsinātā BP raundā un jautājumu–atbilžu sesijā ar pieredzējušiem debatētājiem.',
        'Skola saņēma materiālus debašu pulciņu turpināšanai ar LOGUS atbalstu.',
      ],
    },
  },
  {
    id: 'visit-riga-21-school',
    image: PROJECT_IMAGE,
    heroImage: PROJECT_IMAGE,
    gallery: [PROJECT_IMAGE],
    funded: false,
    title: {
      en: 'School visit — Riga Secondary School No. 21',
      lv: 'Skolu vizīte Rīgas 21. vidusskolā',
    },
    excerpt: {
      en: 'Interactive sessions on public speaking, rebuttal, and structured argumentation…',
      lv: 'Interaktīvas nodarbības par publisko runu, atspēkošanu un strukturētu argumentāciju…',
    },
    heroIntro: {
      en: 'Partnership visit focused on making debate accessible to beginners and returning participants.',
      lv: 'Sadarbības vizīte, lai debates padarītu pieejamas iesācējiem un atgriežoties dalībniekiem.',
    },
    body: {
      en: [
        'Morning and afternoon workshops covered case-building and speaker roles.',
        'Teachers joined a short seminar on integrating debate into civics lessons.',
      ],
      lv: [
        'Rīta un pēcpusdienas darbnīcās apguva case sagatavošanu un runātāju lomas.',
        'Skolotāji piedalījās īsā seminārā par debašu integrēšanu pilsonības stundās.',
      ],
    },
  },
  {
    id: 'international-youth-policy-lv',
    image: PROJECT_IMAGE,
    heroImage: PROJECT_IMAGE,
    gallery: [PROJECT_IMAGE],
    funded: true,
    title: {
      en: 'International youth policy LV 3.0',
      lv: 'Starptautiskā jaunatnes politika LV 3.0',
    },
    excerpt: {
      en: 'Strengthening youth participation in policy-making through debate and media literacy…',
      lv: 'Jauniešu līdzdalības stiprināšana politikas veidošanā, izmantojot debates un medijpratību…',
    },
    heroIntro: {
      en: 'The project promotes informed civic participation and dialogue between youth and institutions.',
      lv: 'Projekts veicina informētu pilsonisko līdzdalību un dialogu starp jauniešiem un institūcijām.',
    },
    body: {
      en: [
        'The programme focuses on non-formal education for youth aged 13 to 25.',
        'Activities include representative meetings, team training, and media workshops led by LOGUS Debate.',
      ],
      lv: [
        'Programma koncentrējas uz neformālo izglītību jauniešiem vecumā no 13 līdz 25 gadiem.',
        'Pasākumos notiek pārstāvju tikšanās, komandu apmācības un mediju darbnīcas LOGUS Debate vadībā.',
      ],
    },
  },
  {
    id: 'debate-league-schools',
    image: PROJECT_IMAGE,
    heroImage: PROJECT_IMAGE,
    gallery: [PROJECT_IMAGE],
    funded: true,
    title: {
      en: 'School debate league',
      lv: 'Skolu debašu līga',
    },
    excerpt: {
      en: 'Season-long league connecting Riga schools with weekly rounds and trained adjudicators…',
      lv: 'Sezonas garumā notiekoša līga ar iknedēļas raundiem un sagatavotiem tiesnešiem…',
    },
    heroIntro: {
      en: 'Regular competitive debate for school teams — building skills and community.',
      lv: 'Regulāras sacensību debates skolu komandām — prasmju un kopienas veidošana.',
    },
    body: {
      en: [
        'Teams compete in age divisions with motions released before each round.',
        'LOGUS provides tab support, judge briefings, and training for new schools.',
      ],
      lv: [
        'Komandas sacenšas vecuma grupās; motions tiek publicēti pirms katra raunda.',
        'LOGUS nodrošina tab atbalstu, tiesnešu instrukcijas un apmācību jaunajām skolām.',
      ],
    },
  },
  {
    id: 'summer-debate-camp',
    image: PROJECT_IMAGE,
    heroImage: PROJECT_IMAGE,
    gallery: [PROJECT_IMAGE],
    funded: false,
    title: {
      en: 'Summer debate camp',
      lv: 'Vasaras debašu nometne',
    },
    excerpt: {
      en: 'Five-day intensive camp with national coaches — argumentation, BP strategy, and tournament simulation…',
      lv: 'Piecu dienu intensīva nometne ar valsts treneriem — argumentācija, BP stratēģija…',
    },
    heroIntro: {
      en: 'An immersive week for motivated debaters preparing for the autumn season.',
      lv: 'Iedziļināta nedēļa motivētiem debatētājiem rudens sezonas sagatavošanai.',
    },
    body: {
      en: [
        'Participants work in small groups on cases, rebuttal, and speaker strategy.',
        'Evening showcase rounds are open to parents and partners.',
      ],
      lv: [
        'Dalībnieki strādā mazās grupās pie case, atspēkošanas un runātāju stratēģijas.',
        'Vakara demonstrācijas raundi ir atvērti vecākiem un partneriem.',
      ],
    },
  },
]
