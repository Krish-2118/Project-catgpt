
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Wheat, MapPin, Loader2, ArrowRight, ArrowLeft, Sprout, Wind, Droplet, Lightbulb, Tractor, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { crops, indianStates } from "@/lib/data";
import { DateRange } from "react-day-picker";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { getCropSuggestions, SuggestionResult } from "@/app/actions";
import { Skeleton } from "./ui/skeleton";
import { SuggestedCrop } from "@/ai/flows/suggest-crop";
import LandDetailsForm, { landDetailsSchema, LandDetailsValues } from "./land-details-form";


export const formSchema = z.object({
  landDetails: landDetailsSchema,
  crop: z.string().min(1, "Please select a crop."),
  region: z.string().min(1, "Please select a region."),
  dateRange: z.object(
    {
      from: z.date({ required_error: "Start date is required." }),
      to: z.date({ required_error: "End date is required." }),
    },
    { required_error: "Please select a date range." }
  ),
});

type PredictionFormProps = {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  isLoadingExternally: boolean;
};

const steps = [
    { id: 'land', name: 'Describe Land' },
    { id: 'crop', name: 'Select Crop' },
    { id: 'season', name: 'Growing Season' },
    { id: 'confirm', name: 'Get Prediction' },
]

const cropIcons: { [key: string]: React.ReactNode } = {
    rice: <Droplet className="h-8 w-8 text-primary/80"/>,
    wheat: <Wheat className="h-8 w-8 text-primary/80"/>,
    maize: <Sprout className="h-8 w-8 text-primary/80"/>,
    sugarcane: <Sprout className="h-8 w-8 text-primary/80"/>,
    cotton: <Wind className="h-8 w-8 text-primary/80"/>,
    default: <Wheat className="h-8 w-8 text-primary/80"/>
}


