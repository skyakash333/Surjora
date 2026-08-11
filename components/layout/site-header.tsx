import { ButtonLink } from '@/components/ui/button';
import { Logo } from '@/components/layout/logo';
import { MainNav } from '@/components/layout/main-nav';
import { MobileMenu } from '@/components/layout/mobile-menu';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/70 bg-white/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Logo />
        <MainNav />
        <div className="flex items-center gap-2">
          <ButtonLink href="/contact" size="sm" className="hidden sm:inline-flex">
            Request a quote
          </ButtonLink>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
