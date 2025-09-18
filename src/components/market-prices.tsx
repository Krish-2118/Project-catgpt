
import { DollarSign, TrendingUp, TrendingDown, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockMarketData: { [key: string]: { market: string; price: number; change: number; changeType: string }[] } = {
    rice: [
        { market: "Bhubaneswar", price: 2050, change: 1.5, changeType: "increase" },
        { market: "Cuttack", price: 2020, change: -0.5, changeType: "decrease" },
        { market: "Puri", price: 2080, change: 2.3, changeType: "increase" },
        { market: "Sambalpur", price: 2040, change: 0.8, changeType: "increase" },
    ],
    wheat: [
        { market: "Bhubaneswar", price: 2200, change: -0.2, changeType: "decrease" },
        { market: "Cuttack", price: 2180, change: 1.1, changeType: "increase" },
        { market: "Puri", price: 2250, change: 0.5, changeType: "increase" },
        { market: "Sambalpur", price: 2210, change: -1.0, changeType: "decrease" },
    ],
    maize: [
        { market: "Bhubaneswar", price: 1800, change: 2.1, changeType: "increase" },
        { market: "Cuttack", price: 1780, change: 1.8, changeType: "increase" },
        { market: "Puri", price: 1820, change: -0.3, changeType: "decrease" },
        { market: "Sambalpur", price: 1790, change: 0.7, changeType: "increase" },
    ],
    default: [
        { market: "Bhubaneswar", price: 1950, change: 0.0, changeType: "increase" },
        { market: "Cuttack", price: 1920, change: 0.0, changeType: "decrease" },
        { market: "Puri", price: 1980, change: 0.0, changeType: "increase" },
        { market: "Sambalpur", price: 1940, change: 0.0, changeType: "increase" },
    ]
};


export default function MarketPrices({ crop, region }: { crop: string, region: string }) {
    const cropLabel = crop.charAt(0).toUpperCase() + crop.slice(1);
    const data = mockMarketData[crop] || mockMarketData.default;

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                         <DollarSign className="h-6 w-6 text-primary" />
                        <div>
                            <CardTitle className="font-headline text-xl">Live Market Prices for {cropLabel}</CardTitle>
                            <CardDescription>Current mandi rates in major Odisha markets.</CardDescription>
                        </div>
                    </div>
                     <Badge variant="outline" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {region}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Market</TableHead>
                            <TableHead className="text-right">Price (₹/Quintal)</TableHead>
                            <TableHead className="text-right">24h Change</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((data) => (
                            <TableRow key={data.market}>
                                <TableCell className="font-medium">{data.market}</TableCell>
                                <TableCell className="text-right font-semibold">₹{data.price.toLocaleString()}</TableCell>
                                <TableCell className="text-right">
                                    <Badge variant={data.changeType === 'increase' ? 'default' : 'destructive'} className={`flex items-center justify-end gap-1 w-20 ${data.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {data.changeType === 'increase' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                                        {data.change}%
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
