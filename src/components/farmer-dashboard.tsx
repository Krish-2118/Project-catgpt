
"use client";

import { useState } from "react";
import type { z } from "zod";
import { PredictionResult, getIndiYieldPrediction, MarketDataResult, getMarketData } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { ChevronsDown, ChevronsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"


import PredictionForm, { formSchema } from "./prediction-form";
import ResultsDisplay from "./results-display";
import ResultsSkeleton from "./results-skeleton";
import MarketPrices from "./market-prices";
import CropStatistics from "./crop-statistics";
import { indianStates } from "@/lib/data";
import PastPredictions from "./past-predictions";
import Notifications from "./notifications";
import InitialState from "./initial-state";

export default function FarmerDashboard() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [marketData, setMarketData] = useState<MarketDataResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMarketLoading, setIsMarketLoading] = useState(false);
  const { toast } = useToast();
  const [selectedRegion, setSelectedRegion] = useState("odisha");
  const [selectedCrop, setSelectedCrop] = useState("rice");
  const [isFormOpen, setIsFormOpen] = useState(true);


  const handleFormSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setResult(null);
    setMarketData(null);
    setIsMarketLoading(true);
    setIsFormOpen(false); // Close form on submission

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

  if (!result && !isLoading) {
    return <PredictionForm onSubmit={handleFormSubmit} isLoadingExternally={isLoading} />;
  }

  return (
    <div className="space-y-8">
        
        <div className="animate-in fade-in duration-500 space-y-8">
            {isLoading && <ResultsSkeleton />}
            {result && (
            <>
                <ResultsDisplay result={result} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <MarketPrices 
                            crop={selectedCrop} 
                            region={currentRegion?.label || "Odisha"}
                            marketData={marketData}
                            isLoading={isMarketLoading}
                        />
                    </div>
                     <div className="lg:col-span-1">
                        <CropStatistics crop={selectedCrop} region={currentRegion?.label || "Odisha"} />
                    </div>
                </div>
            </>
            )}
        </div>

         {result && 
          <div className="flex justify-center">
            <Button onClick={() => setResult(null)}>Make another prediction</Button>
          </div>
        }
    </div>
  );
}
