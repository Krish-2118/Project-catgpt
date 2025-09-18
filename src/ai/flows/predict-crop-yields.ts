'use server';
/**
 * @fileOverview Predicts crop yields based on historical data, weather patterns, and soil health metrics.
 *
 * - predictCropYields - A function that predicts crop yields.
 * - PredictCropYieldsInput - The input type for the predictCropYields function.
 * - PredictCropYieldsOutput - The return type for the predictCropYields function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getLongRangeWeatherForecast } from '../tools/get-long-range-weather-forecast';

const PredictCropYieldsInputSchema = z.object({
  cropType: z.string().describe('The type of crop to predict the yield for.'),
  region: z.string().describe('The region in India for which to predict the yield.'),
  landDescription: z.string().describe('A detailed description of the farm land, including soil type, topography, and location within the region.'),
  sowingSeason: z.string().describe('The sowing season (e.g., Kharif, Rabi, Zaid).'),
  historicalData: z.string().describe('Historical agricultural data for the specified crop and region.'),
  weatherPatterns: z.string().describe('Weather patterns for the specified region.'),
  soilHealthMetrics: z.string().describe('Soil health metrics for the specified region.'),
});
export type PredictCropYieldsInput = z.infer<typeof PredictCropYieldsInputSchema>;

const PredictCropYieldsOutputSchema = z.object({
  predictedYield: z.string().describe('The predicted crop yield for the specified crop and region.'),
  recommendations: z.string().describe('Actionable recommendations for farmers to optimize their farming practices.'),
});
export type PredictCropYieldsOutput = z.infer<typeof PredictCropYieldsOutputSchema>;

export async function predictCropYields(input: PredictCropYieldsInput): Promise<PredictCropYieldsOutput> {
  return predictCropYieldsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictCropYieldsPrompt',
  input: {schema: PredictCropYieldsInputSchema},
  output: {schema: PredictCropYieldsOutputSchema},
  tools: [getLongRangeWeatherForecast],
  prompt: `You are an expert agricultural advisor specializing in predicting crop yields in India.

  Based on the following information, predict the crop yield for the specified crop and region, and provide actionable recommendations for farmers to optimize their farming practices. Your prediction should be more specific and nuanced based on the detailed land description and sowing season provided.

  To improve your prediction, you can use the available tool to fetch the long-range weather forecast for the upcoming season.

  IMPORTANT: The generated values for yield and recommendations must be varied and not a repetition of previous answers.

  Crop Type: {{{cropType}}}
  Region: {{{region}}}
  Sowing Season: {{{sowingSeason}}}
  Land Description: {{{landDescription}}}
  Historical Data: {{{historicalData}}}
  Weather Patterns: {{{weatherPatterns}}}
  Soil Health Metrics: {{{soilHealthMetrics}}}

  Provide the predicted yield and recommendations in a clear and concise manner.
`,
});

const predictCropYieldsFlow = ai.defineFlow(
  {
    name: 'predictCropYieldsFlow',
    inputSchema: PredictCropYieldsInputSchema,
    outputSchema: PredictCropYieldsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
