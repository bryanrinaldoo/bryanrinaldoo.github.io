import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { PROFILE } from '@/utils/Profile';

const navLinks = ['about', 'experience', 'projects', 'contact'] as const;

export async function TopNav() {
  const t = await getTranslations('Index');

  return (
    <header className="sticky top-0 z-50 border-b border-hairline-soft bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="display text-lg text-ink">
          {PROFILE.name}
        </Link>
        <nav className="hidden gap-1 rounded-full bg-surface-soft p-1.5 md:flex">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link}`}
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-muted"
            >
              {t(`nav_${link}`)}
            </a>
          ))}
        </nav>
        <a
          href={`mailto:${PROFILE.email}`}
          className="inline-flex h-10 items-center rounded-md bg-primary px-5 text-sm font-semibold text-white active:bg-primary-active"
        >
          {t('hero_cta_email')}
        </a>
      </div>
    </header>
  );
}

export async function Footer() {
  const t = await getTranslations('Index');

  return (
    <footer className="bg-surface-dark px-6 py-16 text-sm text-on-dark-soft">
      <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-6 md:flex-row">
        <p>{t('footer_text', { year: new Date().getFullYear(), name: PROFILE.name })}</p>
        <div className="flex gap-6">
          <a href={PROFILE.github} target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer noopener">
            LinkedIn
          </a>
          <a href={`mailto:${PROFILE.email}`}>{t('footer_email')}</a>
        </div>
      </div>
    </footer>
  );
}
