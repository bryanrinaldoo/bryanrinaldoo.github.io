import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Hero } from '@/components/profile/Hero';
import { About, Contact, Experience, Projects } from '@/components/profile/Sections';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Index');

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function IndexPage() {
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