export default function PredictionForm({
  onSubmit,
  isLoadingExternally,
}: PredictionFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestionResult | null>(null);

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
    },
  });

  const { trigger, getValues, setValue } = form;
  
  const landDetailsToString = (details: LandDetailsValues): string => {
    return `The farm is located in ${details.district} district. The soil is primarily ${details.soilType}, with irrigation from ${details.irrigationSource}. The land topography is ${details.topography}.`;
  }

  const nextStep = async () => {
    let isValid = false;
    if (currentStep === 0) {
      isValid = await trigger("landDetails");
      if (isValid) {
        setIsLoading(true);
        try {
          const landDescription = landDetailsToString(getValues('landDetails'));
          const result = await getCropSuggestions(landDescription, getValues('region'));
          setSuggestions(result);
        } catch (e) {
            // Handle error appropriately
            console.error(e);
        } finally {
            setIsLoading(false);
        }
      }
    } else if (currentStep === 1) {
      isValid = await trigger("crop");
    } else if (currentStep === 2) {
      isValid = await trigger("dateRange");
    }
    
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };
  
  const selectedCrop = crops.find(c => c.value === getValues('crop'));
  const isFormLoading = isLoading || isLoadingExternally;

  return (
    <Card className="shadow-lg border-2 border-primary/10 overflow-hidden">
        <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle className="font-headline text-2xl">Get Your Yield Prediction</CardTitle>
                    <CardDescription>A guided experience to get your forecast for Odisha.</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground"/>
                    <span className="font-semibold">{indianStates.find(s => s.value === 'odisha')?.label}</span>
                </div>
            </div>
        </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => {
            const formData = {
                ...data,
                landDescription: landDetailsToString(data.landDetails),
            };
            onSubmit(formData as any);
          })} className="space-y-8">
            <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
            <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="land"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
                >
                <div className="text-center">
                    <h3 className="text-lg font-semibold">Step 1: Describe Your Land</h3>
                    <p className="text-muted-foreground">Provide details about your farmland for a more accurate prediction.</p>
                </div>
                <LandDetailsForm />
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="crop"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
                >
                <div className="text-center">
                    <h3 className="text-lg font-semibold">Step 2: Select Your Crop</h3>
                    <p className="text-muted-foreground">Based on your land, we suggest these crops. Choose one or select another from the list.</p>
                </div>
                
                 {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-48 w-full" />
                    </div>
                ) : (
                    suggestions && (
                        <div>
                        <h4 className="flex items-center gap-2 font-semibold mb-3 text-primary"><Lightbulb className="h-5 w-5"/> AI Suggestions</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          {suggestions.suggestions.map((suggestion: SuggestedCrop) => (
                            <Card 
                                key={suggestion.cropKey} 
                                onClick={() => setValue("crop", suggestion.cropKey, { shouldValidate: true })}
                                className={cn(
                                    "cursor-pointer transition-all hover:shadow-md flex flex-col",
                                    getValues('crop') === suggestion.cropKey ? "border-primary ring-2 ring-primary" : "border-border"
                                )}
                            >
                                <CardHeader className="flex-row items-center justify-between">
                                    <CardTitle className="text-lg">{suggestion.cropName}</CardTitle>
                                    {getValues('crop') === suggestion.cropKey && <Check className="h-5 w-5 text-primary" />}
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
                        <h4 className="flex items-center gap-2 font-semibold mb-3"><Tractor className="h-5 w-5"/> Or Choose Another Crop</h4>
                      <FormControl>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                          {crops.map((crop) => (
                            <Card 
                                key={crop.value} 
                                onClick={() => field.onChange(crop.value)}
                                className={cn(
                                    "cursor-pointer transition-all hover:shadow-md",
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
                      <FormMessage className="text-center" />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            {currentStep === 2 && (
                <motion.div
                key="season"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center space-y-4"
              >
                <h3 className="text-lg font-semibold">Step 3: Select the Growing Season</h3>
                <FormField
                  control={form.control}
                  name="dateRange"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <FormControl>
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={field.value?.from}
                          selected={field.value as DateRange}
                          onSelect={field.onChange}
                          numberOfMonths={2}
                          className="p-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}
            
            {currentStep === 3 && (
                 <motion.div
                    key="confirm"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="text-center space-y-6"
                 >
                    <h3 className="text-xl font-semibold">Confirm Your Selection</h3>
                     <div className="bg-muted/50 p-6 rounded-lg max-w-2xl mx-auto text-left space-y-4">
                        <h4 className="font-semibold mb-2 border-b pb-2">Land Details:</h4>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                            <p><strong className="text-muted-foreground">District:</strong> {getValues('landDetails.district')}</p>
                            <p><strong className="text-muted-foreground">Soil Type:</strong> {getValues('landDetails.soilType')}</p>
                             <p><strong className="text-muted-foreground">Irrigation:</strong> {getValues('landDetails.irrigationSource')}</p>
                            <p><strong className="text-muted-foreground">Topography:</strong> {getValues('landDetails.topography')}</p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-8">
                        <div className="text-center">
                            <p className="text-muted-foreground">Crop</p>
                            <p className="font-bold text-lg">{selectedCrop?.label}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-muted-foreground">Region</p>
                            <p className="font-bold text-lg">Odisha</p>
                        </div>
                         <div className="text-center">
                            <p className="text-muted-foreground">Season</p>
                             <p className="font-bold text-lg">
                                {getValues('dateRange.from') && format(getValues('dateRange.from'), "LLL dd, y")} - {' '}
                                {getValues('dateRange.to') && format(getValues('dateRange.to'), "LLL dd, y")}
                            </p>
                        </div>
                    </div>
                     <p className="text-muted-foreground max-w-md mx-auto">
                        You're all set! Click the button below to generate your personalized crop yield prediction and recommendations.
                    </p>
                </motion.div>
            )}
            </AnimatePresence>


            <div className="flex justify-between pt-4">
              {currentStep > 0 ? (
                <Button type="button" variant="outline" onClick={prevStep} disabled={isFormLoading}>
                  <ArrowLeft className="mr-2" />
                  Back
                </Button>
              ) : <div />}

              {currentStep < steps.length - 1 && (
                <Button type="button" onClick={nextStep} disabled={isFormLoading}>
                 { isLoading ? <> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Fetching Suggestions... </> : <> Next <ArrowRight className="ml-2" /> </>}
                </Button>
              )}

              {currentStep === steps.length - 1 && (
                <Button type="submit" disabled={isFormLoading} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                  {isLoadingExternally ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Get Prediction"
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

    