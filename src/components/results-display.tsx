"use client";

import { Leaf, Droplets, FlaskConical, Bug } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { PredictionResult } from "@/app/actions";

const recommendationIcons = {
  irrigation: <Droplets className="h-5 w-5 text-blue-500" />,
  fertilization: <FlaskConical className="h-5 w-5 text-green-500" />,
  pestControl: <Bug className="h-5 w-5 text-red-500" />,
};

export default function ResultsDisplay({
  results,
}: {
  results: PredictionResult;
}) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold font-headline">
          AI Prediction Results
        </CardTitle>
        <CardDescription>
          Your personalized yield forecast and recommendations are ready.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center p-6 bg-muted/50 rounded-lg">
          <p className="text-muted-foreground text-sm">Predicted Yield</p>
          <p className="text-4xl font-bold text-primary">
            {results.predictedYield}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary" /> Actionable Recommendations
          </h3>
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold">
                <div className="flex items-center gap-2">
                  {recommendationIcons.irrigation}
                  <span>Irrigation</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {results.recommendations.irrigation}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-semibold">
                 <div className="flex items-center gap-2">
                  {recommendationIcons.fertilization}
                  <span>Fertilization</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {results.recommendations.fertilization}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-semibold">
                 <div className="flex items-center gap-2">
                  {recommendationIcons.pestControl}
                  <span>Pest Control</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {results.recommendations.pestControl}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
}
