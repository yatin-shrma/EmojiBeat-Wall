import Link from 'next/link';
import AppLogo from './app-logo';
import { Button } from '@/components/ui/button';
import { Home, ShieldCheck } from 'lucide-react';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <AppLogo />
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" /> Guest
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/host">
              <ShieldCheck className="mr-2 h-4 w-4" /> Host
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
