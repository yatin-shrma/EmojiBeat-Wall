"use client";

import type { EmojiVote } from "@/app/host/party/[partyId]/page";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { analyzeEmojiTrends, AnalyzeEmojiTrendsOutput } from "@/ai/flows/analyze-emoji-trend";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Wand2, Loader2, AlertTriangle,Palette, Music2, SmilePlus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface TrendAnalyzerProps {
  emojiVotes: EmojiVote[];
}

export default function TrendAnalyzer({ emojiVotes }: TrendAnalyzerProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalyzeEmojiTrendsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [timePeriod, setTimePeriod] = useState("last 5 minutes");

  const handleAnalyzeTrends = async () => {
    setIsLoading(true);
    setAnalysis(null);
    setError(null);
    try {
      if (emojiVotes.length === 0) {
         toast({
          variant: "destructive",
          title: "No Emoji Data",
          description: "Not enough emoji data to analyze trends.",
        });
        setError("No emoji votes available for trend analysis.");
        setIsLoading(false);
        return;
      }
      const result = await analyzeEmojiTrends({ 
        emojiVotes: emojiVotes.map(ev => ({ emoji: ev.emoji, count: ev.count })), // Ensure structure matches AI input
        timePeriod 
      });
      setAnalysis(result);
      toast({
        title: "Trend Analysis Complete!",
        description: "Insights are ready.",
      });
    } catch (err) {
      console.error("Trend analysis error:", err);
      setError("Failed to analyze trends. Please try again.");
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Could not analyze trends at this moment.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2 items-center">
        <Select value={timePeriod} onValueChange={setTimePeriod}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last 5 minutes">Last 5 mins</SelectItem>
            <SelectItem value="last 15 minutes">Last 15 mins</SelectItem>
            <SelectItem value="last hour">Last hour</SelectItem>
            <SelectItem value="entire party">Entire Party</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleAnalyzeTrends} disabled={isLoading || emojiVotes.length === 0} className="w-full sm:flex-1">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          Analyze Trends
        </Button>
      </div>


      {error && (
         <div className="text-destructive-foreground bg-destructive p-3 rounded-md flex items-center">
          <AlertTriangle className="mr-2 h-4 w-4" /> {error}
        </div>
      )}

      {analysis && (
        <Card className="mt-4 bg-card/70">
          <CardHeader>
            <CardTitle className="text-lg">Vibe Analysis ({timePeriod})</CardTitle>
            <CardDescription>Insights based on emoji trends.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold flex items-center mb-1"><SmilePlus className="mr-2 h-5 w-5 text-primary" /> Dominant Themes:</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-0.5">
                {analysis.dominantThemes.map((theme, i) => <li key={i}>{theme}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold flex items-center mb-1"><Music2 className="mr-2 h-5 w-5 text-accent" /> Suggested Music Genres:</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-0.5">
                {analysis.suggestedMusicGenres.map((genre, i) => <li key={i}>{genre}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold flex items-center mb-1"><Palette className="mr-2 h-5 w-5 text-yellow-400" /> Suggested Lighting Colors:</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-0.5">
                {analysis.suggestedLightingColors.map((color, i) => <li key={i}>{color}</li>)}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
