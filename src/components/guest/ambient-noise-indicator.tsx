"use client";

import { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { Volume2, Zap, CheckCircle } from "lucide-react";

export default function AmbientNoiseIndicator() {
  const [noiseLevel, setNoiseLevel] = useState(0); // 0 to 100
  const [canVote, setCanVote] = useState(true);
  const [cooldown, setCooldown] = useState(0); // Cooldown in seconds

  // Mock ambient noise level changes
  useEffect(() => {
    const interval = setInterval(() => {
      setNoiseLevel(Math.random() * 100);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Mock voting cooldown logic based on noise (simplified)
  useEffect(() => {
    if (!canVote) {
      let currentCooldown = 5; // Base cooldown
      if (noiseLevel > 70) currentCooldown = 2; // Shorter cooldown if loud
      if (noiseLevel < 30) currentCooldown = 8; // Longer cooldown if quiet
      
      setCooldown(currentCooldown);
      const timer = setInterval(() => {
        setCooldown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanVote(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [canVote, noiseLevel]);

  // Mock function to trigger cooldown (would be called after a vote)
  // const triggerCooldown = () => setCanVote(false);

  return (
    <div className="mt-4 p-3 border rounded-lg bg-card/50">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <Volume2 className="mr-2 h-5 w-5" />
          Ambient Noise:
        </div>
        <span className="text-sm font-medium">{noiseLevel.toFixed(0)}%</span>
      </div>
      <Progress value={noiseLevel} className="w-full h-2 mb-3" />
      
      <div className="flex items-center text-sm">
        {canVote ? (
          <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
        ) : (
          <Zap className="mr-2 h-5 w-5 text-yellow-500 animate-pulse" />
        )}
        <span>
          {canVote ? "Ready to vote!" : `Vote cooldown: ${cooldown}s`}
        </span>
      </div>
      {/* <Button onClick={triggerCooldown} disabled={!canVote} className="w-full mt-2">Test Cooldown</Button> */}
    </div>
  );
}
