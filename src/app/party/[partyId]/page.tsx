"use client";

import AmbientNoiseIndicator from "@/components/guest/ambient-noise-indicator";
import EmojiVotePanel from "@/components/guest/emoji-vote-panel";
import EmojiWall from "@/components/guest/emoji-wall";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Mock Emojis - In a real app, these might come from configuration or the party session
const availableEmojis = ["🎉", "🥳", "🔥", "🕺", "💃", "🎶", "🤩", "✨", "😎", "🚀"];

// Mock votes state - this would come from Firestore in a real app
type Vote = { emoji: string; count: number };

export default function GuestPartyPage() {
  const params = useParams();
  const partyId = params.partyId as string;
  const [votes, setVotes] = useState<Vote[]>(
    availableEmojis.map(emoji => ({ emoji, count: Math.floor(Math.random() * 5) }))
  );
  const [userName, setUserName] = useState<string>("FunkyAlien7"); // Mock user name

  // Simulate real-time updates to votes
  useEffect(() => {
    const interval = setInterval(() => {
      setVotes(prevVotes => 
        prevVotes.map(vote => ({
          ...vote,
          count: Math.max(0, vote.count + (Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0))
        })).sort((a,b) => b.count - a.count)
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleVote = (emoji: string) => {
    setVotes(prevVotes => {
      const newVotes = [...prevVotes];
      const voteIndex = newVotes.findIndex(v => v.emoji === emoji);
      if (voteIndex > -1) {
        newVotes[voteIndex].count += 1;
      } else {
        // This case should ideally not happen if emoji is from availableEmojis
        newVotes.push({ emoji, count: 1 });
      }
      return newVotes.sort((a,b) => b.count - a.count);
    });
  };

  if (!partyId) {
    return <div className="text-center py-10">Loading party...</div>;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)]"> {/* Adjust height based on header/footer */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Party: {partyId}</h1>
        <p className="text-muted-foreground">Welcome, {userName}!</p>
      </div>
      
      <div className="flex-grow overflow-hidden mb-4">
        <EmojiWall votes={votes} />
      </div>
      
      <div className="mt-auto sticky bottom-0 pb-4 bg-background/80 backdrop-blur-sm rounded-t-lg p-4 border-t">
        <EmojiVotePanel availableEmojis={availableEmojis} onVote={handleVote} />
        <AmbientNoiseIndicator />
      </div>
    </div>
  );
}
