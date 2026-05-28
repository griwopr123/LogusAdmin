export interface PartnerItem {
  id: string
  category: { en: string; lv: string }
  name: { en: string; lv: string }
  description: { en: string; lv: string }
  url: string
}

export const partnersData: PartnerItem[] = [
  {
    id: 'british-council',
    category: { en: 'Education', lv: 'Izglītība' },
    name: { en: 'British Council Latvia', lv: 'British Council Latvia' },
    description: {
      en: 'International education and cultural partner supporting language, youth, and debate-related initiatives.',
      lv: 'Starptautisks izglītības un kultūras partneris, kas atbalsta valodu, jaunatnes un debatēm saistītas iniciatīvas.',
    },
    url: 'https://www.britishcouncil.lv/',
  },
  {
    id: 'jspa',
    category: { en: 'Youth Agency', lv: 'Jaunatnes aģentūra' },
    name: { en: 'JSPA', lv: 'JSPA' },
    description: {
      en: 'Agency for International Programs for Youth, supporting Erasmus+, youth policy, and project opportunities in Latvia.',
      lv: 'Jaunatnes starptautisko programmu aģentūra, kas atbalsta Erasmus+, jaunatnes politiku un projektu iespējas Latvijā.',
    },
    url: 'https://jaunatne.gov.lv/',
  },
  {
    id: 'marupe',
    category: { en: 'Municipality', lv: 'Pašvaldība' },
    name: { en: 'Mārupes Novads', lv: 'Mārupes novads' },
    description: {
      en: 'Local government partner for youth events, outreach activities, and community-based educational programmes.',
      lv: 'Pašvaldības partneris jauniešu pasākumiem, izbraukuma aktivitātēm un kopienā balstītām izglītības programmām.',
    },
    url: 'https://www.marupe.lv/',
  },
  {
    id: 'riga',
    category: { en: 'City', lv: 'Pilsēta' },
    name: { en: 'Riga City Municipality', lv: 'Rīgas valstspilsētas pašvaldība' },
    description: {
      en: 'Institutional partner for public events, civic education, and debate activities in Riga.',
      lv: 'Institucionāls partneris publiskajiem pasākumiem, pilsoniskajai izglītībai un debašu aktivitātēm Rīgā.',
    },
    url: 'https://www.riga.lv/en',
  },
  {
    id: 'lu',
    category: { en: 'University', lv: 'Universitāte' },
    name: { en: 'University of Latvia', lv: 'Latvijas Universitāte' },
    description: {
      en: 'Academic partner connecting debate with research, public speaking, and student development.',
      lv: 'Akadēmisks partneris, kas savieno debates ar pētniecību, publisko runu un studentu attīstību.',
    },
    url: 'https://www.lu.lv/',
  },
  {
    id: 'ep-latvia',
    category: { en: 'European Institution', lv: 'Eiropas institūcija' },
    name: { en: 'European Parliament Office in Latvia', lv: 'Eiropas Parlamenta birojs Latvijā' },
    description: {
      en: 'European civic engagement partner helping strengthen youth participation and democratic dialogue.',
      lv: 'Eiropas pilsoniskās līdzdalības partneris, kas palīdz stiprināt jauniešu iesaisti un demokrātisku dialogu.',
    },
    url: 'https://riga.europarl.europa.eu/lv',
  },
]
