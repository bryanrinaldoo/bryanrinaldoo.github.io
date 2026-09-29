export const PROFILE = {
  name: 'Bryan Rinaldo',
  email: 'bryan.rinaldo24@gmail.com',
  linkedin: 'https://www.linkedin.com/in/bryanrinaldoo/',
  github: 'https://github.com/bryanrinaldoo',
  skills: ['TypeScript', 'React', 'Next.js', 'Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
  experience: [
    {
      key: 'masa',
      company: 'Masa AI',
      period: 'Apr 2023 - Present',
      bullets: ['masa_b1', 'masa_b2', 'masa_b3'],
    },
    {
      key: 'akhdani',
      company: 'Akhdani Reka Solusi',
      period: 'Nov 2022 - Apr 2023',
      bullets: ['akhdani_b1'],
    },
    {
      key: 'kompas',
      company: 'Harian Kompas',
      period: 'May 2022 - Aug 2022',
      bullets: ['kompas_b1', 'kompas_b2'],
    },
  ],
  projects: [
    { name: 'Twice-Website', language: 'HTML', key: 'project_twice' },
    { name: 'Bookshelf-WebApp', language: 'HTML', key: 'project_bookshelf' },
    { name: 'MovieWeb', language: 'JavaScript', key: 'project_movie' },
    { name: 'Todo-App', language: 'JavaScript', key: 'project_todo' },
    { name: 'auto_email_crypto', language: 'Python', key: 'project_email' },
  ],
} as const;
