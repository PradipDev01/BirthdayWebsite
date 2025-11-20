'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating a tulip-themed website.
 *
 * The flow takes the current page content as input and uses AI to suggest or implement visual enhancements related to tulips.
 * @fileOverview
 * - generateTulipTheme - A function that handles the theme generation process.
 * - GenerateTulipThemeInput - The input type for the generateTulipTheme function.
 * - GenerateTulipThemeOutput - The return type for the generateTulipTheme function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTulipThemeInputSchema = z.object({
  pageContent: z.string().describe('The current content of the webpage as a string.'),
});
export type GenerateTulipThemeInput = z.infer<typeof GenerateTulipThemeInputSchema>;

const GenerateTulipThemeOutputSchema = z.object({
  themeSuggestion: z.string().describe('A suggestion for theme enhancements related to tulips, described in CSS.'),
});
export type GenerateTulipThemeOutput = z.infer<typeof GenerateTulipThemeOutputSchema>;

export async function generateTulipTheme(input: GenerateTulipThemeInput): Promise<GenerateTulipThemeOutput> {
  return generateTulipThemeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTulipThemePrompt',
  input: {schema: GenerateTulipThemeInputSchema},
  output: {schema: GenerateTulipThemeOutputSchema},
  prompt: `You are an AI assistant specializing in creating beautiful and soothing website themes based on tulips.

  Analyze the current website content provided below and suggest CSS enhancements to incorporate tulip-related design elements, a cold pink theme, and overall aesthetic improvements.

  Current Website Content:
  {{pageContent}}

  Please provide CSS code for the suggested theme enhancements. Focus on colors, fonts, and graphical elements related to tulips. The theme should be very soothing looking.
`,
});

const generateTulipThemeFlow = ai.defineFlow(
  {
    name: 'generateTulipThemeFlow',
    inputSchema: GenerateTulipThemeInputSchema,
    outputSchema: GenerateTulipThemeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
