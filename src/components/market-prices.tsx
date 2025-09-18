"use client";

import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { MarketDataResult } from "@/app/actions";

const getChangeColor = (changeType: "increase" | "decrease") => {
    return changeType === "increase" ? "text-green-500" : "text-red-500";
}

const getChangeIcon = (changeType: "increase" | "decrease") => {
    return changeType === "increase" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
}

export default function MarketPrices({ marketData }: { marketData: MarketDataResult }) {
    return (
        <Card className="shadow-lg h-full">
            <CardHeader>
                <CardTitle className="font-headline text-xl">Market Intelligence</CardTitle>
                <CardDescription>Current prices for {marketData.prices[0] ? `your crop` : ''} in major local markets.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Mandi</TableHead>
                            <TableHead className="text-right">Price (per Quintal)</TableHead>
                            <TableHead className="text-right">24h Change</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {marketData.prices.map((price) => (
                            <TableRow key={price.market}>
                                <TableCell className="font-medium">{price.market}</TableCell>
                                <TableCell className="text-right font-mono">₹{price.price.toLocaleString('en-IN')}</TableCell>
                                <TableCell className={`text-right font-mono flex items-center justify-end gap-1 ${getChangeColor(price.changeType)}`}>
                                    {getChangeIcon(price.changeType)}
                                    {price.change.toFixed(2)}%
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                 <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-md mb-2">AI Analyst Corner</h4>
                    <p className="text-sm text-muted-foreground mb-2"><strong className="text-foreground">Trend Analysis:</strong> {marketData.trendAnalysis}</p>
                    <p className="text-sm text-muted-foreground"><strong className="text-foreground">Recommendation:</strong> {marketData.recommendation}</p>
                </div>
            </CardContent>
        </Card>
    );
}
