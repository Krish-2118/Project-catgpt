
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Wheat, Loader2, ArrowRight, ArrowLeft, Lightbulb, Tractor, Check, Sun, Cloud, Droplets, Sprout, Leaf, Wind, Cherry, Carrot } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { crops } from "@/lib/data";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { getCropSuggestions, SuggestionResult, getIndiYieldPrediction, PredictionResult, getMarketData, MarketDataResult } from "@/app/actions";
import { Skeleton } from "./ui/skeleton";
import { SuggestedCrop } from "@/ai/flows/suggest-crop";
import LandDetailsForm, { landDetailsSchema } from "./land-details-form";
import { useToast } from "@/hooks/use-toast";
import type { Language } from "@/app/page";


export const formSchema = z.object({
  landDetails: landDetailsSchema,
  crop: z.string().min(1, "Please select a crop."),
  region: z.string().min(1, "Please select a region."),
  sowingSeason: z.string().min(1, "Please select a sowing season."),
});

type PredictionFormProps = {
  onPredictionComplete: (prediction: PredictionResult, marketData: MarketDataResult, formData: any) => void;
  onBack: () => void;
  language: Language;
  locales: any;
};

const cropIcons: { [key: string]: React.ReactNode } = {
    rice: <Droplets className="h-8 w-8 text-blue-400"/>,
    wheat: <Wheat className="h-8 w-8 text-yellow-600"/>,
    maize: <Sprout className="h-8 w-8 text-green-500"/>,
    sugarcane: <Leaf className="h-8 w-8 text-green-600"/>,
    cotton: <Wind className="h-8 w-8 text-gray-200"/>,
    soybean: <Sprout className="h-8 w-8 text-yellow-500"/>,
    potato: <Carrot className="h-8 w-8 text-amber-700"/>,
    mustard: <Sprout className="h-8 w-8 text-yellow-400"/>,
    jute: <Leaf className="h-8 w-8 text-lime-600"/>,
    tomato: <Cherry className="h-8 w-8 text-red-500"/>,
    default: <Wheat className="h-8 w-8 text-yellow-600"/>
}

const seasons = [
    { id: 'kharif', name: 'Kharif (Monsoon)', icon: <Cloud className="h-8 w-8 text-blue-400"/>, description: "June - Oct" },
    { id: 'rabi', name: 'Rabi (Winter)', icon: <Sun className="h-8 w-8 text-yellow-400"/>, description: "Oct - Mar" },
    { id: 'zaid', name: 'Zaid (Summer)', icon: <Sun className="h-8 w-8 text-orange-400"/>, description: "Mar - June" },
]


