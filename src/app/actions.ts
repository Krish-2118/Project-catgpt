"use server";

import { z } from "zod";
import { predictCropYields } from "@/ai/flows/predict-crop-yields";
import { provideActionableRecommendations } from "@/ai/flows/provide-actionable-recommendations";
import { getMarketIntelligence, MarketIntelligenceOutput } from "@/ai/flows/get-market-intelligence";
import { suggestCrop, SuggestCropOutput } from "@/ai/flows/suggest-crop";
import type { formSchema } from "@/components/prediction-form";


export type PredictionResult = {
  predictedYield: string;
  recommendations: {
    irrigation: string;
    fertilization: string;
    pestControl: string;
  };
};

export type MarketDataResult = MarketIntelligenceOutput;
export type SuggestionResult = SuggestCropOutput;


// Helper function to extract a number from a string
const parseYield = (yieldString: string): number => {
    const match = yieldString.match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[0]) : 2.8; // Return a default average if parsing fails
};

export async function getCropSuggestions(landDescription: string, region: string): Promise<SuggestionResult> {
    try {
        const suggestions = await suggestCrop({ landDescription, region });
        return suggestions;
    } catch (error) {
        console.error("Error in AI crop suggestion flow:", error);
        throw new Error("Failed to get crop suggestions. Please try again.");
    }
}


export async function getIndiYieldPrediction(
  data: z.infer<typeof formSchema>
): Promise<PredictionResult> {
  try {
    const { crop, region, sowingSeason, landDetails } = data;
    
    const landDescription = `The farm is located in ${landDetails.district} district. The soil is primarily ${landDetails.soilType}, with irrigation from ${landDetails.irrigationSource}. The land topography is ${landDetails.topography}.`;

    // In a real application, these would be fetched from various data sources/APIs
    // For this app, we simulate this by having the AI use tools or by providing context.
    const mockHistoricalData = `Historical data for ${crop} in ${region} shows an average yield of 2.8 tons/hectare.`;
    const mockWeatherPatterns = `The region of ${region} typically experiences a monsoon season from June to September, with Rabi and Zaid seasons having distinct weather patterns.`;
    const mockSoilHealthMetrics = `Soil in this part of ${region} is predominantly ${data.landDetails.soilType}.`;
    
    // 1. Predict Crop Yield and Get Recommendations in Parallel for speed
    const [predictionOutput, recommendationsOutput] = await Promise.all([
      predictCropYields({
        cropType: crop,
        region: region,
        sowingSeason: sowingSeason,
        landDescription: landDescription,
        historicalData: mockHistoricalData,
        weatherPatterns: mockWeatherPatterns,
        soilHealthMetrics: mockSoilHealthMetrics,
      }),
      provideActionableRecommendations({
          crop: crop,
          region: region,
          predictedYield: parseYield(mockHistoricalData), // Use a default average yield for the parallel recommendations run. This is key for speed.
          landDescription: landDescription,
          weatherPatterns: mockWeatherPatterns,
      })
    ]);

    return {
      predictedYield: `${predictionOutput.predictedYield} tons/hectare`,
      recommendations: {
        irrigation: recommendationsOutput.irrigationRecommendation,
        fertilization: recommendationsOutput.fertilizationRecommendation,
        pestControl: recommendationsOutput.pestControlRecommendation,
      },
    };
  } catch (error) {
    console.error("Error in AI prediction flow:", error);
    throw new Error("Failed to get prediction. Please try again.");
  }
}


export async function getMarketData(
  crop: string,
  region: string,
): Promise<MarketDataResult> {
    try {
        const marketData = await getMarketIntelligence({ crop, region });
        return marketData;
    } catch (error) {
        console.error("Error in AI market data flow:", error);
        throw new Error("Failed to get market data. Please try again.");
  }
}
