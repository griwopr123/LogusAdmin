export interface EventItem {
  id: string
  date: string        // e.g. "2026-05-23"
  day: string
  month: { en: string; lv: string }
  year: string
  title: { en: string; lv: string }
  description: { en: string; lv: string }
  location: { en: string; lv: string }
  category: string    // e.g. "championship", "workshop", "online", "camp"
  image?: string
  googleMapsUrl?: string
  format?: { en: string; lv: string }
}

export const eventsData: EventItem[] = [
  {
    id: 'junior-championship',
    date: '2026-05-23',
    day: '23',
    month: { en: 'MAY', lv: 'MAIJS' },
    year: '2026',
    title: { en: 'Junior Debate Championship', lv: 'Jaunioru Debašu Čempionāts' },
    description: {
      en: 'The largest debate championship in Latvia where young people from across the country compete in British Parliamentary format. Over 200 participants expected.',
      lv: 'Lielākais debašu čempionāts Latvijā, kurā piedalās jaunieši no visas valsts British Parliamentary formātā. Gaidāmi vairāk nekā 200 dalībnieki.',
    },
    location: { en: 'Riga Congress Centre, Riga', lv: 'Rīgas Kongresu nams, Rīga' },
    category: 'championship',
  },
  {
    id: 'summer-debate-school',
    date: '2026-06-18',
    day: '18',
    month: { en: 'JUNE', lv: 'JŪNIJS' },
    year: '2026',
    title: { en: 'Summer Debate School', lv: 'Vasaras Debašu Skola' },
    description: {
      en: 'An intensive 5-day course for young debaters. Learn argumentation, rebuttal strategies, and public speaking from experienced instructors and international specialists.',
      lv: 'Intensīvs 5 dienu kurss jaunajiem debatieriem. Apgūsti argumentāciju, atspēkošanas stratēģijas un publisko runu no pieredzējušiem instruktoriem.',
    },
    location: { en: 'University of Latvia, Riga', lv: 'Latvijas Universitāte, Rīga' },
    category: 'workshop',
  },
  {
    id: 'online-debate-series',
    date: '2026-07-05',
    day: '05',
    month: { en: 'JULY', lv: 'JŪLIJS' },
    year: '2026',
    title: { en: 'Online Debate Series', lv: 'Online Debašu Sērija' },
    description: {
      en: 'Weekly online sessions perfect for improving your debate skills from anywhere. Open to all levels — beginners and advanced debaters welcome.',
      lv: 'Iknedēļas tiešsaistes sesijas, kas ideālas prasmju pilnveidošanai no jebkuras vietas. Atvērts visiem līmeņiem.',
    },
    location: { en: 'Online (Zoom)', lv: 'Tiešsaistē (Zoom)' },
    category: 'online',
  },
  {
    id: 'international-debate-camp',
    date: '2026-07-20',
    day: '20',
    month: { en: 'JULY', lv: 'JŪLIJS' },
    year: '2026',
    title: { en: 'International Debate Camp', lv: 'Starptautiskā Debašu Nometne' },
    description: {
      en: 'A week-long residential camp bringing together debaters from 15+ countries. Expand your horizons, build international friendships, and compete at the highest level.',
      lv: 'Nedēļu ilga nometne, kas apvieno debatierus no 15+ valstīm. Paplašini redzesloku, izveido starptautiskas draudzības.',
    },
    location: { en: 'Sigulda, Latvia', lv: 'Sigulda, Latvija' },
    category: 'camp',
  },
  {
    id: 'teacher-seminar',
    date: '2026-08-12',
    day: '12',
    month: { en: 'AUG', lv: 'AUG' },
    year: '2026',
    title: { en: 'Debate Seminar for Teachers', lv: 'Debašu Seminārs Skolotājiem' },
    description: {
      en: 'Specially designed classes for educators who want to introduce debate methodology in their schools. Certified by the National Centre for Education.',
      lv: 'Speciāli izstrādātas mācības pedagogiem, kas vēlas ieviest debašu metodiku savās skolās. Sertificēts VISC.',
    },
    location: { en: 'National Library, Riga', lv: 'Nacionālā Bibliotēka, Rīga' },
    category: 'workshop',
  },
  {
    id: 'autumn-league',
    date: '2026-09-05',
    day: '05',
    month: { en: 'SEP', lv: 'SEP' },
    year: '2026',
    title: { en: 'Autumn League Opening', lv: 'Rudens Līgas Atklāšana' },
    description: {
      en: 'The regular debate league kicks off! Compete every Friday evening with peers in your age group. Divisions for 14-16 and 17-19 year olds.',
      lv: 'Regulārā debašu līga sākas! Sacensties katru piektdienas vakaru ar vienaudžiem. Grupas 14-16 un 17-19 gadu vecumā.',
    },
    location: { en: 'LOGUS Centre, Riga', lv: 'LOGUS Centrs, Rīga' },
    category: 'championship',
  },
  {
    id: 'public-speaking-masterclass',
    date: '2026-09-20',
    day: '20',
    month: { en: 'SEP', lv: 'SEP' },
    year: '2026',
    title: { en: 'Public Speaking Masterclass', lv: 'Publiskās Runas Meistarklase' },
    description: {
      en: 'An exclusive masterclass with renowned public speaking coach Sarah Mitchell. Learn body language, vocal variety, and persuasion techniques.',
      lv: 'Ekskluzīva meistarklase ar atzītu publiskās runas treneri. Apgūsti ķermeņa valodu, vokālo daudzveidību un pārliecināšanas tehnikas.',
    },
    location: { en: 'Splendid Palace, Riga', lv: 'Splendid Palace, Rīga' },
    category: 'workshop',
  },
  {
    id: 'debate-hackathon',
    date: '2026-10-10',
    day: '10',
    month: { en: 'OCT', lv: 'OKT' },
    year: '2026',
    title: { en: 'Debate Hackathon', lv: 'Debašu Hakatons' },
    description: {
      en: '24-hour non-stop debate marathon! Teams tackle real-world policy issues and present solutions to a panel of experts. Prizes for top 3 teams.',
      lv: '24 stundu nepārtraukts debašu maratons! Komandas risina reālas politikas problēmas un prezentē risinājumus ekspertu žūrijai.',
    },
    location: { en: 'TechHub Riga', lv: 'TechHub Rīga' },
    category: 'championship',
  },
  {
    id: 'nordic-baltic-open',
    date: '2026-11-15',
    day: '15',
    month: { en: 'NOV', lv: 'NOV' },
    year: '2026',
    title: { en: 'Nordic-Baltic Debate Open', lv: 'Ziemeļvalstu-Baltijas Debašu Atklātais' },
    description: {
      en: 'A prestigious international tournament featuring teams from all Nordic and Baltic countries. Two days of high-level competitive debate.',
      lv: 'Prestižs starptautisks turnīrs ar komandām no visām Ziemeļvalstīm un Baltijas valstīm. Divas augsta līmeņa sacensību dienas.',
    },
    location: { en: 'Radisson Blu, Riga', lv: 'Radisson Blu, Rīga' },
    category: 'championship',
  },
  {
    id: 'winter-intensive',
    date: '2026-12-20',
    day: '20',
    month: { en: 'DEC', lv: 'DEC' },
    year: '2026',
    title: { en: 'Winter Intensive Workshop', lv: 'Ziemas Intensīvais Seminārs' },
    description: {
      en: 'A 3-day intensive workshop during winter break. Perfect for preparing for the spring championship season. Includes mock debates and coaching.',
      lv: '3 dienu intensīvs seminārs ziemas brīvlaikā. Ideāli piemērots gatavošanai pavasara čempionātu sezonai. Iekļauj treniņdebates.',
    },
    location: { en: 'LOGUS Centre, Riga', lv: 'LOGUS Centrs, Rīga' },
    category: 'workshop',
  },
]
