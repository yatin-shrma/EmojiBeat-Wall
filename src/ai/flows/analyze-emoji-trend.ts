// src/ai/flows/analyze-emoji-trend.ts
'use server';

/**
 * @fileOverview Analyzes trends in emoji votes over time to understand partygoers' preferences.
 *
 * - analyzeEmojiTrends - A function that analyzes emoji trends.
 * - AnalyzeEmojiTrendsInput - The input type for the analyzeEmojiTrends function.
 * - AnalyzeEmojiTrendsOutput - The return type for the analyzeEmojiTrends function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeEmojiTrendsInputSchema = z.object({
  emojiVotes: z
    .array(z.object({emoji: z.string(), count: z.number()}))
    .describe('An array of emoji votes with their counts.'),
  timePeriod: z
    .string()
    .describe(
      'The time period over which to analyze the emoji trends (e.g., last 5 minutes, last hour).' 
    ),
});
export type AnalyzeEmojiTrendsInput = z.infer<typeof AnalyzeEmojiTrendsInputSchema>;

const AnalyzeEmojiTrendsOutputSchema = z.object({
  dominantThemes: z
    .array(z.string())
    .describe(
      'A list of dominant themes or sentiments expressed by the emoji votes.'
    ),
  suggestedMusicGenres: z
    .array(z.string())
    .describe('Suggested music genres based on the emoji trends.'),
  suggestedLightingColors: z
    .array(z.string())
    .describe('Suggested lighting colors based on the emoji trends.'),
});
export type AnalyzeEmojiTrendsOutput = z.infer<typeof AnalyzeEmojiTrendsOutputSchema>;

export async function analyzeEmojiTrends(input: AnalyzeEmojiTrendsInput): Promise<AnalyzeEmojiTrendsOutput> {
  return analyzeEmojiTrendsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeEmojiTrendsPrompt',
  input: {schema: AnalyzeEmojiTrendsInputSchema},
  output: {schema: AnalyzeEmojiTrendsOutputSchema},
  prompt: `You are an AI assistant helping a party host understand the vibe of their party based on emoji votes.

You are provided with the emoji votes and their counts over a specific time period.

Emoji Votes ({{timePeriod}}):
{{#each emojiVotes}}
  {{emoji}}: {{count}}
{{/each}}

Based on these emoji trends, identify the dominant themes or sentiments, suggest music genres, and suggest lighting colors.

Dominant Themes:
{{dominantThemes}}

Suggested Music Genres:
{{suggestedMusicGenres}}

Suggested Lighting Colors:
{{suggestedLightingColors}}`,
});

const analyzeEmojiTrendsFlow = ai.defineFlow(
  {
    name: 'analyzeEmojiTrendsFlow',
    inputSchema: AnalyzeEmojiTrendsInputSchema,
    outputSchema: AnalyzeEmojiTrendsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
