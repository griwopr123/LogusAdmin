export interface RuleLine {
  text: { en: string; lv: string }
}

export interface RuleGroup {
  text: { en: string; lv: string }
  items: RuleLine[]
}

export const rulesData: RuleGroup[] = [
  {
    text: { en: 'Format and motion', lv: 'Formāts un motion' },
    items: [
      {
        text: {
          en: 'LOGUS Debate uses British Parliamentary (BP) at tournaments and training leagues.',
          lv: 'LOGUS Debate turnīros un treniņu līgās izmanto British Parliamentary (BP) formātu.',
        },
      },
      {
        text: {
          en: 'Each round has one motion (topic).',
          lv: 'Katram raundam ir viens motion (tēma).',
        },
      },
      {
        text: {
          en: 'Teams must argue the side they are assigned — not their personal opinion.',
          lv: 'Komandas argumentē piešķirto pusi — ne personīgo viedokli.',
        },
      },
    ],
  },
  {
    text: { en: 'Teams and speaker order', lv: 'Komandas un runātāju secība' },
    items: [
      {
        text: {
          en: 'Four teams of two speakers compete: OG, OO, CG, and CO.',
          lv: 'Sacenšas četras komandas pa diviem runātājiem: OG, OO, CG un CO.',
        },
      },
      {
        text: {
          en: 'Constructive order: PM, LO, DPM, DLO, MG, MO, GW, OW.',
          lv: 'Konstruktīvās secībā: PM, LO, DPM, DLO, MG, MO, GW, OW.',
        },
      },
      {
        text: {
          en: 'Closing teams extend, clash, and weigh — no wholly new arguments.',
          lv: 'Closing komandas attīsta, konfrontē un sver — bez pilnīgi jauniem argumentiem.',
        },
      },
    ],
  },
  {
    text: { en: 'Speaking time', lv: 'Runas laiks' },
    items: [
      {
        text: {
          en: 'Constructive speeches are 7 minutes unless the tab says otherwise.',
          lv: 'Konstruktīvās runas — 7 minūtes, ja tab nav norādīts citādi.',
        },
      },
      {
        text: {
          en: 'Reply speeches are 4 minutes when used.',
          lv: 'Reply runas — 4 minūtes, ja tās tiek izmantotas.',
        },
      },
      {
        text: {
          en: 'First and last minute of constructives are protected — no POIs.',
          lv: 'Pirmā un pēdējā minūte bez POI.',
        },
      },
    ],
  },
  {
    text: { en: 'Points of Information (POI)', lv: 'Points of Information (POI)' },
    items: [
      {
        text: {
          en: 'Offer a POI by standing and saying "Point of information".',
          lv: 'POI piedāvā, pieceļoties un sakot "Point of information".',
        },
      },
      {
        text: {
          en: 'The speaker may accept or decline.',
          lv: 'Runātājs var pieņemt vai noraidīt.',
        },
      },
      {
        text: {
          en: 'Only one accepted POI at a time. No POIs in reply speeches.',
          lv: 'Vienlaikus tikai viens pieņemts POI. Reply runās POI nav.',
        },
      },
    ],
  },
  {
    text: { en: 'Judging', lv: 'Tiesāšana' },
    items: [
      {
        text: {
          en: 'Judges rank teams 1st–4th based on content, style, and strategy.',
          lv: 'Tiesneši novērtē komandas 1.–4. vietā pēc satura, stila un stratēģijas.',
        },
      },
      {
        text: {
          en: 'Reward clear logic, clash, and weighing.',
          lv: 'Novērtē skaidru loģiku, konfrontāciju un weighing.',
        },
      },
    ],
  },
  {
    text: { en: 'Conduct', lv: 'Uzvedība' },
    items: [
      {
        text: {
          en: 'Respect, inclusivity, and fair play are required at all events.',
          lv: 'Visos pasākumos obligāta cieņa, iekļaušana un godīga spēle.',
        },
      },
      {
        text: {
          en: 'Disputes are handled by tournament staff; appeals follow the briefing procedure.',
          lv: 'Domstarpības risina turnīra personāls; apelācijas — pēc instrukcijas.',
        },
      },
    ],
  },
]
