import { Footer, TopNav } from '@/components/profile/Chrome';

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <TopNav />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}
