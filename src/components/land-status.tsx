
"use client";

import { Thermometer, Droplets, Bug, FlaskConical, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const mockLandStatus = {
    soilMoisture: 65, // percentage
    nutrientLevels: {
        nitrogen: 78, // percentage
        phosphorus: 60, // percentage
        potassium: 85, // percentage
    },
    pestRisk: "low",
    diseaseRisk: "medium",
};

const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
        case 'low': return 'text-green-500';
        case 'medium': return 'text-yellow-500';
        case 'high': return 'text-red-500';
        default: return 'text-muted-foreground';
    }
}

export default function LandStatus() {
    const avgNutrientLevel = Math.round(
        (mockLandStatus.nutrientLevels.nitrogen +
         mockLandStatus.nutrientLevels.phosphorus +
         mockLandStatus.nutrientLevels.potassium) / 3
    );

    return (
        <Card className="shadow-lg h-full">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Thermometer className="h-6 w-6 text-primary" />
                    <div>
                        <CardTitle className="font-headline text-xl">Current Land Status</CardTitle>
                        <CardDescription>AI-powered field diagnosis.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                        <span className="flex items-center gap-2 text-muted-foreground"><Droplets className="h-4 w-4" /> Soil Moisture</span>
                        <span className="font-medium">{mockLandStatus.soilMoisture}%</span>
                    </div>
                    <Progress value={mockLandStatus.soilMoisture} className="h-2" />
                </div>
                <div className="space-y-2">
                     <div className="flex justify-between items-center text-sm">
                        <span className="flex items-center gap-2 text-muted-foreground"><FlaskConical className="h-4 w-4" /> Nutrient Levels</span>
                        <span className="font-medium">{avgNutrientLevel}%</span>
                    </div>
                    <Progress value={avgNutrientLevel} className="h-2" />
                </div>
                <div className="flex justify-between items-center text-sm pt-2">
                     <span className="flex items-center gap-2 text-muted-foreground"><Bug className="h-4 w-4" /> Pest Risk</span>
                     <span className={`font-semibold uppercase ${getRiskColor(mockLandStatus.pestRisk)}`}>{mockLandStatus.pestRisk}</span>
                </div>
                 <div className="flex justify-between items-center text-sm">
                     <span className="flex items-center gap-2 text-muted-foreground"><ShieldAlert className="h-4 w-4" /> Disease Risk</span>
                     <span className={`font-semibold uppercase ${getRiskColor(mockLandStatus.diseaseRisk)}`}>{mockLandStatus.diseaseRisk}</span>
                </div>
            </CardContent>
        </Card>
    );
}
