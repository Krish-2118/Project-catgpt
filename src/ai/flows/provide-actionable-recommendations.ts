// src/ai/flows/provide-actionable-recommendations.ts
'use server';
/**
 * @fileOverview Provides tailored recommendations for irrigation, fertilization, and pest control based on predicted crop yields and regional conditions.
 *
 * - provideActionableRecommendations - A function that provides actionable recommendations for farmers.
 * - ProvideActionableRecommendationsInput - The input type for the provideActionableRecommendations function.
 * - ProvideActionableRecommendationsOutput - The return type for the provideActionableRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideActionableRecommendationsInputSchema = z.object({
  crop: z.string().describe('The type of crop.'),
  region: z.string().describe('The region where the farm is located.'),
  predictedYield: z.number().describe('The predicted crop yield (e.g., in tons per hectare).'),
  historicalWeatherData: z.string().describe('Historical weather data for the region.'),
  soilHealthMetrics: z.string().describe('Soil health metrics (e.g., pH, nutrient levels).'),
});
export type ProvideActionableRecommendationsInput = z.infer<typeof ProvideActionableRecommendationsInputSchema>;

const ProvideActionableRecommendationsOutputSchema = z.object({
  irrigationRecommendation: z.string().describe('Recommendation for irrigation practices.'),
  fertilizationRecommendation: z.string().describe('Recommendation for fertilization practices.'),
  pestControlRecommendation: z.string().describe('Recommendation for pest control measures.'),
});
export type ProvideActionableRecommendationsOutput = z.infer<typeof ProvideActionableRecommendationsOutputSchema>;

export async function provideActionableRecommendations(
  input: ProvideActionableRecommendationsInput
): Promise<ProvideActionableRecommendationsOutput> {
  return provideActionableRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideActionableRecommendationsPrompt',
  input: {schema: ProvideActionableRecommendationsInputSchema},
  output: {schema: ProvideActionableRecommendationsOutputSchema},
  prompt: `You are an expert agricultural advisor providing recommendations to farmers in India.

  Based on the following information, provide tailored recommendations for irrigation, fertilization, and pest control.

  Crop: {{{crop}}}
  Region: {{{region}}}
  Predicted Yield: {{{predictedYield}}}
  Historical Weather Data: {{{historicalWeatherData}}}
  Soil Health Metrics: {{{soilHealthMetrics}}}

  Provide specific and actionable advice for each of the following areas:

  Irrigation Recommendation:
  Fertilization Recommendation:
  Pest Control Recommendation:`,
});

const provideActionableRecommendationsFlow = ai.defineFlow(
  {
    name: 'provideActionableRecommendationsFlow',
    inputSchema: ProvideActionableRecommendationsInputSchema,
    outputSchema: ProvideActionableRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
