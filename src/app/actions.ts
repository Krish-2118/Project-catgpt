"use server";

import { z } from "zod";
import { predictCropYields } from "@/ai/flows/predict-crop-yields";
import { provideActionableRecommendations } from "@/ai/flows/provide-actionable-recommendations";

const formSchema = z.object({
  crop: z.string().min(1, "Please select a crop."),
  region: z.string().min(1, "Please select a region."),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

export type PredictionResult = {
  predictedYield: string;
  recommendations: {
    irrigation: string;
    fertilization: string;
    pestControl: string;
  };
};

// Helper function to extract a number from a string
const parseYield = (yieldString: string): number => {
    const match = yieldString.match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[0]) : 0;
};

export async function getIndiYieldPrediction(
  data: z.infer<typeof formSchema>
): Promise<PredictionResult> {
  try {
    const { crop, region, dateRange } = data;

    // In a real application, these would be fetched from various data sources/APIs
    const mockHistoricalData = `Historical data for ${crop} in ${region} shows an average yield of 2.8 tons/hectare.`;
    const mockWeatherPatterns = `The region of ${region} typically experiences a monsoon season from June to September.`;
    const mockSoilHealthMetrics = `Soil in ${region} is predominantly alluvial with a pH of 7.2.`;
    const mockLongRangeForecast = `The forecast for the period ${dateRange.from.toDateString()} to ${dateRange.to.toDateString()} predicts slightly above-average rainfall.`;

    // 1. Predict Crop Yield
    const predictionOutput = await predictCropYields({
      cropType: crop,
      region: region,
      historicalData: mockHistoricalData,
      weatherPatterns: mockWeatherPatterns,
      soilHealthMetrics: mockSoilHealthMetrics,
      longRangeWeatherForecast: mockLongRangeForecast,
    });

    const predictedYieldValue = parseYield(predictionOutput.predictedYield);
    
    // 2. Get Actionable Recommendations
    const recommendationsOutput = await provideActionableRecommendations({
        crop: crop,
        region: region,
        predictedYield: predictedYieldValue,
        historicalWeatherData: mockWeatherPatterns, // Reusing for simplicity
        soilHealthMetrics: mockSoilHealthMetrics,
    });

    return {
      predictedYield: predictionOutput.predictedYield,
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
