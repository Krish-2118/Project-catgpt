// src/ai/flows/suggest-crop-hybrid.ts
'use server';

/**
 * @fileOverview Hybrid crop suggestion using Random Forest ML model + Genkit AI
 * Combines data-driven ML predictions with AI-powered contextual analysis
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { crops } from '@/lib/data';
import { 
  extractFeaturesFromDescription, 
  getMLPredictions,
  type CropFeatures 
} from '@/ai/ml/random-forest-model';

const SuggestCropInputSchema = z.object({
  landDescription: z.string().describe('A detailed description of the farm land, including soil type, water availability, location within Odisha, and any other relevant factors.'),
  region: z.string().describe('The region within India (e.g., Odisha).'),
});
export type SuggestCropInput = z.infer<typeof SuggestCropInputSchema>;

const SuggestedCropSchema = z.object({
  cropName: z.string().describe("The common name of the suggested crop."),
  cropKey: z.enum(crops.map(c => c.value) as [string, ...string[]]).describe("The corresponding key for the crop."),
  reason: z.string().describe("A brief reason why this crop is suitable for the described land."),
  mlConfidence: z.number().optional().describe("Confidence score from ML model (0-1)."),
  predictionSource: z.enum(['ml', 'ai', 'hybrid']).describe("Source of the prediction."),
});

const SuggestCropOutputSchema = z.object({
  suggestions: z.array(SuggestedCropSchema).describe('A list of top 3 crop suggestions combining ML and AI insights.'),
  mlFeatures: z.object({
    soilPH: z.number(),
    nitrogen: z.number(),
    phosphorus: z.number(),
    potassium: z.number(),
    temperature: z.number(),
    humidity: z.number(),
    rainfall: z.number(),
    soilType: z.string(),
  }).optional().describe('Extracted features used for ML prediction.'),
});

export type SuggestCropOutput = z.infer<typeof SuggestCropOutputSchema>;
export type SuggestedCrop = z.infer<typeof SuggestedCropSchema>;

export async function suggestCrop(input: SuggestCropInput): Promise<SuggestCropOutput> {
  return suggestCropHybridFlow(input);
}

// AI prompt that considers ML predictions
const prompt = ai.definePrompt({
  name: 'suggestCropHybridPrompt',
  input: { 
    schema: z.object({
      landDescription: z.string(),
      region: z.string(),
      mlPredictions: z.string(),
      extractedFeatures: z.string(),
    })
  },
  output: { 
    schema: z.object({
      suggestions: z.array(z.object({
        cropName: z.string(),
        cropKey: z.enum(crops.map(c => c.value) as [string, ...string[]]),
        reason: z.string(),
      })),
    })
  },
  prompt: `You are an expert agriculturalist specializing in the crops and soil conditions of Odisha, India.

  You have access to predictions from a machine learning model trained on soil and climate data, as well as extracted soil features from the farmer's land description. Use this information along with your agricultural expertise to provide the most accurate crop recommendations.

  **Land Description:** {{{landDescription}}}
  **Region:** {{{region}}}

  **ML Model Predictions (with confidence scores):**
  {{{mlPredictions}}}

  **Extracted Soil & Climate Features:**
  {{{extractedFeatures}}}

  **Available crops:** ${crops.map(c => `${c.label} (${c.value})`).join(', ')}

  Your task is to:
  1. Analyze the ML predictions and their confidence scores
  2. Consider the extracted soil and climate features
  3. Apply your agricultural knowledge about Odisha's conditions
  4. Provide the top 3 most suitable crop recommendations

  For each recommendation, provide:
  - The crop name and key
  - A detailed reason that references both ML insights and practical agricultural factors

  Balance the ML predictions with real-world factors like:
  - Market demand in Odisha
  - Traditional farming practices in the region
  - Water availability mentioned in the description
  - Risk factors and crop resilience

  Generate exactly 3 suggestions with specific, insightful reasons.`,
});

const suggestCropHybridFlow = ai.defineFlow(
  {
    name: 'suggestCropHybridFlow',
    inputSchema: SuggestCropInputSchema,
    outputSchema: SuggestCropOutputSchema,
  },
  async (input) => {
    console.log('🌾 Starting hybrid crop suggestion...');
    
    // Step 1: Extract features from land description
    const features = extractFeaturesFromDescription(input.landDescription, input.region);
    console.log('📊 Extracted features:', features);

    // Step 2: Get ML model predictions
    const mlPredictions = getMLPredictions(features);
    console.log('🤖 ML Predictions:', mlPredictions);

    // Step 3: Format ML predictions for AI context
    const mlPredictionsText = mlPredictions
      .slice(0, 5)
      .map((pred, idx) => `${idx + 1}. ${pred.crop} (confidence: ${(pred.confidence * 100).toFixed(1)}%)`)
      .join('\n');

    const extractedFeaturesText = `
- Soil Type: ${features.soilType}
- Soil pH: ${features.soilPH.toFixed(1)}
- Nitrogen: ${features.nitrogen.toFixed(0)} kg/ha
- Phosphorus: ${features.phosphorus.toFixed(0)} kg/ha
- Potassium: ${features.potassium.toFixed(0)} kg/ha
- Temperature: ${features.temperature.toFixed(1)}°C
- Humidity: ${features.humidity.toFixed(0)}%
- Rainfall: ${features.rainfall.toFixed(0)} cm
    `.trim();

    // Step 4: Get AI recommendations considering ML predictions
    const { output: aiOutput } = await prompt({
      landDescription: input.landDescription,
      region: input.region,
      mlPredictions: mlPredictionsText,
      extractedFeatures: extractedFeaturesText,
    });

    // Step 5: Combine results and add ML confidence scores
    const mlPredictionMap = new Map(mlPredictions.map(p => [p.crop, p.confidence]));

    const enhancedSuggestions = aiOutput!.suggestions.map(suggestion => {
      const mlConfidence = mlPredictionMap.get(suggestion.cropKey);
      const predictionSource: 'ml' | 'ai' | 'hybrid' = 
        mlConfidence && mlConfidence > 0.3 ? 'hybrid' : 'ai';

      return {
        ...suggestion,
        mlConfidence,
        predictionSource,
      };
    });

    console.log('✅ Hybrid suggestions generated');

    return {
      suggestions: enhancedSuggestions,
      mlFeatures: features,
    };
  }
);
