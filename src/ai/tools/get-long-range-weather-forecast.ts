'use server';
/**
 * @fileOverview A tool for fetching a long-range weather forecast.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const getLongRangeWeatherForecast = ai.defineTool(
  {
    name: 'getLongRangeWeatherForecast',
    description: 'Provides a long-range weather forecast for a given region and season. Useful for improving crop yield predictions.',
    inputSchema: z.object({
      region: z.string().describe('The region in India for which to get the forecast (e.g., Odisha).'),
      season: z.string().describe('The sowing season for the forecast (e.g., Kharif, Rabi, Zaid).'),
    }),
    outputSchema: z.string(),
  },
  async (input) => {
    // In a real application, this would call a weather API (e.g., OpenWeatherMap, AccuWeather).
    // Here, we simulate the API call to return a realistic but generated forecast.
    console.log(`Fetching long-range forecast for ${input.region} during ${input.season} season.`);

    const forecasts = {
        kharif: [
            "Expect slightly above-average monsoon rainfall (+5%), with a delayed onset by 1 week.",
            "Temperature likely to be 0.5°C above normal. Increased risk of mid-season dry spells in August.",
            "Normal monsoon performance expected, with rainfall distributed evenly throughout the season.",
        ],
        rabi: [
            "A mild winter is predicted, with temperatures 1-2°C above average. Could impact wheat germination.",
            "Below-normal rainfall expected post-monsoon, potentially requiring additional irrigation.",
            "Expect a colder than usual winter with extended periods of fog in coastal districts.",
        ],
        zaid: [
            "Heatwave conditions are likely to be more frequent and intense.",
            "Early and intense pre-monsoon showers expected in May.",
            "A typical hot and dry summer season is forecasted.",
        ]
    };

    const seasonForecasts = forecasts[input.season.toLowerCase() as keyof typeof forecasts] || forecasts.kharif;
    const forecast = seasonForecasts[Math.floor(Math.random() * seasonForecasts.length)];

    return `Long-range forecast for the ${input.season} season in ${input.region}: ${forecast}`;
  }
);
