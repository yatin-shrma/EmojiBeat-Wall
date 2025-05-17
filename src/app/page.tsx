import JoinPartyForm from '@/components/guest/join-party-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { PartyPopper } from 'lucide-react';

export default function GuestLandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] py-12">
      <Card className="w-full max-w-md shadow-2xl bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
            <PartyPopper size={48} className="text-primary" />
          </div>
          <CardTitle className="text-3xl font-extrabold tracking-tight">Welcome to EmojiBeat Wall!</CardTitle>
          <CardDescription className="text-lg text-muted-foreground pt-1">
            Join the party and share your vibe.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <JoinPartyForm />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/host">Are you the Host?</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
