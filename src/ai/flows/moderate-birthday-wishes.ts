'use server';

/**
 * @fileOverview A flow to moderate birthday wishes using AI.
 *
 * - moderateBirthdayWish - A function that moderates a birthday wish.
 * - ModerateBirthdayWishInput - The input type for the moderateBirthdayWish function.
 * - ModerateBirthdayWishOutput - The return type for the moderateBirthdayWish function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModerateBirthdayWishInputSchema = z.object({
  wishText: z.string().describe('The text of the birthday wish to moderate.'),
});
export type ModerateBirthdayWishInput = z.infer<typeof ModerateBirthdayWishInputSchema>;

const ModerateBirthdayWishOutputSchema = z.object({
  isAppropriate: z
    .boolean()
    .describe(
      'Whether the birthday wish is appropriate and does not contain offensive content.'
    ),
  reason: z
    .string()
    .optional()
    .describe('The reason why the wish was considered inappropriate.'),
});
export type ModerateBirthdayWishOutput = z.infer<typeof ModerateBirthdayWishOutputSchema>;

export async function moderateBirthdayWish(
  input: ModerateBirthdayWishInput
): Promise<ModerateBirthdayWishOutput> {
  return moderateBirthdayWishFlow(input);
}

const moderateBirthdayWishPrompt = ai.definePrompt({
  name: 'moderateBirthdayWishPrompt',
  input: {schema: ModerateBirthdayWishInputSchema},
  output: {schema: ModerateBirthdayWishOutputSchema},
  prompt: `You are an AI content moderator responsible for determining whether
a birthday wish is appropriate to be displayed on a public website.

Analyze the following birthday wish and determine if it contains any
offensive language, hate speech, or inappropriate content. If the wish is
appropriate, respond with isAppropriate set to true. If not, respond with
isAppropriate set to false and provide a brief reason.

Birthday Wish: {{{wishText}}}`,
});

const moderateBirthdayWishFlow = ai.defineFlow(
  {
    name: 'moderateBirthdayWishFlow',
    inputSchema: ModerateBirthdayWishInputSchema,
    outputSchema: ModerateBirthdayWishOutputSchema,
  },
  async input => {
    const {output} = await moderateBirthdayWishPrompt(input);
    return output!;
  }
);
