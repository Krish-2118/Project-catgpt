

"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Language } from '@/app/page';

const mockData = [
  { name: '2019', yield: 2.5, allCrops: 2.2 },
  { name: '2020', yield: 2.8, allCrops: 2.5 },
  { name: '2021', yield: 2.6, allCrops: 2.4 },
  { name: '2022', yield: 3.1, allCrops: 2.8 },
  { name: '2023', yield: 3.0, allCrops: 2.7 },
];

export default function CropStatistics({ crop, region, language, locales }: { crop: string, region: string, language: Language, locales: any }) {
    const t = locales[language].results.cropStatistics;

    const isAllCrops = crop === 'all';
    const regionLabel = region.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const cropLabel = isAllCrops ? t.allCrops : crop.charAt(0).toUpperCase() + crop.slice(1);
    
    const title = isAllCrops ? t.regionalTitle : `${t.historicalTitle} ${cropLabel}`;
    const description = isAllCrops ? `${t.regionalDescription} ${regionLabel}.` : `${t.historicalDescription} ${regionLabel} over the last 5 years.`;
    const dataKey = isAllCrops ? "allCrops" : "yield";
    const barName = isAllCrops ? t.avgYieldLabel : t.yieldLabel;


    return (
        <Card className="shadow-lg h-full">
            <CardHeader>
                <CardTitle className="font-headline text-xl">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mockData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: t.yieldLabel, angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey={dataKey} fill="hsl(var(--primary))" name={barName} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
