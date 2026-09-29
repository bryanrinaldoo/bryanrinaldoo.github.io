import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/profile/Hero';
import { About, Contact, Experience, Projects } from '@/components/profile/Sections';

type IndexPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IndexPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function IndexPage(props: IndexPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
}
