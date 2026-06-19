export interface BilingualText {
  en: string
  lv: string
}

export interface FaqPageItem {
  id: string
  question: BilingualText
  answer: BilingualText
}

export interface RuleLineItem {
  text: BilingualText
}

export interface RuleGroupItem {
  text: BilingualText
  items: RuleLineItem[]
}

export interface ArchiveSectionItem {
  id: string
  title: BilingualText
  paragraphs: { en: string[]; lv: string[] }
}

export interface ArchiveTabItem {
  id: string
  label: BilingualText
  intro: BilingualText
  sections: ArchiveSectionItem[]
}

export interface ContactDepartment {
  label: BilingualText
  email: string
  hint: BilingualText
}

export interface ContactInquiry {
  subject: BilingualText
  label: BilingualText
  description: BilingualText
}

export interface DonationImpactStat {
  value: string
  label: BilingualText
}

export interface SitePages {
  home: {
    hero_line1: BilingualText
    hero_highlight: BilingualText
    hero_line2: BilingualText
    hero_image: string
    meet_us: BilingualText
    events_home_title: BilingualText
    club_heading: BilingualText
    club_lead: BilingualText
    club_points: BilingualText[]
    club_cta: BilingualText
  }
  footer: {
    tagline: BilingualText
    address: BilingualText
    email: string
    phone: string
    hours: BilingualText
    registered: BilingualText
    programs: BilingualText
    copyright: BilingualText
  }
  about: {
    hero_kicker: string
    hero_title: BilingualText
    hero_lead: BilingualText
    intro_heading: BilingualText
    intro_p1: BilingualText
    intro_p2: BilingualText
    location_heading: BilingualText
    location_text: BilingualText
    email: string
    phone: string
    location: BilingualText
    pillars: { id: string; title: BilingualText; text: BilingualText }[]
    values: { id: string; title: BilingualText; text: BilingualText }[]
    stats: { value: string; label: BilingualText }[]
  }
  faq: {
    page_title: BilingualText
    page_subtitle: BilingualText
    write_title: BilingualText
    write_lead: BilingualText
    email: string
    items: FaqPageItem[]
  }
  rules: {
    page_title: BilingualText
    groups: RuleGroupItem[]
  }
  contacts: {
    page_title: string
    org_name: BilingualText
    reg_no: string
    street: BilingualText
    email: string
    phone: string
    phone_display: string
    hours: BilingualText
    departments: ContactDepartment[]
    inquiries: ContactInquiry[]
    role_emails: string[]
  }
  donation: {
    kicker: BilingualText
    heading: BilingualText
    subtitle: BilingualText
    note: BilingualText
    bank_title: BilingualText
    recipient: string
    iban: string
    bank: BilingualText
    bic: string
    reference: BilingualText
    confirm_email: string
    impact: DonationImpactStat[]
  }
  team_join: {
    title: BilingualText
    text: BilingualText
    button: BilingualText
    quote: BilingualText
  }
  archive: {
    hero_title: BilingualText
    hero_intro: BilingualText
    gallery_title: BilingualText
    gallery_lead: BilingualText
    photos_empty: BilingualText
  }
  archive_tabs: ArchiveTabItem[]
}
