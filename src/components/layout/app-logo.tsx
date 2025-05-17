import Link from 'next/link';
import { Smile } from 'lucide-react';

export default function AppLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors">
      <Smile className="h-8 w-8" />
      <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        EmojiBeat Wall
      </span>
    </Link>
  );
}
