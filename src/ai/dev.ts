import { config } from 'dotenv';
config();

import '@/ai/flows/provide-actionable-recommendations.ts';
import '@/ai/flows/aggregate-weather-data.ts';
import '@/ai/flows/predict-crop-yields.ts';