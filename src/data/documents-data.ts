export type DocumentCategory = 'statutes' | 'reports'

export interface DocumentItem {
  id: string
  category: DocumentCategory
  title: { en: string; lv: string }
  excerpt: { en: string; lv: string }
  place: { en: string; lv: string }
  issueDate: string
  sectionTitle: { en: string; lv: string }
  content: { en: string[]; lv: string[] }
}

export const documentCategories: { id: DocumentCategory; label: { en: string; lv: string } }[] = [
  { id: 'statutes', label: { en: 'Bylaws', lv: 'Statūti' } },
  { id: 'reports', label: { en: 'Annual reports', lv: 'Gada pārskati' } },
]

export const documentsData: DocumentItem[] = [
  {
    id: 'statutes',
    category: 'statutes',
    title: { en: 'Bylaws', lv: 'Statūti' },
    excerpt: {
      en: 'Defines the association’s legal framework, mission, objectives, and members’ rights and obligations.',
      lv: 'Nosaka biedrības juridisko ietvaru, misiju, mērķus, biedru pienākumus un tiesības.',
    },
    place: { en: 'Riga', lv: 'Rīga' },
    issueDate: '04.02.2026.',
    sectionTitle: { en: 'Purpose', lv: 'Mērķis' },
    content: {
      en: [
        'These bylaws govern the association “LOGUS Debate”, registered in the Republic of Latvia. The association is a non-profit organisation whose purpose is to promote debate, critical thinking, and civic education among young people.',
        'The association’s mission is to provide high-quality training, organise tournaments and educational events, and build an inclusive community of debaters in Latvia and internationally.',
        'Membership is open to natural persons who support the association’s objectives and accept these bylaws. Members have the right to participate in general meetings, elect the board, and use association resources in accordance with internal regulations.',
        'Members must act in good faith, comply with the code of ethics, pay membership fees when established by the general meeting, and refrain from actions that harm the association’s reputation or legal interests.',
        'The supreme governing body is the general meeting of members. The general meeting approves annual reports, elects and recalls board members, amends the bylaws, and decides on major financial and strategic matters.',
        'The board manages day-to-day operations, represents the association, opens bank accounts, enters contracts, and executes decisions of the general meeting. The board consists of at least three members elected for a term of two years.',
        'Financial resources consist of membership fees, donations, grants, programme income, and other lawful receipts. The association maintains accounting records and prepares annual financial statements in accordance with applicable law.',
        'Amendments to these bylaws require a two-thirds majority of votes at a general meeting with a quorum of at least half of all members. Dissolution of the association is decided by the general meeting and carried out according to Latvian law.',
        'Matters not regulated herein are governed by the laws of the Republic of Latvia. The Latvian text of these bylaws prevails in case of discrepancy between language versions.',
      ],
      lv: [
        'Šie statūti regulē biedrību “LOGUS Debate”, kas reģistrēta Latvijas Republikā. Biedrība ir bezpeļņas organizācija, kuras mērķis ir veicināt debates, kritisko domāšanu un pilsonisko izglītību jauniešu vidū.',
        'Biedrības misija ir nodrošināt augstas kvalitātes apmācības, rīkot turnīrus un izglītojošus pasākumus, kā arī veidot iekļaujošu debatētāju kopienu Latvijā un starptautiski.',
        'Biedri var būt fiziskas personas, kas atbalsta biedrības mērķus un piekrīt šiem statūtiem. Biedriem ir tiesības piedalīties kopsapulcēs, vēlēt valdi un izmantot biedrības resursus saskaņā ar iekšējiem noteikumiem.',
        'Biedriem jārīkojas labā ticībā, jāievēro ētikas kodekss, jāmaksā biedru nauda, ja to nosaka kopsapulce, un jāatturas no darbībām, kas kaitē biedrības reputācijai vai likumīgajām interesēm.',
        'Augstākā pārvaldes institūcija ir biedru kopsapulce. Kopsapulce apstiprina gada pārskatus, ievēlē un atsauc valdes locekļus, groza statūtus un lemj par būtiskiem finanšu un stratēģijas jautājumiem.',
        'Valde vada ikdienas darbu, pārstāv biedrību, atver bankas kontus, noslēdz līgumus un izpilda kopsapulces lēmumus. Valdē ir vismaz trīs locekļi, kas ievēlēti uz diviem gadiem.',
        'Finanšu līdzekļi sastāv no biedru naudas, ziedojumiem, grantiem, programmu ieņēmumiem un citiem likumīgiem ieņēmumiem. Biedrība uztur grāmatvedības uzskaiti un sagatavo gada finanšu pārskatus atbilstoši normatīvajiem aktiem.',
        'Statūtu grozījumiem nepieciešams divu trešdaļu balsu vairākums kopsapulcē, kurā piedalās vismaz puse no visiem biedriem. Biedrības likvidāciju lemj kopsapulce un veic saskaņā ar Latvijas likumiem.',
        'Jautājumus, kas nav reglamentēti šajos statūtos, nosaka Latvijas Republikas likumi. Pretrunu gadījumā starp valodu versijām noteicošā ir latviešu valodas redakcija.',
      ],
    },
  },
  {
    id: 'ethics-code',
    category: 'statutes',
    title: { en: 'Code of ethics', lv: 'Ētikas kodekss' },
    excerpt: {
      en: 'Professional ethics guidelines for everyone representing LOGUS Debate.',
      lv: 'Profesionālās ētikas vadlīnijas visiem, kas pārstāv LOGUS Debate.',
    },
    place: { en: 'Riga', lv: 'Rīga' },
    issueDate: '12.02.2026.',
    sectionTitle: { en: 'General principles', lv: 'Vispārīgie principi' },
    content: {
      en: [
        'This code of ethics applies to employees, board and council members, members, candidates, alumni, volunteers, and visitors at LOGUS Debate events.',
        'We are committed to respect, dignity, and equal treatment regardless of background, gender, age, disability, or opinion. Harassment, discrimination, and bullying are prohibited in any form.',
        'Adults working with youth must prioritise safeguarding. Concerns about a young person’s welfare must be reported promptly to designated safeguarding contacts.',
        'Conflicts of interest must be disclosed before decisions are made. Board members and staff may not use their position for personal financial gain or unfair advantage.',
        'Public communication on behalf of the association must be accurate and responsible. Personal social media must not be presented as official LOGUS Debate policy unless authorised.',
        'Participants at tournaments and training must follow event rules, respect judges and opponents, and accept decisions through proper channels rather than public disputes.',
        'Breaches of this code may result in warnings, suspension from events, termination of membership, or referral to authorities where required by law.',
      ],
      lv: [
        'Šis ētikas kodekss attiecas uz darbiniekiem, valdes un padomes locekļiem, biedriem, kandidātiem, vecbiedriem, brīvprātīgajiem un pasākumu apmeklētājiem.',
        'Mēs esam apņēmušies ievērot cieņu, godu un vienlīdzīgu attieksmi neatkarīgi no izcelsmes, dzimuma, vecuma, invaliditātes vai viedokļa. Aizskaršana, diskriminācija un mobings jebkurā formā ir aizliegts.',
        'Pieaugušajiem, kas strādā ar jauniešiem, prioritāte ir aizsardzība. Bažas par jaunieša labklājību nekavējoties jāziņo norīkotajām aizsardzības kontaktpersonām.',
        'Interešu konflikti jāatklāj pirms lēmumu pieņemšanas. Valdes locekļi un darbinieki nedrīkst izmantot amatu personīgam finansiālam labumam vai negodīgai priekšrocībai.',
        'Publiskajai komunikācijai biedrības vārdā jābūt precīzai un atbildīgai. Personīgos sociālos tīklus nedrīkst pasniegt kā oficiālu LOGUS Debate politiku bez pilnvarojuma.',
        'Turnīru un treniņu dalībniekiem jāievēro pasākuma noteikumi, jāciena tiesneši un pretinieki, un lēmumi jāapstrīd tikai noteiktajā kārtībā.',
        'Kodeksa pārkāpumi var izraisīt brīdinājumu, diskvalifikāciju no pasākumiem, biedrības izslēgšanu vai ziņošanu institūcijām, ja to prasa likums.',
      ],
    },
  },
  {
    id: 'internal-rules',
    category: 'statutes',
    title: { en: 'Internal regulations', lv: 'Iekšējās kārtības noteikumi' },
    excerpt: {
      en: 'Operational rules for meetings, voting, and day-to-day governance.',
      lv: 'Darbības noteikumi sapulcēm, balsošanai un ikdienas pārvaldībai.',
    },
    place: { en: 'Riga', lv: 'Rīga' },
    issueDate: '18.02.2026.',
    sectionTitle: { en: 'Scope', lv: 'Piemērošanas joma' },
    content: {
      en: [
        'These internal regulations supplement the bylaws of LOGUS Debate and apply to all meetings of the board, committees, and general assemblies unless otherwise decided.',
        'Meetings are convened by the board chair with at least seven days’ notice for ordinary meetings and forty-eight hours for urgent matters. The notice includes date, time, location or link, and draft agenda.',
        'A quorum for the board is a majority of elected members. For the general meeting, quorum is half of all members unless the bylaws specify a higher threshold for particular decisions.',
        'Decisions are adopted by simple majority of votes present unless the bylaws require a qualified majority. The chair has a casting vote in the event of a tie on procedural matters.',
        'Minutes are kept for all formal meetings and approved at the following session. Members may request corrections within fourteen days of distribution.',
        'Committees may be established for finance, programmes, safeguarding, and communications. Committee mandates and budgets are approved annually by the board.',
        'Official documents are stored digitally with access limited to authorised persons. Annual archiving is reviewed by the board secretary.',
      ],
      lv: [
        'Šie iekšējās kārtības noteikumi papilda LOGUS Debate statūtus un attiecas uz visām valdes, komiteju un kopsapulču sēdēm, ja nav lemts citādi.',
        'Sēdes sasauc valdes priekšsēdētājs, parastajām vismaz septiņas dienas iepriekš, steidzamiem jautājumiem — četrdesmit astoņas stundas. Uzaicinājumā norāda datumu, laiku, vietu vai saiti un darba kārtības projektu.',
        'Valdes kvorums ir vairāk nekā puse no ievēlētajiem locekļiem. Kopsapulcei kvorums ir puse no visiem biedriem, ja statūti noteiktā lēmumam nav augstāks slieksnis.',
        'Lēmumus pieņem ar vienkāršu balsu vairākumu, ja statūti neprasa kvalificētu vairākumu. Priekšsēdētājam ir izšķirošā balss procedūras jautājumos neizšķirtā balsojumā.',
        'Par visām oficiālajām sēdēm tiek protokolēts un apstiprināts nākamajā sēdē. Biedri var pieprasīt labojumus četrpadsmit dienu laikā pēc protokola nosūtīšanas.',
        'Var izveidot komitejas finansēm, programmām, aizsardzībai un komunikācijai. Komiteju pilnvaras un budžetus gadā apstiprina valde.',
        'Oficiālie dokumenti glabājas digitāli, piekļuve ir ierobežota pilnvarotām personām. Gada arhivēšanu pārskata valdes sekretārs.',
      ],
    },
  },
  {
    id: 'report-2025',
    category: 'reports',
    title: { en: 'Annual report 2025', lv: 'Gada pārskats 2025' },
    excerpt: {
      en: 'Summary of activities, finances, and key outcomes for 2025.',
      lv: 'Kopsavilkums par aktivitātēm, finansēm un rezultātiem 2025. gadā.',
    },
    place: { en: 'Riga', lv: 'Rīga' },
    issueDate: '15.03.2026.',
    sectionTitle: { en: 'Report summary', lv: 'Pārskata kopsavilkums' },
    content: {
      en: [
        'This annual report presents the activities and financial results of LOGUS Debate for the calendar year 2025, prepared in accordance with the laws governing associations in Latvia.',
        'In 2025 the association organised twelve competitive tournaments, forty-eight weekly training sessions, and six school outreach programmes reaching more than 1,200 young participants across Latvia.',
        'The Junior Debate Championship and Autumn League remained flagship programmes. New partnerships were signed with four schools in Riga and one regional centre in Liepāja.',
        'Volunteer engagement grew: 86 active volunteers contributed to tab operations, judging, and event logistics. A structured judge training pathway was launched in the spring.',
        'Total income for 2025 was €124,580, including grants (€68,400), programme fees (€31,200), donations (€14,980), and other income (€10,000). Total expenditure was €119,340.',
        'Major expenditure categories were programme delivery (€72,100), staff and coach fees (€28,400), venue and equipment (€11,840), and administration (€7,000). The year closed with a surplus of €5,240.',
        'The financial statements were reviewed by the board and approved at the general meeting on 15 March 2026. The association continues to operate with sound reserves and transparent reporting.',
      ],
      lv: [
        'Šis gada pārskats sniedz LOGUS Debate aktivitāšu un finanšu rezultātu pārskatu par 2025. kalendāra gadu, sagatavots saskaņā ar Latvijas biedrību regulējumu.',
        '2025. gadā biedrība rīkoja divpadsmit sacensību turnīrus, četrdesmit astoņas iknedēļas treniņu nodarbības un sešas skolu programmas, sasniedzot vairāk nekā 1200 jauniešu visā Latvijā.',
        'Jaunioru debašu čempionāts un Rudens līga palika galvenās programmas. Noslēgtas jaunas partnerības ar četrām Rīgas skolām un vienu reģionālo centru Liepājā.',
        'Pieauga brīvprātīgo iesaiste: 86 aktīvi brīvprātīgie palīdzēja tab, tiesāšanā un pasākumu loģistikā. Pavasarī tika uzsākta strukturēta tiesnešu apmācības programma.',
        'Kopējie ieņēmumi 2025. gadā bija 124 580 EUR, t.sk. granti (68 400 EUR), programmu maksas (31 200 EUR), ziedojumi (14 980 EUR) un citi ieņēmumi (10 000 EUR). Kopējās izmaksas — 119 340 EUR.',
        'Galvenās izmaksu kategorijas: programmu īstenošana (72 100 EUR), darbinieku un treneru honorāri (28 400 EUR), telpas un aprīkojums (11 840 EUR), administrācija (7000 EUR). Gads noslēdzās ar 5240 EUR pārpalikumu.',
        'Finanšu pārskatus pārskatīja valde un apstiprināja kopsapulce 2026. gada 15. martā. Biedrība turpina darboties ar stabilām rezervēm un caurskatāmu pārskatu sniegšanu.',
      ],
    },
  },
  {
    id: 'report-2024',
    category: 'reports',
    title: { en: 'Annual report 2024', lv: 'Gada pārskats 2024' },
    excerpt: {
      en: 'Overview of programmes, events, and financial performance in 2024.',
      lv: 'Programmu, pasākumu un finanšu rezultātu pārskats 2024. gadā.',
    },
    place: { en: 'Riga', lv: 'Rīga' },
    issueDate: '20.03.2025.',
    sectionTitle: { en: 'Report summary', lv: 'Pārskata kopsavilkums' },
    content: {
      en: [
        'The 2024 annual report summarises LOGUS Debate’s work in education, competition, and community building during the previous calendar year.',
        'Programme delivery focused on expanding access for first-time debaters. Introductory workshops were held in eight schools, and online practice sessions continued throughout the winter season.',
        'The association hosted the Nordic-Baltic Debate Open preparation series and sent national teams to two international tournaments. Domestic participation in league nights increased by twenty-two percent compared to 2023.',
        'Fundraising and partnerships strengthened the financial base. Sponsorship agreements with three local businesses supported venue costs for the summer camp.',
        'Income totalled €98,760; expenditure €96,110. Grants and donations accounted for the largest share of revenue. Detailed annexes list project-level spending and in-kind contributions.',
        'The board identified priorities for 2025: safeguarding policy updates, coach certification, and expanded regional outreach. These directions were endorsed by members at the annual general meeting.',
      ],
      lv: [
        '2024. gada pārskats apkopo LOGUS Debate darbu izglītībā, sacensībās un kopienas veidošanā iepriekšējā kalendāra gadā.',
        'Programmu īstenošana koncentrējās uz piekļuves paplašināšanu iesācējiem. Ievaddarbnīcas notika astoņās skolās, tiešsaistes treniņi turpinājās visā ziemas sezonā.',
        'Biedrība rīkoja Ziemeļvalstu–Baltijas atklātā turnīra sagatavošanas ciklu un nosūtīja nacionālās komandas uz diviem starptautiskiem turnīriem. Līgas vakaru dalība valstī pieauga par divdesmit divi procenti salīdzinājumā ar 2023. gadu.',
        'Ziedojumi un partnerības stiprināja finanšu bāzi. Trīs vietējo uzņēmumu sponsorēšanas līgumi atbalstīja vasaras nometnes telpu izmaksas.',
        'Ieņēmumi kopā 98 760 EUR; izmaksas 96 110 EUR. Lielāko ieņēmumu daļu veidoja granti un ziedojumi. Detalizētos pielikumos norādītas projektu izmaksas un dabā saņemtais atbalsts.',
        'Valde noteica 2025. gada prioritātes: aizsardzības politikas atjaunināšana, treneru sertifikācija un reģionālās programmas. Biedri to apstiprināja gada kopsapulcē.',
      ],
    },
  },
]
