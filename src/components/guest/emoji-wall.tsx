"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface Vote {
  emoji: string;
  count: number;
}

interface EmojiWallProps {
  votes: Vote[];
  defaultMaxEmojiSize?: number; // Max size in pixels
  defaultMinEmojiSize?: number; // Min size in pixels
}

const MAX_DISPLAY_EMOJIS = 20; // Limit number of emojis on wall for performance

export default function EmojiWall({ 
  votes, 
  defaultMaxEmojiSize = 80, 
  defaultMinEmojiSize = 20 
}: EmojiWallProps) {
  
  const sortedVotes = [...votes].sort((a, b) => b.count - a.count).slice(0, MAX_DISPLAY_EMOJIS);
  const maxVoteCount = Math.max(1, ...sortedVotes.map(v => v.count)); // Avoid division by zero

  const getEmojiSize = (count: number) => {
    const scale = Math.min(1, count / (maxVoteCount * 0.75)); // Scale faster initially
    return defaultMinEmojiSize + (defaultMaxEmojiSize - defaultMinEmojiSize) * scale;
  };

  if (sortedVotes.length === 0) {
    return (
      <Card className="h-full flex items-center justify-center bg-muted/30">
        <CardContent className="text-center p-6">
          <p className="text-2xl text-muted-foreground animate-pulse">Waiting for votes...</p>
          <p className="text-sm text-muted-foreground">Be the first to cast an emoji!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-full p-4 overflow-hidden grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 place-items-center">
      <AnimatePresence>
        {sortedVotes.map((vote, index) => (
          <motion.div
            key={vote.emoji}
            layout // Enables smooth reordering
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              fontSize: `${getEmojiSize(vote.count)}px`,
              transition: { type: "spring", stiffness: 260, damping: 20, delay: index * 0.05 }
            }}
            exit={{ opacity: 0, scale: 0.5, y: -20, transition: { duration: 0.2 } }}
            className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-primary/10 transition-colors cursor-default"
            title={`${vote.emoji} - ${vote.count} votes`}
          >
            <span 
              className="drop-shadow-lg"
              style={{ textShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--accent))' }} // Add some glow
            >
              {vote.emoji}
            </span>
            <span className="text-xs mt-1 text-foreground font-mono bg-background/50 px-1.5 py-0.5 rounded">
              {vote.count}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
