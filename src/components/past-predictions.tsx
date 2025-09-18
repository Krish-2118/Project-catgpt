
"use client";

import { History } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockPastPredictions = [
  {
    id: "PRED-001",
    crop: "Rice",
    date: "2024-06-15",
    predictedYield: "3.5 t/ha",
    status: "harvested",
  },
  {
    id: "PRED-002",
    crop: "Cotton",
    date: "2024-05-20",
    predictedYield: "1.8 t/ha",
    status: "harvested",
  },
  {
    id: "PRED-003",
    crop: "Wheat",
    date: "2024-01-10",
    predictedYield: "2.9 t/ha",
    status: "harvested",
  },
   {
    id: "PRED-004",
    crop: "Maize",
    date: "2023-11-25",
    predictedYield: "4.1 t/ha",
    status: "harvested",
  },
];

export default function PastPredictions() {
    return (
        <Card className="shadow-lg h-full">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <History className="h-6 w-6 text-primary" />
                    <div>
                        <CardTitle className="font-headline text-xl">Prediction History</CardTitle>
                        <CardDescription>A log of your previous AI-driven predictions.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Crop</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Predicted Yield</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockPastPredictions.map((pred) => (
                            <TableRow key={pred.id}>
                                <TableCell className="font-medium">{pred.crop}</TableCell>
                                <TableCell>{pred.date}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary">{pred.status}</Badge>
                                </TableCell>
                                <TableCell className="text-right font-mono">{pred.predictedYield}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
