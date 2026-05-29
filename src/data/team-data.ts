export interface TeamMember {
  id?: string
  name: { en: string; lv: string }
  role: { en: string; lv: string }
  photo?: string
}

export const staticTeamMembers: TeamMember[] = [
  {
    name: { en: 'Anete Kalniņa', lv: 'Anete Kalniņa' },
    role: { en: 'Programme Director', lv: 'Programmas vadītāja' },
  },
  {
    name: { en: 'Mārtiņš Zariņš', lv: 'Mārtiņš Zariņš' },
    role: { en: 'Head Coach — BP', lv: 'Galvenais treneris — BP' },
  },
  {
    name: { en: 'Elīna Liepiņa', lv: 'Elīna Liepiņa' },
    role: { en: 'Senior Coach', lv: 'Vecākā trenere' },
  },
  {
    name: { en: 'Roberts Bērziņš', lv: 'Roberts Bērziņš' },
    role: { en: 'Junior Circuit Lead', lv: 'Jauniešu līgas vadītājs' },
  },
]
