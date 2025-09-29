'use server';

/**
 * @fileOverview Suggests suitable crops based on land description.
 *
 * - suggestCrop - A function that suggests crops.
 * - SuggestCropInput - The input type for the suggestCrop function.
 * - SuggestCropOutput - The return type for the suggestCrop function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { crops } from '@/lib/data';

const SuggestCropInputSchema = z.object({
  landDescription: z.string().describe('A detailed description of the farm land, including soil type, water availability, location within Odisha, and any other relevant factors.'),
  region: z.string().describe('The region within India (e.g., Odisha).'),
});
export type SuggestCropInput = z.infer<typeof SuggestCropInputSchema>;

const SuggestedCropSchema = z.object({
    cropName: z.string().describe("The common name of the suggested crop."),
    cropKey: z.enum(crops.map(c => c.value) as [string, ...string[]]).describe("The corresponding key for the crop."),
    reason: z.string().describe("A brief reason why this crop is suitable for the described land."),
});

const SuggestCropOutputSchema = z.object({
    suggestions: z.array(SuggestedCropSchema).describe('A list of top 3 crop suggestions.'),
});
export type SuggestCropOutput = z.infer<typeof SuggestCropOutputSchema>;
export type SuggestedCrop = z.infer<typeof SuggestedCropSchema>;


export async function suggestCrop(input: SuggestCropInput): Promise<SuggestCropOutput> {
  return suggestCropFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCropPrompt',
  input: { schema: SuggestCropInputSchema },
  output: { schema: SuggestCropOutputSchema },
  prompt: `You are an expert agriculturalist specializing in the crops and soil conditions of Odisha, India.

  Based on the farmer's description of their land, your task is to suggest the top 3 most suitable crops to cultivate. For each suggestion, provide a brief, insightful reason explaining why it's a good fit.

  Land Description: {{{landDescription}}}
  Region: {{{region}}}

  Available crops to choose from: ${crops.map(c => `${c.label} (${c.value})`).join(', ')}.

  Generate exactly 3 suggestions. Ensure the reasons are specific to the provided land description and conditions in Odisha.
  `,
});

const suggestCropFlow = ai.defineFlow(
  {
    name: 'suggestCropFlow',
    inputSchema: SuggestCropInputSchema,
    outputSchema: SuggestCropOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
