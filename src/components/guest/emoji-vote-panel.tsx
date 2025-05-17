"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Send } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface EmojiVotePanelProps {
  availableEmojis: string[];
  onVote: (emoji: string) => void;
  defaultSelectedEmoji?: string;
}

export default function EmojiVotePanel({ 
  availableEmojis, 
  onVote,
  defaultSelectedEmoji 
}: EmojiVotePanelProps) {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(defaultSelectedEmoji || availableEmojis[0] || null);
  const [isVoting, setIsVoting] = useState(false);

  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji);
  };

  const handleSubmitVote = () => {
    if (selectedEmoji) {
      setIsVoting(true);
      // Simulate API call
      setTimeout(() => {
        onVote(selectedEmoji);
        setIsVoting(false);
        // Potentially add a cooldown visual feedback here
      }, 300);
    }
  };

  return (
    <div className="p-4 rounded-lg shadow-md">
      <p className="text-sm text-center mb-3 text-muted-foreground">Choose an emoji to cast your vote!</p>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex space-x-2 pb-3">
          {availableEmojis.map((emoji) => (
            <Button
              key={emoji}
              variant={selectedEmoji === emoji ? "default" : "outline"}
              size="icon"
              className={`text-2xl p-6 rounded-full transition-all duration-200 ease-in-out transform hover:scale-110 ${selectedEmoji === emoji ? 'scale-110 ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
              onClick={() => handleEmojiSelect(emoji)}
              aria-label={`Vote for ${emoji}`}
            >
              {emoji}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      
      <Button 
        onClick={handleSubmitVote} 
        disabled={!selectedEmoji || isVoting} 
        className="w-full mt-4"
        size="lg"
      >
        <Send className="mr-2 h-5 w-5" /> 
        {isVoting ? "Voting..." : `Vote for ${selectedEmoji || ''}`}
      </Button>
    </div>
  );
}
