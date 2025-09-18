"use client";

import { AlertTriangle, DollarSign, CloudRain, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const mockNotifications = [
    {
        id: "pest-alert-1",
        type: "pest",
        title: "Pest Alert: Stem Borer Activity Detected",
        description: "Increased stem borer activity detected in your district. Monitor your paddy fields closely for signs of infestation.",
        date: "2 days ago",
        read: false,
    },
    {
        id: "weather-alert-1",
        type: "weather",
        title: "Weather Update: Heavy Rainfall Forecast",
        description: "Heavy rainfall is expected in the next 48 hours. Ensure proper drainage is in place to avoid waterlogging in your fields.",
        date: "1 day ago",
        read: false,
    },
    {
        id: "market-alert-1",
        type: "market",
        title: "Market Insight: Cotton Prices Surge",
        description: "Cotton prices have increased by 3% in major regional mandis. This may be a good time to consider selling your stock.",
        date: "5 days ago",
        read: true,
    },
];

const getNotificationIcon = (type: string) => {
    switch (type) {
        case 'pest': return <AlertTriangle className="h-5 w-5 text-red-500" />;
        case 'weather': return <CloudRain className="h-5 w-5 text-blue-500" />;
        case 'market': return <DollarSign className="h-5 w-5 text-green-500" />;
        default: return <Bell className="h-5 w-5" />;
    }
}

export default function Notifications() {
    return (
        <Card className="shadow-sm h-full">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Bell className="h-6 w-6 text-primary" />
                    <div>
                        <CardTitle className="font-bold">Notifications & Alerts</CardTitle>
                        <CardDescription>AI-driven updates for your farm</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="space-y-1">
                    {mockNotifications.map(notif => (
                        <div key={notif.id} className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors">
                            <div className="mt-1">
                                {getNotificationIcon(notif.type)}
                            </div>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium leading-none">{notif.title}</p>
                                    <p className="text-xs text-muted-foreground">{notif.date}</p>
                                </div>
                                <p className="text-sm text-muted-foreground">{notif.description}</p>
                            </div>
                            {!notif.read && (
                                <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
