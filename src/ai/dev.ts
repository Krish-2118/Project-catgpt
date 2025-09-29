// src/ai/dev.ts
import { config } from 'dotenv';
config();

// Import existing flows
import '@/ai/flows/provide-actionable-recommendations.ts';
import '@/ai/flows/predict-crop-yields.ts';
import '@/ai/flows/get-market-intelligence.ts';

// Import hybrid crop suggestion (replaces old suggest-crop)
import '@/ai/flows/suggest-crop-hybrid.ts';

// Import tools
import '@/ai/tools/get-long-range-weather-forecast.ts';

// Import ML model initialization
import { initializeModel } from '@/ai/ml/random-forest-model';

// Initialize the Random Forest model on startup
console.log('🚀 Initializing AI services...');
initializeModel();
console.log('✅ Random Forest model initialized and ready');

// Optional: Run evaluation on startup (comment out in production)
if (process.env.NODE_ENV === 'development') {
  import('@/ai/ml/utils').then(({ evaluateModel, exportTrainingDataSummary }) => {
    console.log('\n📊 Running model evaluation...');
    evaluateModel();
    exportTrainingDataSummary();
    console.log('\n✅ Evaluation complete\n');
  });
}
