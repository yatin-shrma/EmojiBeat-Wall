// src/ai/flows/generate-playlist.ts
'use server';

/**
 * @fileOverview Generates a playlist based on the top emojis.
 *
 * - generatePlaylist - A function that generates a playlist based on the top emojis.
 * - GeneratePlaylistInput - The input type for the generatePlaylist function.
 * - GeneratePlaylistOutput - The return type for the generatePlaylist function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePlaylistInputSchema = z.object({
  topEmojis: z
    .array(z.string())
    .describe('The top emojis, in descending order of votes.'),
});

export type GeneratePlaylistInput = z.infer<typeof GeneratePlaylistInputSchema>;

const GeneratePlaylistOutputSchema = z.object({
  tracks: z
    .array(z.string())
    .length(5)
    .describe('Exactly five tracks that fit a party vibe matching the emojis.'),
});

export type GeneratePlaylistOutput = z.infer<typeof GeneratePlaylistOutputSchema>;

export async function generatePlaylist(input: GeneratePlaylistInput): Promise<GeneratePlaylistOutput> {
  return generatePlaylistFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePlaylistPrompt',
  input: {schema: GeneratePlaylistInputSchema},
  output: {schema: GeneratePlaylistOutputSchema},
  prompt: `You are a DJ specializing in reading the room and picking the perfect tracks.
Based on the top emojis, create a playlist of exactly five tracks that fit a "party vibe" matching those emojis. Return ONLY the track names. Do not return any extra preamble or postamble.

Top Emojis: {{#each topEmojis}}{{{this}}} {{/each}}`,
});

const generatePlaylistFlow = ai.defineFlow(
  {
    name: 'generatePlaylistFlow',
    inputSchema: GeneratePlaylistInputSchema,
    outputSchema: GeneratePlaylistOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
