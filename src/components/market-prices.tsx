
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockMarketData = [
    { market: "Mumbai", price: 2150, change: 1.2, changeType: "increase" },
    { market: "Delhi", price: 2120, change: -0.8, changeType: "decrease" },
    { market: "Kolkata", price: 2180, change: 2.1, changeType: "increase" },
    { market: "Chennai", price: 2140, change: 0.5, changeType: "increase" },
    { market: "Bengaluru", price: 2160, change: -0.2, changeType: "decrease" },
];

export default function MarketPrices({ crop, region }: { crop: string, region: string }) {
    return (
        <Card className="shadow-lg">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <DollarSign className="h-6 w-6 text-primary" />
                    <div>
                        <CardTitle className="font-headline text-xl">Live Market Prices</CardTitle>
                        <CardDescription>Current market rates for {crop} in major Indian markets.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Market</TableHead>
                            <TableHead className="text-right">Price (₹/Quintal)</TableHead>
                            <TableHead className="text-right">Change</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockMarketData.map((data) => (
                            <TableRow key={data.market}>
                                <TableCell className="font-medium">{data.market}</TableCell>
                                <TableCell className="text-right font-semibold">₹{data.price.toLocaleString()}</TableCell>
                                <TableCell className="text-right">
                                    <Badge variant={data.changeType === 'increase' ? "default" : "destructive"} className={`flex items-center justify-end gap-1 ${data.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
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
