"use client";

import { Button } from "@/components/ui/button";
import { Play, Square, RefreshCw, AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface SessionControlsProps {
  onStartSession: () => void;
  onEndSession: () => void;
  onResetVotes: () => void;
  defaultIsSessionActive?: boolean;
}

export default function SessionControls({
  onStartSession,
  onEndSession,
  onResetVotes,
  defaultIsSessionActive = false,
}: SessionControlsProps) {
  // In a real app, session state would come from props or context
  const [isSessionActive, setIsSessionActive] = React.useState(defaultIsSessionActive);

  const handleStart = () => {
    onStartSession();
    setIsSessionActive(true);
  };

  const handleEnd = () => {
    onEndSession();
    setIsSessionActive(false);
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {!isSessionActive ? (
        <Button onClick={handleStart} className="w-full bg-green-600 hover:bg-green-700 text-white col-span-full sm:col-span-1">
          <Play className="mr-2 h-4 w-4" /> Start Session
        </Button>
      ) : (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full col-span-full sm:col-span-1">
              <Square className="mr-2 h-4 w-4" /> End Session
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to end the session?</AlertDialogTitle>
              <AlertDialogDescription>
                This will stop new votes and finalize the party. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleEnd} className="bg-destructive hover:bg-destructive/90">
                End Session
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-600 col-span-full sm:col-span-2">
            <RefreshCw className="mr-2 h-4 w-4" /> Reset Votes
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
             <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-800/20 mb-2">
              <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <AlertDialogTitle>Reset all votes?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will clear all current emoji votes. Guests will be able to vote again from scratch. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onResetVotes} className="bg-yellow-500 hover:bg-yellow-600 text-white">
              Yes, Reset Votes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// Dummy import for React to avoid linting errors in some environments if not used elsewhere explicitly
import React from 'react';
