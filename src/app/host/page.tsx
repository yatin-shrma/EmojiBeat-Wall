import CreatePartySection from "@/components/host/create-party-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ListChecks } from "lucide-react";

export default function HostPage() {
  // Mock existing parties
  const existingParties = [
    { id: "PARTY1", name: "Weekend Vibes", date: "2024-07-20" },
    { id: "OLDONE", name: "Throwback Thursday", date: "2024-07-18" },
  ];

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Host Dashboard</CardTitle>
          <CardDescription>Create a new party or manage existing ones.</CardDescription>
        </CardHeader>
        <CardContent>
          <CreatePartySection />
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Existing Parties</CardTitle>
        </CardHeader>
        <CardContent>
          {existingParties.length > 0 ? (
            <ul className="space-y-4">
              {existingParties.map((party) => (
                <li key={party.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <h3 className="font-medium">{party.name} (Code: {party.id})</h3>
                    <p className="text-sm text-muted-foreground">Date: {party.date}</p>
                  </div>
                  <Button asChild variant="outline">
                    <Link href={`/host/party/${party.id}`}>
                      <ListChecks className="mr-2 h-4 w-4" /> Manage
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No parties found. Create one to get started!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
