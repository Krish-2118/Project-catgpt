
"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const mockData = [
  { name: '2019', yield: 2.5 },
  { name: '2020', yield: 2.8 },
  { name: '2021', yield: 2.6 },
  { name: '2022', yield: 3.1 },
  { name: '2023', yield: 3.0 },
  { name: '2024 (P)', yield: 3.2 },
];

export default function CropStatistics({ crop, region }: { crop: string, region: string }) {
    const regionLabel = region.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline text-xl">Historical Yield for {crop.charAt(0).toUpperCase() + crop.slice(1)}</CardTitle>
                <CardDescription>Yield data for {crop.charAt(0).toUpperCase() + crop.slice(1)} in {regionLabel} over the last 5 years.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mockData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: 'Yield (tons/hectare)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="yield" fill="hsl(var(--primary))" name="Yield (tons/hectare)" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
