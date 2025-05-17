"use client";

import { useParams } from "next/navigation";
import PartyCodeDisplay from "@/components/shared/party-code-display";
import VoteSummary from "@/components/host/vote-summary";
import PlaylistGenerator from "@/components/host/playlist-generator";
import LightingController from "@/components/host/lighting-controller";
import TrendAnalyzer from "@/components/host/trend-analyzer";
import SessionControls from "@/components/host/session-controls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { BarChart3, ListMusic, Zap, Activity } from "lucide-react";

// Mock data structure for votes
export interface EmojiVote {
  emoji: string;
  count: number;
}

export default function HostPartyManagementPage() {
  const params = useParams();
  const partyId = params.partyId as string;

  // Mock votes state - this would come from Firestore in a real app
  const [votes, setVotes] = useState<EmojiVote[]>([
    { emoji: "🎉", count: 15 },
    { emoji: "🔥", count: 12 },
    { emoji: "🎶", count: 8 },
    { emoji: "💃", count: 5 },
  ]);

  // Simulate real-time updates to votes
   useEffect(() => {
    if (!partyId) return; // Don't run if partyId isn't available yet
    const interval = setInterval(() => {
      setVotes(prevVotes => 
        prevVotes.map(vote => ({
          ...vote,
          // Randomly increment a vote, or add a new emoji sometimes
          count: vote.count + (Math.random() > 0.8 ? 1 : 0) 
        })).sort((a,b) => b.count - a.count)
      );
    }, 3000); // Update every 3 seconds
    return () => clearInterval(interval);
  }, [partyId]);


  if (!partyId) {
    return <div className="text-center py-10">Loading party details...</div>;
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/80 to-accent/80 p-6">
          <CardTitle className="text-3xl font-bold text-primary-foreground">Manage Party: {partyId}</CardTitle>
          <PartyCodeDisplay partyCode={partyId} />
        </CardHeader>
        <CardContent className="p-6">
           <SessionControls 
            onStartSession={() => console.log("Session started for", partyId)}
            onEndSession={() => console.log("Session ended for", partyId)}
            onResetVotes={() => {
              console.log("Votes reset for", partyId);
              setVotes(votes.map(v => ({...v, count: 0})));
            }}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vote Summary</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <VoteSummary votes={votes} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Playlist Generator</CardTitle>
            <ListMusic className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <PlaylistGenerator topEmojis={votes.slice(0, 5).map(v => v.emoji)} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Smart Lighting</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <LightingController />
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-1"> {/* Allow this card to span on medium screens */}
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emoji Trend Analysis</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <TrendAnalyzer emojiVotes={votes} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