export default function PredictionForm({ onPredictionComplete, onBack, language, locales }: PredictionFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestionResult | null>(null);
  const { toast } = useToast();

  const t = locales[language].form;

  const steps = [
    { id: 'land', name: t.steps.land },
    { id: 'crop', name: t.steps.crop },
    { id: 'season', name: t.steps.season },
    { id: 'confirm', name: t.steps.confirm },
  ]

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      landDetails: {
        soilType: "",
        irrigationSource: "",
        topography: "",
        district: "",
      },
      crop: "",
      region: "odisha",
      sowingSeason: "",
    },
  });

  const { trigger, getValues, setValue } = form;
  
  const landDetailsToString = (details: z.infer<typeof landDetailsSchema>): string => {
    return `The farm is located in ${details.district} district, Odisha. The soil is primarily ${details.soilType}, with irrigation from ${details.irrigationSource}. The land topography is ${details.topography}.`;
  }
  
  const handleFinalSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    toast({
        title: "Generating your AI prediction...",
        description: "This may take a moment. The AI is analyzing your data.",
    });
    try {
        // 1. Predict Crop Yield first
        const predictionOutput = await getIndiYieldPrediction(data);
        
        // 2. Then get market data
        const marketData = await getMarketData(data.crop, data.region);

        toast({
            title: "Prediction Complete!",
            description: "Your personalized results are ready.",
        });
        onPredictionComplete(predictionOutput, marketData, data);
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


  const nextStep = async () => {
    let isValid = false;
    if (currentStep === 0) {
      isValid = await trigger("landDetails");
      if (isValid) {
        setIsSuggesting(true);
        try {
          const landDescription = landDetailsToString(getValues('landDetails'));
          const result = await getCropSuggestions(landDescription, getValues('region'));
          setSuggestions(result);
        } catch (e) {
            console.error(e);
            toast({
                variant: "destructive",
                title: "Could not get suggestions",
                description: "There was an issue with the AI. Please proceed by selecting a crop manually.",
            });
        } finally {
            setIsSuggesting(false);
        }
      }
    } else if (currentStep === 1) {
      isValid = await trigger("crop");
    } else if (currentStep === 2) {
      isValid = await trigger("sowingSeason");
    } else if (currentStep === 3) {
        isValid = true;
    }
    
    if (isValid && currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };
  
  const selectedCrop = crops.find(c => c.value === getValues('crop'));

  return (
    <div className="w-full max-w-4xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFinalSubmit)} className="space-y-8">
            <Progress value={((currentStep + 1) / (steps.length)) * 100} className="h-2" />
            <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="land"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
                >
                <div className="text-center">
                    <h2 className="text-3xl font-bold">{t.land.title}</h2>
                    <p className="text-muted-foreground mt-2">{t.land.description}</p>
                </div>
                <LandDetailsForm language={language} locales={locales}/>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="crop"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
                >
                <div className="text-center">
                    <h3 className="text-2xl font-bold">{t.crop.title}</h3>
                    <p className="text-muted-foreground mt-1">{t.crop.description}</p>
                </div>
                
                 {isSuggesting ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-48 w-full" />
                    </div>
                ) : (
                    suggestions && (
                        <div>
                        <h4 className="flex items-center gap-2 font-semibold mb-3 text-primary"><Lightbulb className="h-5 w-5"/> {t.crop.suggestions}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          {suggestions.suggestions.map((suggestion: SuggestedCrop) => (
                            <Card 
                                key={suggestion.cropKey} 
                                onClick={() => setValue("crop", suggestion.cropKey, { shouldValidate: true })}
                                className={cn(
                                    "cursor-pointer transition-all hover:shadow-lg flex flex-col bg-card",
                                    getValues('crop') === suggestion.cropKey ? "border-primary ring-2 ring-primary" : "border-border"
                                )}
                            >
                                <CardHeader className="flex-row items-start justify-between pb-2">
                                    <CardTitle className="text-lg">{suggestion.cropName}</CardTitle>
                                    <div className="h-7 w-7 rounded-full flex items-center justify-center bg-transparent">
                                        {getValues('crop') === suggestion.cropKey && <Check className="h-5 w-5 text-primary" />}
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                   <p className="text-sm text-muted-foreground">{suggestion.reason}</p>
                                </CardContent>
                            </Card>
                          ))}
                        </div>
                        </div>
                    )
                )}

                <FormField
                  control={form.control}
                  name="crop"
                  render={({ field }) => (
                    <FormItem>
                        <h4 className="flex items-center gap-2 font-semibold mb-3"><Tractor className="h-5 w-5"/> {t.crop.other}</h4>
                      <FormControl>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                          {crops.map((crop) => (
                            <Card 
                                key={crop.value} 
                                onClick={() => field.onChange(crop.value)}
                                className={cn(
                                    "cursor-pointer transition-all hover:shadow-md bg-card",
                                    field.value === crop.value ? "border-primary ring-2 ring-primary" : "border-border"
                                )}
                            >
                                <CardContent className="p-4 flex flex-col items-center justify-center gap-2 aspect-square">
                                   {cropIcons[crop.value] || cropIcons.default}
                                   <span className="font-semibold text-center">{crop.label}</span>
                                </CardContent>
                            </Card>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage className="text-center pt-4" />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            {currentStep === 2 && (
                <motion.div
                    key="season"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                >
                    <div className="text-center">
                        <h3 className="text-2xl font-bold">{t.season.title}</h3>
                        <p className="text-muted-foreground mt-1">{t.season.description}</p>
                    </div>
                    <FormField
                        control={form.control}
                        name="sowingSeason"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                                        {seasons.map((season) => (
                                            <Card
                                                key={season.id}
                                                onClick={() => field.onChange(season.id)}
                                                className={cn(
                                                    "cursor-pointer transition-all hover:shadow-lg text-center bg-card",
                                                    field.value === season.id ? "border-primary ring-2 ring-primary" : "border-border"
                                                )}
                                            >
                                                <CardContent className="p-6 flex flex-col items-center justify-center gap-3 aspect-[4/3]">
                                                    {season.icon}
                                                    <span className="font-semibold text-lg">{season.name}</span>
                                                    <span className="text-muted-foreground text-sm">{season.description}</span>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </FormControl>
                                <FormMessage className="text-center pt-4" />
                            </FormItem>
                        )}
                    />
                </motion.div>
            )}
            
            {currentStep === 3 && (
                 <motion.div
                    key="confirm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-center space-y-6"
                 >
                    <h3 className="text-2xl font-bold">{t.confirm.title}</h3>
                     <Card className="max-w-2xl mx-auto text-left bg-card/50">
                        <CardHeader>
                            <CardTitle>{t.confirm.summaryTitle}</CardTitle>
                            <CardDescription>{t.confirm.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-4">
                            <h4 className="font-semibold mb-2 border-b pb-2">{t.confirm.landDetails}</h4>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm capitalize">
                                <p><strong className="text-muted-foreground">{t.confirm.district}:</strong> {getValues('landDetails.district')}</p>
                                <p><strong className="text-muted-foreground">{t.confirm.soilType}:</strong> {getValues('landDetails.soilType')}</p>
                                <p><strong className="text-muted-foreground">{t.confirm.irrigation}:</strong> {getValues('landDetails.irrigationSource').replace('/', ' / ')}</p>
                                <p><strong className="text-muted-foreground">{t.confirm.topography}:</strong> {getValues('landDetails.topography')}</p>
                            </div>
                             <div className="flex justify-around items-center pt-4 border-t mt-4">
                                <div className="text-center">
                                    <p className="text-muted-foreground text-sm">{t.confirm.crop}</p>
                                    <p className="font-bold text-lg">{selectedCrop?.label}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-muted-foreground text-sm">{t.confirm.region}</p>
                                    <p className="font-bold text-lg capitalize">{getValues('region')}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-muted-foreground text-sm">{t.confirm.season}</p>
                                    <p className="font-bold text-lg capitalize">
                                        {getValues('sowingSeason')}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                     <p className="text-muted-foreground max-w-md mx-auto">
                        {t.confirm.cta}
                    </p>
                </motion.div>
            )}
            </AnimatePresence>


            <div className="flex justify-between pt-8">
              {currentStep > 0 ? (
                <Button type="button" variant="outline" onClick={prevStep} disabled={isLoading}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t.buttons.back}
                </Button>
              ) : <Button type="button" variant="ghost" onClick={onBack} disabled={isLoading}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t.buttons.backToDashboard}
                </Button>}

              {currentStep < steps.length - 1 && (
                <Button type="button" onClick={nextStep} disabled={isSuggesting} size="lg">
                 { isSuggesting ? <> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t.buttons.fetchingSuggestions} </> : <> {t.buttons.next} <ArrowRight className="ml-2 h-4 w-4" /> </>}
                </Button>
              )}

              {currentStep === steps.length - 1 && (
                <Button type="submit" disabled={isLoading} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t.buttons.generatingPrediction}
                    </>
                  ) : (
                    <>
                      <Lightbulb className="mr-2 h-5 w-5"/>
                      {t.buttons.getPrediction}
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
    </div>
  );
}
