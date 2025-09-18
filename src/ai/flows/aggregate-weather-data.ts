'use server';

/**
 * @fileOverview This flow aggregates historical weather data from various APIs.
 *
 * - aggregateWeatherData - A function that orchestrates the weather data aggregation process.
 * - AggregateWeatherDataInput - The input type for the aggregateWeatherData function.
 * - AggregateWeatherDataOutput - The return type for the aggregateWeatherData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AggregateWeatherDataInputSchema = z.object({
  location: z.string().describe('The location for which to fetch weather data (e.g., city, region).'),
  startDate: z.string().describe('The start date for the historical weather data (YYYY-MM-DD).'),
  endDate: z.string().describe('The end date for the historical weather data (YYYY-MM-DD).'),
  dataSources: z.array(z.string()).describe('A list of weather data API sources to use.'),
});
export type AggregateWeatherDataInput = z.infer<typeof AggregateWeatherDataInputSchema>;

const AggregateWeatherDataOutputSchema = z.object({
  aggregatedData: z.string().describe('Aggregated and cleaned historical weather data in a suitable format (e.g., JSON, CSV).'),
});
export type AggregateWeatherDataOutput = z.infer<typeof AggregateWeatherDataOutputSchema>;

export async function aggregateWeatherData(input: AggregateWeatherDataInput): Promise<AggregateWeatherDataOutput> {
  return aggregateWeatherDataFlow(input);
}

const aggregateWeatherDataPrompt = ai.definePrompt({
  name: 'aggregateWeatherDataPrompt',
  input: {schema: AggregateWeatherDataInputSchema},
  output: {schema: AggregateWeatherDataOutputSchema},
  prompt: `You are an expert data analyst specializing in aggregating weather data.

You will fetch weather data from the specified data sources for the given location and date range, then clean and aggregate this data into a single, unified format.

Location: {{{location}}}
Start Date: {{{startDate}}}
End Date: {{{endDate}}}
Data Sources: {{{dataSources}}}

Provide the aggregated and cleaned data in JSON format.`, 
});

const aggregateWeatherDataFlow = ai.defineFlow(
  {
    name: 'aggregateWeatherDataFlow',
    inputSchema: AggregateWeatherDataInputSchema,
    outputSchema: AggregateWeatherDataOutputSchema,
  },
  async input => {
    const {output} = await aggregateWeatherDataPrompt(input);
    return output!;
  }
);
