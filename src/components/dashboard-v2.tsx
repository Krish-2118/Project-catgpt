
"use client";

import { useState } from "react";
import type { z } from "zod";
import { PredictionResult, getIndiYieldPrediction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

import PredictionForm, { formSchema } from "./prediction-form";
import ResultsDisplay from "./results-display";
import ResultsSkeleton from "./results-skeleton";
import InitialState from "./initial-state";
import MarketPrices from "./market-prices";
import WeatherForecast from "./weather-forecast";
import CropStatistics from "./crop-statistics";

export default function DashboardV2() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [selectedRegion, setSelectedRegion] = useState("andhra-pradesh");

  const handleFormSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setResult(null);
    try {
      setSelectedRegion(data.region);
      const predictionResult = await getIndiYieldPrediction(data);
      setResult(predictionResult);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description:
          error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <PredictionForm onSubmit={handleFormSubmit} isLoading={isLoading} />
      
      <div className="animate-in fade-in duration-500">
        {isLoading && <ResultsSkeleton />}
        {!isLoading && result && (
          <>
            <ResultsDisplay result={result} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              <div className="lg:col-span-2">
                <MarketPrices crop={result.predictedYield.split(' ')[1] || 'rice'} region={selectedRegion} />
              </div>
              <WeatherForecast region={selectedRegion} />
            </div>
            <div className="mt-8">
                <CropStatistics crop={result.predictedYield.split(' ')[1] || 'rice'} region={selectedRegion} />
            </div>
          </>
        )}
        {!isLoading && !result && <InitialState />}
      </div>
    </div>
  );
}
