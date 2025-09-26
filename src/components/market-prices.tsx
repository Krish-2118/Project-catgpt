
"use client";

import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { MarketDataResult } from "@/app/actions";
import type { Language } from "@/app/page";

const getChangeColor = (changeType: "increase" | "decrease") => {
    return changeType === "increase" ? "text-green-500" : "text-red-500";
}

const getChangeIcon = (changeType: "increase" | "decrease") => {
    return changeType === "increase" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
}

export default function MarketPrices({ marketData, language, locales }: { marketData: MarketDataResult, language: Language, locales: any }) {
    const t = locales[language].results.marketPrices;
    
    return (
        <Card className="shadow-lg h-full">
            <CardHeader>
                <CardTitle className="font-headline text-xl">{t.title}</CardTitle>
                <CardDescription>{t.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t.mandi}</TableHead>
                            <TableHead className="text-right">{t.price}</TableHead>
                            <TableHead className="text-right">{t.change}</TableHead>
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
                    <h4 className="font-semibold text-md mb-2">{t.analystCorner}</h4>
                    <p className="text-sm text-muted-foreground mb-2"><strong className="text-foreground">{t.trendAnalysis}</strong> {marketData.trendAnalysis}</p>
                    <p className="text-sm text-muted-foreground"><strong className="text-foreground">{t.recommendation}</strong> {marketData.recommendation}</p>
                </div>
            </CardContent>
        </Card>
    );
}
