
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Wheat, MapPin, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { crops, indianStates } from "@/lib/data";
import { DateRange } from "react-day-picker";
import { Progress } from "@/components/ui/progress";

export const formSchema = z.object({
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
  isLoading: boolean;
};

const steps = [
    { id: 'crop', name: 'Select Crop' },
    { id: 'season', name: 'Growing Season' },
    { id: 'confirm', name: 'Get Prediction' },
]

export default function PredictionForm({
  onSubmit,
  isLoading,
}: PredictionFormProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      crop: "",
      region: "odisha",
    },
  });

  const { trigger, getValues } = form;

  const nextStep = async () => {
    let isValid = false;
    if (currentStep === 0) {
      isValid = await trigger("crop");
    } else if (currentStep === 1) {
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
            
            {currentStep === 0 && (
              <motion.div
                key="crop"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
                >
                <h3 className="text-lg font-semibold text-center">Step 1: Select Your Crop</h3>
                <FormField
                  control={form.control}
                  name="crop"
                  render={({ field }) => (
                    <FormItem>
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
                                <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                                   <Wheat className="h-8 w-8 text-primary/80"/>
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

            {currentStep === 1 && (
                <motion.div
                key="season"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center space-y-4"
              >
                <h3 className="text-lg font-semibold">Step 2: Select the Growing Season</h3>
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
            
            {currentStep === 2 && (
                 <motion.div
                    key="confirm"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="text-center space-y-6"
                 >
                    <h3 className="text-xl font-semibold">Confirm Your Selection</h3>
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


            <div className="flex justify-between pt-4">
              {currentStep > 0 && (
                <Button type="button" variant="outline" onClick={prevStep} disabled={isLoading}>
                  <ArrowLeft className="mr-2" />
                  Back
                </Button>
              )}
              <div/>

              {currentStep < steps.length - 1 && (
                <Button type="button" onClick={nextStep}>
                  Next
                  <ArrowRight className="ml-2" />
                </Button>
              )}

              {currentStep === steps.length - 1 && (
                <Button type="submit" disabled={isLoading} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                  {isLoading ? (
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

// Dummy motion component for syntax, since framer-motion is not installed
const motion = {
    div: ({ children, ...props }: { children: React.ReactNode, [key: string]: any }) => <div {...props}>{children}</div>
};
