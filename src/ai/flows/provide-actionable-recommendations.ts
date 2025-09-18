
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
  landDescription: z.string().describe('A detailed description of the farm land, including soil type, topography, and location within the region.'),
  predictedYield: z.number().describe('The predicted crop yield (e.g., in tons per hectare).'),
  weatherPatterns: z.string().describe('Weather patterns for the specified region.'),
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
  prompt: `You are an expert agronomist providing tailored advice to farmers in Odisha, India.

  Your task is to generate specific, actionable recommendations for irrigation, fertilization, and pest control. Your advice MUST be directly influenced by the detailed land and weather information provided. Do not give generic advice. Be detailed and provide a step-by-step guide where possible.

  IMPORTANT: The generated recommendations must be varied and not a repetition of previous answers.

  **Farm Details:**
  - Crop: {{{crop}}}
  - Region: {{{region}}}
  - Land Description: {{{landDescription}}}
  - Predicted Yield: {{{predictedYield}}} tons/hectare
  - Regional Weather Patterns: {{{weatherPatterns}}}

  **Your Recommendations:**

  - **Irrigation Recommendation:** Based on the crop's water needs, the land's irrigation source, soil type, and topography, provide a specific, phased irrigation schedule and method. For example: "For sandy soil with upcoming dry spells, recommend drip irrigation. Week 1-3 (Germination): Apply 5mm daily. Week 4-8 (Vegetative Growth): Increase to 8mm daily, monitoring for water stress..."
  
  - **Fertilization Recommendation:** Based on the soil type and crop, recommend a specific, multi-stage nutrient management plan (N-P-K ratio) and application timeline. Be specific about the type of fertilizer (e.g., urea, DAP, MOP) and the application stages. For example: "Basal Dose (at sowing): 50kg DAP, 25kg MOP per acre. First Top Dressing (30 days after sowing): 40kg Urea per acre..."

  - **Pest Control Recommendation:** Based on the crop, region, and common vulnerabilities, suggest a multi-layered integrated pest management (IPM) plan. Mention specific preventative measures, monitoring techniques, and locally available organic or chemical solutions as corrective actions. For example: "Preventative: Use neem oil spray every 15 days. Monitoring: Set up pheromone traps to monitor for stem borer moths. Corrective: If infestation exceeds 5% of plants, apply Chlorantraniliprole 18.5% SC..."`,
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
