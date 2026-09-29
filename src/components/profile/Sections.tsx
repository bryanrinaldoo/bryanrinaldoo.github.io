import { getTranslations } from 'next-intl/server';
import { PROFILE } from '@/utils/Profile';

const pastels = ['bg-badge-orange', 'bg-badge-pink', 'bg-badge-violet', 'bg-badge-emerald'];

export async function About() {
  const t = await getTranslations('Index');

  return (
    <section id="about" className="mx-auto max-w-[1200px] scroll-mt-16 px-6 py-16 md:py-24">
      <div className="reveal grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="display text-[32px] text-ink md:text-5xl">{t('about_title')}</h2>
        </div>
        <div className="lg:col-span-7">
          <p className="text-base text-body md:text-lg">{t('about_body')}</p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {PROFILE.skills.map((skill, index) => (
              <li
                key={skill}
                className="inline-flex items-center gap-2 rounded-full bg-surface-card px-3 py-1 text-[13px] font-medium"
              >
                <span className={`size-2 rounded-full ${pastels[index % pastels.length]}`} />
                {skill}
              </li>
            ))}
          </ul>
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
          {PROFILE.experience.map((job) => (
            <article key={job.key} className="reveal rounded-lg bg-surface-card p-8">
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
            className="reveal rounded-lg border border-hairline bg-white p-6"
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
        <a
          href={`mailto:${PROFILE.email}`}
          className="mt-6 inline-flex h-10 items-center rounded-md bg-primary px-5 text-sm font-semibold text-white active:bg-primary-active"
        >
          {t('hero_cta_email')}
        </a>
      </div>
    </section>
  );
}
