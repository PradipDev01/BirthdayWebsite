'use server';
/**
 * @fileOverview A flow to generate an image of a tulip.
 *
 * - generateTulipImage - A function that generates a tulip image.
 * - GenerateTulipImageOutput - The return type for the generateTulipImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTulipImageOutputSchema = z.object({
  imageUrl: z.string().describe('The URL of the generated tulip image as a data URI.'),
});
export type GenerateTulipImageOutput = z.infer<typeof GenerateTulipImageOutputSchema>;

export async function generateTulipImage(): Promise<GenerateTulipImageOutput> {
  return generateTulipImageFlow();
}

const generateTulipImageFlow = ai.defineFlow(
  {
    name: 'generateTulipImageFlow',
    outputSchema: GenerateTulipImageOutputSchema,
  },
  async () => {
    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: 'a single pink tulip with a transparent background, studio lighting, vector art',
      config: {
        safetySettings: [
            {
                category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                threshold: 'BLOCK_NONE',
            },
            {
                category: 'HARM_CATEGORY_HARASSMENT',
                threshold: 'BLOCK_NONE',
            },
            {
                category: 'HARM_CATEGORY_HATE_SPEECH',
                threshold: 'BLOCK_NONE',
            },
            {
                category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                threshold: 'BLOCK_NONE',
            }
        ]
      }
    });

    if (!media.url) {
      throw new Error('Image generation failed.');
    }

    return {
      imageUrl: media.url,
    };
  }
);
