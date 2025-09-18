'use server';

/**
 * @fileOverview Provides market intelligence for a given crop and region.
 * 
 * - getMarketIntelligence - A function that provides market intelligence.
 * - MarketIntelligenceInput - The input type for the getMarketIntelligence function.
 * - MarketIntelligenceOutput - The return type for the getMarketIntelligence function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MarketIntelligenceInputSchema = z.object({
  crop: z.string().describe('The crop to get market intelligence for.'),
  region: z.string().describe('The region to get market intelligence for.'),
});
export type MarketIntelligenceInput = z.infer<typeof MarketIntelligenceInputSchema>;

const MarketPriceSchema = z.object({
    market: z.string().describe("The name of the market location (mandi)."),
    price: z.number().describe("The current price per quintal in Indian Rupees."),
    change: z.number().describe("The percentage change in price over the last 24 hours."),
    changeType: z.enum(["increase", "decrease"]).describe("Whether the price has increased or decreased."),
});

const MarketIntelligenceOutputSchema = z.object({
    prices: z.array(MarketPriceSchema).describe('A list of current market prices from major markets in the region.'),
    trendAnalysis: z.string().describe('A brief analysis of the market trends for the crop.'),
    recommendation: z.string().describe('A recommendation for the farmer based on the market conditions.'),
});
export type MarketIntelligenceOutput = z.infer<typeof MarketIntelligenceOutputSchema>;


export async function getMarketIntelligence(input: MarketIntelligenceInput): Promise<MarketIntelligenceOutput> {
  return getMarketIntelligenceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getMarketIntelligencePrompt',
  input: { schema: MarketIntelligenceInputSchema },
  output: { schema: MarketIntelligenceOutputSchema },
  prompt: `You are an expert agricultural market analyst for the state of Odisha, India.

  Your task is to provide detailed market intelligence for a specific crop. Generate a list of realistic, current market prices from four major mandis within Odisha. Also provide a brief trend analysis and a concrete recommendation for the farmer.

  IMPORTANT: The generated values for prices and trends must be varied and not a repetition of previous answers.

  Crop: {{{crop}}}
  Region: {{{region}}}

  Generate exactly 4 market data points. Ensure the data is realistic for the specified crop and region.
  The trend analysis should be concise (2-3 sentences).
  The recommendation should be actionable for a farmer.
  `,
});

const getMarketIntelligenceFlow = ai.defineFlow(
  {
    name: 'getMarketIntelligenceFlow',
    inputSchema: MarketIntelligenceInputSchema,
    outputSchema: MarketIntelligenceOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
