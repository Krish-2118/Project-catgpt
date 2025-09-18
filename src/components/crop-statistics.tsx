
"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const mockData = [
  { name: '2019', yield: 2.5, allCrops: 2.2 },
  { name: '2020', yield: 2.8, allCrops: 2.5 },
  { name: '2021', yield: 2.6, allCrops: 2.4 },
  { name: '2022', yield: 3.1, allCrops: 2.8 },
  { name: '2023', yield: 3.0, allCrops: 2.7 },
];

export default function CropStatistics({ crop, region }: { crop: string, region: string }) {
    const isAllCrops = crop === 'all';
    const regionLabel = region.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const cropLabel = isAllCrops ? 'All Crops' : crop.charAt(0).toUpperCase() + crop.slice(1);
    
    const title = isAllCrops ? `Regional Yield Averages` : `Historical Yield for ${cropLabel}`;
    const description = isAllCrops ? `Average yield for all major crops in ${regionLabel}.` : `Yield data in ${regionLabel} over the last 5 years.`;
    const dataKey = isAllCrops ? "allCrops" : "yield";
    const barName = isAllCrops ? "Avg. Yield (t/ha)" : "Yield (tons/hectare)";


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
                        <YAxis label={{ value: 'Yield (t/ha)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey={dataKey} fill="hsl(var(--primary))" name={barName} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
