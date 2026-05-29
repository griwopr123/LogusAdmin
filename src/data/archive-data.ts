export interface ArchiveSection {
  id: string
  title: { en: string; lv: string }
  paragraphs: { en: string[]; lv: string[] }
}

export interface ArchiveTab {
  id: string
  label: { en: string; lv: string }
  intro: { en: string; lv: string }
  sections: ArchiveSection[]
}

export interface ArchivePhoto {
  id: string
  src: string
  caption: { en: string; lv: string }
}

export const archiveTabs: ArchiveTab[] = [
  {
    id: 'history',
    label: { en: 'History', lv: 'Vēsture' },
    intro: {
      en: 'The story of LOGUS Debate — from first training sessions to national tournaments and an international community of debaters.',
      lv: 'LOGUS Debate stāsts — no pirmajām nodarbībām līdz valsts mēroga turnīriem un starptautiskai debatieru kopienai.',
    },
    sections: [
      {
        id: 'summary',
        title: { en: 'Summary', lv: 'Kopsavilkums' },
        paragraphs: {
          en: [
            'LOGUS Debate grew out of a simple idea: give young people in Latvia a serious, welcoming place to practise argumentation and public speaking. What began as weekly training in Riga became a club with its own calendar, coaches, and tournament culture.',
            'Today we run programmes for schools, open training, and competitive British Parliamentary (BP) events. Our archive collects milestones, people, and moments that shaped who we are.',
          ],
          lv: [
            'LOGUS Debate izauga no vienkāršas idejas — dot jauniešiem Latvijā nopietnu, atvērtu vietu argumentācijas un publiskās runas praksei. Tas, kas sākās kā iknedēļas treniņi Rīgā, kļuva par klubu ar savu kalendāru, treneriem un turnīru kultūru.',
            'Šodien mēs īstenojam programmas skolām, atvērtās apmācības un sacensību pasākumus British Parliamentary (BP) formātā. Arhīvā apkopoti stūrakmeņi, cilvēki un brīži, kas veidoja mūsu identitāti.',
          ],
        },
      },
      {
        id: 'first-steps',
        title: { en: 'First steps and growth', lv: 'Pirmie soļi un attīstība' },
        paragraphs: {
          en: [
            'Early seasons focused on fundamentals: case structure, speaker roles, and feedback culture. Small rounds in classrooms and community centres built confidence before larger public events.',
            'Volunteer mentors and returning debaters formed the core of the club — a pattern we still rely on when scaling programmes across age groups.',
          ],
          lv: [
            'Pirmajās sezonās uzsvars bija uz pamatiem: case struktūru, runātāju lomām un atgriezeniskās saites kultūru. Nelieli raundi klasēs un kopienas centros stiprināja pārliecību pirms lielākiem publiskiem pasākumiem.',
            'Brīvprātīgie mentori un atgriežoties debatieri veidoja kluba kodolu — principu, uz kuru mēs joprojām balstāmies, paplašinot programmas dažādās vecuma grupās.',
          ],
        },
      },
      {
        id: 'identity',
        title: { en: 'Identity and goals', lv: 'Identitātes un mērķu nostiprināšana' },
        paragraphs: {
          en: [
            'We articulated a clear mission: intellectual courage, respectful disagreement, and skills that transfer to school, university, and civic life. Branding, code of conduct, and judge training aligned around that mission.',
            'Partnerships with schools and youth organisations helped LOGUS Debate reach participants outside the capital and embed debate in local communities.',
          ],
          lv: [
            'Formulējām skaidru misiju: intelektuāla drosmība, cieņpilna iebildumu kultūra un prasmes, kas noder skolā, augstskolā un pilsoniskajā dzīvē. Zīmols, ētikas kodekss un tiesnešu apmācība tika saskaņoti ar šo virzienu.',
            'Sadarbība ar skolām un jaunatnes organizācijām palīdzēja LOGUS Debate sasniegt dalībniekus ārpus galvaspilsētas un iesakņot debašu kultūru vietējās kopienās.',
          ],
        },
      },
      {
        id: 'expansion',
        title: { en: 'Expansion and international work', lv: 'Paplašināšanās un starptautiskā sadarbība' },
        paragraphs: {
          en: [
            'Regional leagues, summer schools, and guest coaches from abroad raised the competitive bar. Teams began travelling to Nordic-Baltic and European events, bringing home practices we adapted for local formats.',
            'International friendships and judging exchanges remain one of the most valued outcomes of the club — beyond trophies and tab rankings.',
          ],
          lv: [
            'Reģionālās līgas, vasaras skolas un viestreneri no ārvalstīm paaugstināja sacensību līmeni. Komandas sāka ceļot uz Ziemeļvalstu–Baltijas un Eiropas pasākumiem, atvedot praksi, ko pielāgojām vietējiem formātiem.',
            'Starptautiskā draudzība un tiesāšanas apmaiņa joprojām ir viens no vērtētākajiem kluba rezultātiem — pāri trofejām un tab punktiem.',
          ],
        },
      },
      {
        id: 'challenges',
        title: { en: 'New challenges and achievements (2015–2020)', lv: 'Jauni izaicinājumi un sasniegumi (2015–2020)' },
        paragraphs: {
          en: [
            'Growing participation required better tab infrastructure, volunteer coordination, and financial sustainability. Fundraising, grants, and sponsor support kept flagship tournaments accessible.',
            'Online debate during disruption years proved the community could adapt quickly — hybrid formats now complement in-person championships.',
          ],
          lv: [
            'Pieaugošai dalībai bija nepieciešama labāka tab infrastruktūra, brīvprātīgo koordinācija un finansiāla noturība. Ziedojumi, granti un sponsoru atbalsts saglabāja galvenos turnīrus pieejamus.',
            'Tiešsaistes debates pārtraukumu gados pierādīja, ka kopiena spēj ātri pielāgoties — hibrīdformāti tagad papildina klātienes čempionātus.',
          ],
        },
      },
      {
        id: 'people',
        title: { en: 'People behind LOGUS Debate', lv: 'Cilvēki aiz LOGUS Debate' },
        paragraphs: {
          en: [
            'Coaches, tab volunteers, school coordinators, and alumni form a network that carries the club year after year. Many current trainers started as junior debaters in the same halls they now teach in.',
            'We document names and roles in annual reports; this archive honours the collective effort rather than a single founder narrative.',
          ],
          lv: [
            'Treneri, tab brīvprātīgie, skolu koordinatori un absolventi veido tīklu, kas gadu no gada uztur klubu. Daudzi pašreizējie treneri sāka kā junioru debatieri tajās pašās telpās, kur šodien māca citus.',
            'Vārdus un lomas fiksējam gada pārskatos; šis arhīvs godina kopējo pūliņu, nevis viena dibinātāja stāstu.',
          ],
        },
      },
      {
        id: 'vision',
        title: { en: 'Future vision', lv: 'Nākotnes vīzija' },
        paragraphs: {
          en: [
            'We aim to widen access — more school hubs, scholarships for travel, and materials in both Latvian and English. Quality judging and inclusive community standards stay non-negotiable.',
            'This archive will grow with new photos, yearbooks, and newsletters as each season closes. Your memories belong here too.',
          ],
          lv: [
            'Mērķis ir plašāka pieejamība — vairāk skolu centru, stipendijas ceļošanai un materiāli latviešu un angļu valodā. Kvalitatīva tiesāšana un iekļaujoša kopiena paliek neaizskaramas vērtības.',
            'Arhīvs papildināsies ar jaunām fotogrāfijām, gadagrāmatām un apkārtrakstiem pēc katras sezonas. Arī tavas atmiņas ir šeit vietā.',
          ],
        },
      },
    ],
  },
  {
    id: 'yearbooks',
    label: { en: 'Yearbooks', lv: 'Gadagrāmatas' },
    intro: {
      en: 'Annual publications summarising tournaments, training highlights, and club statistics. PDF editions will be linked here as they are digitised.',
      lv: 'Gada izdevumi ar turnīru kopsavilkumiem, treniņu aktualitātēm un kluba statistiku. PDF versijas tiks pievienotas, kad būs digitalizētas.',
    },
    sections: [
      {
        id: 'yearbooks-list',
        title: { en: 'Available editions', lv: 'Pieejamie izdevumi' },
        paragraphs: {
          en: [
            'Yearbooks from recent seasons are being prepared for upload. Check back soon or contact us if you have a printed copy to share for scanning.',
          ],
          lv: [
            'Pēdējo sezonu gadagrāmatas tiek sagatavotas publicēšanai tiešsaistē. Atgriezieties drīzumā vai sazinieties, ja jums ir drukāts eksemplārs skenēšanai.',
          ],
        },
      },
    ],
  },
  {
    id: 'newsletters',
    label: { en: 'Newsletters', lv: 'Apkārtraksti' },
    intro: {
      en: 'Seasonal newsletters with announcements, tournament calendars, and essays from coaches and debaters.',
      lv: 'Sezonas apkārtraksti ar paziņojumiem, turnīru kalendāriem un eseju fragmentiem no treneriem un debatieriem.',
    },
    sections: [
      {
        id: 'newsletters-list',
        title: { en: 'Newsletter archive', lv: 'Apkārtrakstu arhīvs' },
        paragraphs: {
          en: [
            'Older circulars are archived internally. Public excerpts will appear in this section — follow our news page for the latest updates in the meantime.',
          ],
          lv: [
            'Senāki apkārtraksti glabājas iekšējā arhīvā. Publiski fragmenti tiks publicēti šajā sadaļā — jaunākos jaunumus skatiet jaunumu lapā.',
          ],
        },
      },
    ],
  },
]

export const archivePhotos: ArchivePhoto[] = [
  {
    id: 'photo-1',
    src: '/bg-image.jpg',
    caption: { en: 'Training session, Riga', lv: 'Treniņš, Rīga' },
  },
  {
    id: 'photo-2',
    src: '/about.jpg',
    caption: { en: 'Tournament day', lv: 'Turnīra diena' },
  },
  {
    id: 'photo-3',
    src: '/bg-image.jpg',
    caption: { en: 'Team briefing before rounds', lv: 'Komandas sapulce pirms raundiem' },
  },
  {
    id: 'photo-4',
    src: '/about.jpg',
    caption: { en: 'Awards ceremony', lv: 'Apbalvošanas ceremonija' },
  },
  {
    id: 'photo-5',
    src: '/bg-image.jpg',
    caption: { en: 'Summer debate school', lv: 'Vasaras debašu skola' },
  },
  {
    id: 'photo-6',
    src: '/about.jpg',
    caption: { en: 'Community gathering', lv: 'Kopienas tikšanās' },
  },
]
