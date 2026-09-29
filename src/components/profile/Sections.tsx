import { getTranslations } from 'next-intl/server';
import { PROFILE } from '@/utils/Profile';
import { SpotlightCard } from './SpotlightCard';
import { StarLink } from './StarLink';

const pastels = ['bg-badge-orange', 'bg-badge-pink', 'bg-badge-violet', 'bg-badge-emerald'];

const hoverLift =
  'transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]';

export async function About() {
  const t = await getTranslations('Index');

  const words = t('about_body').split(' ');

  // Tall section with a pinned panel: scrolling lights up the text word by word,
  // so visitors read it before reaching the next section.
  return (
    <section id="about" className="about-track relative h-[240vh]">
      <div className="sticky top-16 flex h-[calc(100vh-64px)] items-center">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <h2 className="reveal text-[13px] font-medium tracking-widest text-muted uppercase">
            {t('about_title')}
          </h2>
          <p className="display mt-6 max-w-5xl text-[28px] leading-tight text-ink md:text-5xl">
            {words.map((word, index) => (
              <span
                // Words repeat, so the index keeps keys unique
                key={`${word}-${index}`}
                className="about-word"
                style={{
                  animationRange: `contain ${(index / words.length) * 70}% contain ${(index / words.length) * 70 + 6}%`,
                }}
              >
                {word}{' '}
              </span>
            ))}
          </p>
          <ul className="mt-10 flex flex-wrap gap-2">
            {PROFILE.skills.map((skill, index) => (
              <li
                key={skill}
                className="about-chip inline-flex items-center gap-2 rounded-full bg-surface-card px-4 py-1.5 text-sm font-medium"
                style={{ animationRange: `contain ${74 + index * 2}% contain ${80 + index * 2}%` }}
              >
                <span className={`size-2 rounded-full ${pastels[index % pastels.length]}`} />
                {skill}
              </li>
            ))}
          </ul>
          <p
            className="about-chip mt-8 inline-flex items-center gap-2 text-sm text-muted"
            style={{ animationRange: 'contain 92% contain 98%' }}
          >
            <span className="pulse-dot size-2 rounded-full bg-success" />
            {t('about_availability')}
          </p>
        </div>
      </div>
    </section>
  );
}

export async function Experience() {
  const t = await getTranslations('Index');

  return (
    <section id="experience" className="scroll-mt-16 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="display reveal text-[32px] text-ink md:text-5xl">{t('experience_title')}</h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <SpotlightCard className="reveal rounded-lg bg-surface-dark p-8 text-white md:p-10 lg:col-span-2 lg:row-span-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[13px] font-medium text-on-dark-soft">
                {PROFILE.currentJob.period}
              </p>
              <span className="inline-flex items-center gap-2 rounded-full bg-surface-dark-elevated px-3 py-1 text-[13px] font-medium">
                <span className="pulse-dot size-2 rounded-full bg-success" />
                {t('masa_current')}
              </span>
            </div>
            <h3 className="display mt-4 text-4xl md:text-5xl">{PROFILE.currentJob.company}</h3>
            <p className="mt-1 text-base text-on-dark-soft">{t('masa_role')}</p>
            <ul className="mt-6 space-y-3 text-sm text-on-dark-soft md:text-base">
              {PROFILE.currentJob.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-white" />
                  {t(bullet)}
                </li>
              ))}
            </ul>
            <ul className="mt-8 flex flex-wrap gap-2">
              {PROFILE.currentJob.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full bg-surface-dark-elevated px-3 py-1 text-[13px] font-medium transition-colors duration-300 hover:bg-white hover:text-ink"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </SpotlightCard>
          {PROFILE.experience.map((job) => (
            <article key={job.key} className={`reveal rounded-lg bg-surface-card p-8 ${hoverLift}`}>
              <p className="text-[13px] font-medium text-muted">{job.period}</p>
              <h3 className="mt-3 text-lg font-semibold">{job.company}</h3>
              <p className="text-sm text-muted">{t(`${job.key}_role`)}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-body">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{t(bullet)}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export async function Projects() {
  const t = await getTranslations('Index');

  return (
    <section id="projects" className="mx-auto max-w-[1200px] scroll-mt-16 px-6 py-16 md:py-24">
      <h2 className="display reveal text-[32px] text-ink md:text-5xl">{t('projects_title')}</h2>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROFILE.projects.map((project) => (
          <a
            key={project.name}
            href={`${PROFILE.github}/${project.name}`}
            target="_blank"
            rel="noreferrer noopener"
            className={`reveal rounded-lg border border-hairline bg-white p-6 ${hoverLift}`}
          >
            <p className="font-mono text-sm font-semibold text-ink">{project.name}</p>
            <p className="mt-2 text-sm text-body">{t(project.key)}</p>
            <span className="mt-4 inline-block rounded-full bg-surface-card px-3 py-1 text-[13px] font-medium">
              {project.language}
            </span>
          </a>
        ))}
        <div className="reveal rounded-lg bg-surface-card p-6">
          <p className="text-base font-semibold">{t('education_title')}</p>
          <p className="mt-2 text-sm text-body">{t('education_degree')}</p>
          <p className="text-sm text-muted">{t('education_school')}</p>
          <p className="mt-4 text-sm text-body">{t('award_title')}</p>
        </div>
      </div>
    </section>
  );
}

export async function Contact() {
  const t = await getTranslations('Index');

  return (
    <section id="contact" className="mx-auto max-w-[1200px] scroll-mt-16 px-6 pb-16 md:pb-24">
      <div className="reveal rounded-lg bg-surface-card p-8 text-center md:p-12">
        <h2 className="display text-[28px] text-ink">{t('cta_title')}</h2>
        <p className="mx-auto mt-3 max-w-lg text-base text-body">{t('cta_body')}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <StarLink
            href={PROFILE.linkedin}
            className="inline-flex h-10 items-center rounded-md bg-primary px-5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] active:bg-primary-active"
          >
            {t('cta_contact')}
          </StarLink>
          <a
            href={`mailto:${PROFILE.email}`}
            className="inline-flex h-10 items-center rounded-md border border-hairline bg-white px-5 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5"
          >
            {t('hero_cta_email')}
          </a>
        </div>
      </div>
    </section>
  );
}
