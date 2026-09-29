import { getTranslations } from 'next-intl/server';
import { PROFILE } from '@/utils/Profile';
import { HeroCanvas } from './HeroCanvas';
import { StarLink } from './StarLink';

// Floating skill pills at different scroll speeds create the parallax depth
const floaters = [
  {
    label: 'TypeScript',
    position: 'top-[12%] left-[6%]',
    speed: 'parallax-fast',
    dot: 'bg-badge-violet',
  },
  {
    label: 'React',
    position: 'top-[26%] right-[8%]',
    speed: 'parallax-slow',
    dot: 'bg-badge-pink',
  },
  {
    label: 'Next.js',
    position: 'top-[58%] left-[10%]',
    speed: 'parallax-slow',
    dot: 'bg-badge-orange',
  },
  {
    label: 'Python',
    position: 'top-[70%] right-[12%]',
    speed: 'parallax-fast',
    dot: 'bg-badge-emerald',
  },
  { label: 'FastAPI', position: 'top-[42%] left-[2%]', speed: 'parallax-mid', dot: 'bg-success' },
  {
    label: 'Docker',
    position: 'top-[44%] right-[3%]',
    speed: 'parallax-mid',
    dot: 'bg-badge-violet',
  },
];

export async function Hero() {
  const t = await getTranslations('Index');

  return (
    <section className="relative flex min-h-[calc(100vh-64px)] items-center overflow-hidden">
      <HeroCanvas />
      <div
        aria-hidden
        className="parallax-slow pointer-events-none absolute -top-24 -right-24 size-105 rounded-full bg-badge-violet/15 blur-3xl"
      />
      <div
        aria-hidden
        className="parallax-fast pointer-events-none absolute top-64 -left-32 size-90 rounded-full bg-badge-emerald/20 blur-3xl"
      />

      {floaters.map((item) => (
        <span
          key={item.label}
          aria-hidden
          className={`${item.speed} absolute hidden items-center gap-2 rounded-full border border-hairline bg-white px-3 py-1.5 text-[13px] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.05)] md:inline-flex ${item.position}`}
        >
          <span className={`size-2 rounded-full ${item.dot}`} />
          {item.label}
        </span>
      ))}

      <div className="relative mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="fade-up inline-flex items-center gap-2 rounded-full bg-surface-card px-3 py-1 text-[13px] font-medium [animation-delay:0ms]">
          <span className="pulse-dot size-2 rounded-full bg-success" />
          {t('hero_badge')}
        </p>
        <h1 className="display fade-up mt-6 text-[40px] text-ink [animation-delay:90ms] md:text-[64px]">
          {t('hero_title')}
        </h1>
        <p className="fade-up mx-auto mt-6 max-w-xl text-base text-body [animation-delay:180ms] md:text-lg">
          {t('hero_intro')}
        </p>
        <div className="fade-up mt-8 flex flex-wrap justify-center gap-3 [animation-delay:270ms]">
          <StarLink
            href={PROFILE.linkedin}
            className="inline-flex h-11 items-center rounded-md bg-primary px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] active:bg-primary-active"
          >
            {t('cta_contact')}
          </StarLink>
        </div>
      </div>
    </section>
  );
}
