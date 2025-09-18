
"use client";

import { useState, useEffect } from "react";
import type { z } from "zod";
import { PredictionResult, getIndiYieldPrediction, MarketDataResult, getMarketData } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

import PredictionForm, { formSchema } from "./prediction-form";
import ResultsDisplay from "./results-display";
import ResultsSkeleton from "./results-skeleton";
import InitialState from "./initial-state";
import MarketPrices from "./market-prices";
import WeatherForecast from "./weather-forecast";
import CropStatistics from "./crop-statistics";
import { indianStates } from "@/lib/data";

export default function DashboardV2() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [marketData, setMarketData] = useState<MarketDataResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMarketLoading, setIsMarketLoading] = useState(false);
  const { toast } = useToast();
  const [selectedRegion, setSelectedRegion] = useState("odisha");
  const [selectedCrop, setSelectedCrop] = useState("rice");


  const handleFormSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setResult(null);
    setMarketData(null);
    setIsMarketLoading(true);

    try {
      setSelectedRegion(data.region);
      setSelectedCrop(data.crop);
      const predictionResult = await getIndiYieldPrediction(data);
      setResult(predictionResult);

      const currentRegionLabel = indianStates.find(s => s.value === data.region)?.label || "Odisha";
      const marketResult = await getMarketData(data.crop, currentRegionLabel);
      setMarketData(marketResult);

    } catch (error) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description:
          error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setIsLoading(false);
      setIsMarketLoading(false);
    }
  };
  
  const currentRegion = indianStates.find(s => s.value === selectedRegion);

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
                <MarketPrices 
                    crop={selectedCrop} 
                    region={currentRegion?.label || "Odisha"}
                    marketData={marketData}
                    isLoading={isMarketLoading}
                />
              </div>
              <WeatherForecast region={currentRegion?.label || "Odisha"} />
            </div>
            <div className="mt-8">
                <CropStatistics crop={selectedCrop} region={currentRegion?.label || "Odisha"} />
            </div>
          </>
        )}
        {!isLoading && !result && <InitialState />}
      </div>
    </div>
  );
}
