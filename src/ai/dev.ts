import { config } from 'dotenv';
config();

import '@/ai/flows/provide-actionable-recommendations.ts';
import '@/ai/flows/predict-crop-yields.ts';
import '@/ai/flows/get-market-intelligence.ts';
import '@/ai/flows/suggest-crop.ts';
import '@/ai/tools/get-long-range-weather-forecast.ts';
