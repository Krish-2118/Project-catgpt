"use client";

import { AlertCircle, DollarSign, CloudRain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "./ui/badge";

const mockNotifications = [
    {
        id: "pest-alert-1",
        type: "pest",
        title: "Pest Alert: Stem Borer",
        description: "Increased stem borer activity detected in your district. Monitor your paddy fields closely.",
        date: "2 days ago",
        read: false,
    },
    {
        id: "weather-alert-1",
        type: "weather",
        title: "Weather Update: Heavy Rainfall",
        description: "Heavy rainfall expected in the next 48 hours. Ensure proper drainage to avoid waterlogging.",
        date: "1 day ago",
        read: false,
    },
    {
        id: "market-alert-1",
        type: "market",
        title: "Market Insight: Cotton Prices",
        description: "Cotton prices have increased by 3% in major mandis. Consider timing your sale.",
        date: "5 days ago",
        read: true,
    },
];

const getNotificationIcon = (type: string) => {
    switch (type) {
        case 'pest': return <AlertCircle className="h-5 w-5 text-red-500" />;
        case 'weather': return <CloudRain className="h-5 w-5 text-blue-500" />;
        case 'market': return <DollarSign className="h-5 w-5 text-green-500" />;
        default: return <AlertCircle className="h-5 w-5" />;
    }
}

export default function Notifications() {
    return (
        <Card className="shadow-sm h-full">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <AlertCircle className="h-6 w-6 text-primary" />
                    <div>
                        <CardTitle className="font-bold">Notifications & Alerts</CardTitle>
                        <CardDescription>AI-driven updates for your farm</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {mockNotifications.map(notif => (
                    <div key={notif.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div>
                           {getNotificationIcon(notif.type)}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <p className="font-semibold">{notif.title}</p>
                                {!notif.read && <Badge className="bg-primary hover:bg-primary/90">New</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground">{notif.description}</p>
                            <p className="text-xs text-muted-foreground/70 mt-1">{notif.date}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
