"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { generatePlaylist, GeneratePlaylistOutput } from "@/ai/flows/generate-playlist";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ListMusic, Wand2, Loader2, AlertTriangle } from "lucide-react";
import Image from "next/image";

interface PlaylistGeneratorProps {
  topEmojis: string[];
}

export default function PlaylistGenerator({ topEmojis }: PlaylistGeneratorProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [playlist, setPlaylist] = useState<GeneratePlaylistOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePlaylist = async () => {
    setIsLoading(true);
    setPlaylist(null);
    setError(null);
    try {
      if (topEmojis.length === 0) {
        toast({
          variant: "destructive",
          title: "No Emojis",
          description: "Need some emoji votes to generate a playlist!",
        });
        setError("No emojis provided for playlist generation.");
        setIsLoading(false);
        return;
      }
      const result = await generatePlaylist({ topEmojis });
      setPlaylist(result);
      toast({
        title: "Playlist Generated!",
        description: "Check out the new vibe.",
      });
    } catch (err) {
      console.error("Playlist generation error:", err);
      setError("Failed to generate playlist. Please try again.");
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Could not generate playlist at this moment.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Current top emojis: {topEmojis.join(" ")}
      </p>
      <Button onClick={handleGeneratePlaylist} disabled={isLoading || topEmojis.length === 0} className="w-full">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Wand2 className="mr-2 h-4 w-4" />
        )}
        Generate 5-Track Playlist
      </Button>

      {error && (
        <div className="text-destructive-foreground bg-destructive p-3 rounded-md flex items-center">
          <AlertTriangle className="mr-2 h-4 w-4" /> {error}
        </div>
      )}

      {playlist && playlist.tracks.length > 0 && (
        <Card className="mt-4 bg-card/70">
          <CardHeader>
            <CardTitle className="text-lg">Vibe Playlist</CardTitle>
            <CardDescription>Generated based on current emoji mood.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {playlist.tracks.map((track, index) => (
                <li key={index} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                  <Image 
                    src={`https://placehold.co/40x40.png?text=${index+1}`} 
                    alt="Album art placeholder" 
                    width={40} 
                    height={40} 
                    className="rounded"
                    data-ai-hint="album music"
                  />
                  <span className="font-medium">{track}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
