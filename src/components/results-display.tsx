import { PredictionResult } from "@/app/actions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Droplets, Sprout, Bug } from "lucide-react";

type ResultsDisplayProps = {
  result: PredictionResult;
};

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
  const { predictedYield, recommendations } = result;

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <Card className="md:col-span-1 shadow-lg h-fit">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Predicted Yield</CardTitle>
          <CardDescription>Based on the provided parameters.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-primary">{predictedYield.match(/(\d+(\.\d+)?\s*\w+\/\w+)/)?.[0] || predictedYield}</p>
          <p className="text-sm text-muted-foreground mt-2">{predictedYield.replace(/(\d+(\.\d+)?\s*\w+\/\w+)/, '')}</p>
        </CardContent>
      </Card>
      <div className="md:col-span-2">
         <h2 className="text-2xl font-bold font-headline mb-4">Actionable Recommendations</h2>
        <Accordion type="single" collapsible defaultValue="irrigation" className="w-full">
          <AccordionItem value="irrigation" className="bg-card rounded-lg mb-4 border shadow-sm">
            <AccordionTrigger className="px-6 text-lg hover:no-underline">
              <div className="flex items-center gap-3">
                <Droplets className="h-6 w-6 text-blue-500" />
                <span>Irrigation</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 text-base">
              {recommendations.irrigation}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="fertilization" className="bg-card rounded-lg mb-4 border shadow-sm">
            <AccordionTrigger className="px-6 text-lg hover:no-underline">
              <div className="flex items-center gap-3">
                <Sprout className="h-6 w-6 text-green-600" />
                <span>Fertilization</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 text-base">
              {recommendations.fertilization}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="pest-control" className="bg-card rounded-lg border shadow-sm">
            <AccordionTrigger className="px-6 text-lg hover:no-underline">
              <div className="flex items-center gap-3">
                <Bug className="h-6 w-6 text-red-500" />
                <span>Pest Control</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 text-base">
              {recommendations.pestControl}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
