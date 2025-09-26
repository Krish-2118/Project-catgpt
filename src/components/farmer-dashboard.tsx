
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import PastPredictions from "./past-predictions";
import RevenueChart from "./revenue-chart";
import LandStatus from "./land-status";
import PredictionForm from "./prediction-form";
import { PredictionResult, MarketDataResult } from "@/app/actions";
import ResultsDisplay from "./results-display";
import MarketPrices from "./market-prices";
import CropStatistics from "./crop-statistics";
import { Button } from "./ui/button";
import Notifications from "./notifications";

type ViewState = 'DASHBOARD' | 'FORM' | 'RESULT';

export default function FarmerDashboard() {
  const [viewState, setViewState] = useState<ViewState>('DASHBOARD');
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [marketData, setMarketData] = useState<MarketDataResult | null>(null);
  const [formData, setFormData] = useState<any>(null);

  const handlePredictionComplete = (results: PredictionResult, marketData: MarketDataResult, submittedData: any) => {
    setPredictionResult(results);
    setMarketData(marketData);
    setFormData(submittedData);
    setViewState('RESULT');
  };

  const handleStartNew = () => {
    setPredictionResult(null);
    setMarketData(null);
    setFormData(null);
    setViewState('FORM');
  }
  
  const handleBackToDashboard = () => {
     setViewState('DASHBOARD');
  }

  const renderContent = () => {
    switch (viewState) {
      case 'FORM':
        return (
           <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <PredictionForm onPredictionComplete={handlePredictionComplete} onBack={handleBackToDashboard} />
           </motion.div>
        );
      case 'RESULT':
        return (
          <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Prediction Results</h2>
              <Button onClick={handleStartNew}>Start New Prediction</Button>
            </div>
            {predictionResult && <ResultsDisplay results={predictionResult} />}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {marketData && <MarketPrices marketData={marketData} />}
              </div>
              <div>
                {formData && <CropStatistics crop={formData.crop} region={formData.region} />}
              </div>
            </div>
          </motion.div>
        );
      case 'DASHBOARD':
      default:
        return (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
             <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="lg:col-span-2 bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 rounded-xl">
                  <div className="flex h-full">
                    <div className="flex flex-col justify-between p-6">
                        <div>
                          <h2 className="text-2xl font-bold">Ready for your next cycle?</h2>
                          <p className="text-muted-foreground mt-2 max-w-md">
                            Use our powerful AI to get detailed yield predictions and actionable
                            recommendations for your crops.
                          </p>
                        </div>
                        <Button size="lg" onClick={() => setViewState('FORM')} className="mt-4 w-fit">
                            <span>Start a New Prediction</span>
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                    </div>
                    <div className="hidden md:flex flex-1 items-center justify-center p-6">
                        <Leaf className="h-24 w-24 text-primary/50" />
                    </div>
                  </div>
                </div>
                <Notifications />
              </div>

              <div className="grid gap-8 md:grid-cols-7">
                <div className="md:col-span-4">
                  <RevenueChart />
                </div>
                <div className="md:col-span-3">
                   <LandStatus />
                </div>
              </div>

               <div className="grid gap-8">
                  <PastPredictions />
              </div>
          </motion.div>
        );
    }
  }

  return (
    <div className="flex-1 space-y-8">
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
    </div>
  );
}
