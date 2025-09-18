"use client";

import { useState } from "react";
import type { z } from "zod";
import { PredictionResult, getIndiYieldPrediction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

import PredictionForm, { formSchema } from "./prediction-form";
import ResultsDisplay from "./results-display";
import ResultsSkeleton from "./results-skeleton";
import InitialState from "./initial-state";

export default function Dashboard() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setResult(null);
    try {
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
        {!isLoading && result && <ResultsDisplay result={result} />}
        {!isLoading && !result && <InitialState />}
      </div>
    </div>
  );
}
