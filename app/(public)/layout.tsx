import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { ContactDock } from '@/components/layout/contact-dock';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main" className="flex-1 pb-16 md:pb-0">
        {children}
      </main>
      <SiteFooter />
      <ContactDock />
    </div>
  );
}
