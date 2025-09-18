
"use client";

import { Bell, Zap, CloudDrizzle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockNotifications = [
    {
        id: 1,
        title: "Pest Alert: Rice Stem Borer",
        description: "Increased activity detected in your region. Consider scouting your fields.",
        time: "2h ago",
        type: "alert",
        read: false,
    },
    {
        id: 2,
        title: "Market Price Spike: Cotton",
        description: "Cotton prices have increased by 8% in the Behrampur market. Good time to sell.",
        time: "1d ago",
        type: "market",
        read: false,
    },
    {
        id: 3,
        title: "Rainfall Forecast",
        description: "Light to moderate rainfall expected in the next 48 hours. Plan irrigation accordingly.",
        time: "2d ago",
        type: "weather",
        read: true,
    }
]


export default function Notifications() {
    return (
        <Card className="shadow-lg h-full">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Bell className="h-6 w-6 text-primary" />
                    <div>
                        <CardTitle className="font-headline text-xl">Notifications</CardTitle>
                        <CardDescription>Recent alerts and updates.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {mockNotifications.map((notif) => (
                        <div key={notif.id} className={`p-3 rounded-lg border flex items-start gap-4 ${!notif.read ? 'bg-primary/5' : 'bg-muted/30'}`}>
                            <div className="p-2 bg-primary/10 rounded-full">
                                {notif.type === 'alert' && <Zap className="h-5 w-5 text-yellow-400" />}
                                {notif.type === 'market' && <Bell className="h-5 w-5 text-green-400" />}
                                {notif.type === 'weather' && <CloudDrizzle className="h-5 w-5 text-blue-400" />}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-semibold">{notif.title}</h4>
                                     {!notif.read && <Badge>New</Badge>}
                                </div>
                                <p className="text-sm text-muted-foreground">{notif.description}</p>
                                <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
