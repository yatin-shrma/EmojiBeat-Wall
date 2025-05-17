'use server';

/**
 * @fileOverview AI agent that suggests an initial theme based on a text prompt.
 *
 * - suggestInitialTheme - A function that suggests an initial theme for the party.
 * - SuggestInitialThemeInput - The input type for the suggestInitialTheme function.
 * - SuggestInitialThemeOutput - The return type for the suggestInitialTheme function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestInitialThemeInputSchema = z.object({
  themePrompt: z.string().describe('A text prompt describing the desired theme for the party.'),
});
export type SuggestInitialThemeInput = z.infer<typeof SuggestInitialThemeInputSchema>;

const SuggestInitialThemeOutputSchema = z.object({
  themeSuggestion: z.string().describe('A suggested theme based on the text prompt.'),
});
export type SuggestInitialThemeOutput = z.infer<typeof SuggestInitialThemeOutputSchema>;

export async function suggestInitialTheme(input: SuggestInitialThemeInput): Promise<SuggestInitialThemeOutput> {
  return suggestInitialThemeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestInitialThemePrompt',
  input: {schema: SuggestInitialThemeInputSchema},
  output: {schema: SuggestInitialThemeOutputSchema},
  prompt: `You are a party planning assistant. Based on the following theme prompt, suggest a theme for the party.\n\nTheme Prompt: {{{themePrompt}}}`,
});

const suggestInitialThemeFlow = ai.defineFlow(
  {
    name: 'suggestInitialThemeFlow',
    inputSchema: SuggestInitialThemeInputSchema,
    outputSchema: SuggestInitialThemeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
