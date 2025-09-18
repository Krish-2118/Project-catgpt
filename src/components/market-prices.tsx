
import { DollarSign, TrendingUp, TrendingDown, MapPin, BrainCircuit, BarChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MarketDataResult } from "@/app/actions";
import { Skeleton } from "./ui/skeleton";

type MarketPricesProps = {
    crop: string;
    region: string;
    marketData: MarketDataResult | null;
    isLoading: boolean;
}

export default function MarketPrices({ crop, region, marketData, isLoading }: MarketPricesProps) {
    const cropLabel = crop.charAt(0).toUpperCase() + crop.slice(1);
    
    return (
        <Card className="shadow-lg">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                         <DollarSign className="h-6 w-6 text-primary" />
                        <div>
                            <CardTitle className="font-headline text-xl">Live Market Prices for {cropLabel}</CardTitle>
                            <CardDescription>AI-generated mandi rates in major Odisha markets.</CardDescription>
                        </div>
                    </div>
                     <Badge variant="outline" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {region}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-16 w-full mt-4" />

                    </div>
                ) : marketData ? (
                    <>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Market</TableHead>
                                <TableHead className="text-right">Price (₹/Quintal)</TableHead>
                                <TableHead className="text-right">24h Change</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {marketData.prices.map((data) => (
                                <TableRow key={data.market}>
                                    <TableCell className="font-medium">{data.market}</TableCell>
                                    <TableCell className="text-right font-semibold">₹{data.price.toLocaleString()}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant={data.changeType === 'increase' ? 'default' : 'destructive'} className={`flex items-center justify-end gap-1 w-24 ${data.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {data.changeType === 'increase' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                                            {data.change.toFixed(1)}%
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="mt-6 space-y-4">
                        <div className="p-4 bg-muted/50 rounded-lg border">
                            <h4 className="flex items-center gap-2 font-semibold mb-2">
                                <BarChart className="h-5 w-5 text-primary"/>
                                Trend Analysis
                            </h4>
                            <p className="text-sm text-muted-foreground">{marketData.trendAnalysis}</p>
                        </div>
                         <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                            <h4 className="flex items-center gap-2 font-semibold mb-2 text-primary">
                                <BrainCircuit className="h-5 w-5"/>
                                AI Recommendation
                            </h4>
                            <p className="text-sm text-foreground">{marketData.recommendation}</p>
                        </div>
                    </div>
                    </>
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        Select a crop to see market data.
                    </div>
                )}

            </CardContent>
        </Card>
    )
}
