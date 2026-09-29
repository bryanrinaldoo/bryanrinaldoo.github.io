import { setRequestLocale } from 'next-intl/server';
import { Footer, TopNav } from '@/components/profile/Chrome';

export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <TopNav />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}
