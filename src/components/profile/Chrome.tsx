import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { PROFILE } from '@/utils/Profile';
import { SmoothScrollLink } from './SmoothScrollLink';
import { StarLink } from './StarLink';

const navLinks = ['about', 'experience', 'projects', 'contact'] as const;

export async function TopNav() {
  const t = await getTranslations('Index');

  return (
    <header className="sticky top-0 z-50 border-b border-hairline-soft bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <Link
          href="/"
          className="display inline-flex items-center gap-2 text-lg text-ink transition-transform duration-300 hover:scale-105"
        >
          <Image
            src="/favicon.svg"
            alt=""
            width={28}
            height={28}
            unoptimized
            className="size-7 transition-transform duration-500 hover:rotate-[-12deg]"
          />
          {PROFILE.name}
        </Link>
        <nav className="hidden gap-1 rounded-full bg-surface-soft p-1.5 md:flex">
          {navLinks.map((link) => (
            <SmoothScrollLink
              key={link}
              href={`#${link}`}
              className="group relative rounded-full px-3.5 py-1.5 text-sm font-medium text-muted transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-ink hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] active:scale-95"
            >
              {t(`nav_${link}`)}
              <span className="absolute inset-x-3.5 bottom-1 h-px origin-left scale-x-0 bg-ink transition-transform duration-300 group-hover:scale-x-100" />
            </SmoothScrollLink>
          ))}
        </nav>
        <StarLink
          href={PROFILE.linkedin}
          className="inline-flex h-10 items-center rounded-md bg-primary px-5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] active:bg-primary-active"
        >
          {t('cta_contact')}
        </StarLink>
      </div>
      <div
        aria-hidden
        className="scroll-progress absolute inset-x-0 bottom-0 h-0.5 origin-left bg-ink"
      />
    </header>
  );
}

export async function Footer() {
  const t = await getTranslations('Index');

  return (
    <footer className="bg-surface-dark px-6 py-16 text-sm text-on-dark-soft">
      <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-6 md:flex-row">
        <p className="inline-flex items-center gap-2">
          <Image
            src="/favicon.svg"
            alt=""
            width={20}
            height={20}
            unoptimized
            className="size-5 opacity-70"
          />
          {t('footer_text', { year: new Date().getFullYear(), name: PROFILE.name })}
        </p>
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
