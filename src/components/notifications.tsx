
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertTriangle, Info, Bell, AlertCircle } from 'lucide-react';

const notifications = [
  { 
    id: 1, 
    farm: "North Field",
    message: "High chance of pest infestation. Recommend immediate action.", 
    level: "high" as const,
    timestamp: "2 hours ago" 
  },
  { 
    id: 2, 
    farm: "River Bend Plot",
    message: "Heavy rainfall expected in 48 hours. Ensure proper drainage.", 
    level: "medium" as const,
    timestamp: "8 hours ago"
  },
  { 
    id: 3, 
    farm: "South Acre",
    message: "Soil moisture is low. Irrigation needed within 24 hours.", 
    level: "medium" as const,
    timestamp: "1 day ago"
  },
   { 
    id: 4, 
    farm: "North Field",
    message: "Fertilization window for your rice crop is approaching.", 
    level: "low" as const,
    timestamp: "2 days ago"
  },
];

const levelConfig = {
    high: { icon: AlertCircle, color: "text-red-500", bgColor: "bg-red-50" },
    medium: { icon: AlertTriangle, color: "text-yellow-500", bgColor: "bg-yellow-50" },
    low: { icon: Info, color: "text-blue-500", bgColor: "bg-blue-50" },
}

export default function Notifications() {
  return (
    <Card className="shadow-lg h-full">
      <CardHeader>
        <div className="flex items-center gap-3">
            <Bell className="h-6 w-6 text-primary" />
            <div>
                <CardTitle className="font-headline text-xl">Urgent Notifications</CardTitle>
                <CardDescription>Alerts and updates for your lands.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notif) => {
            const config = levelConfig[notif.level];
            const Icon = config.icon;
            return (
              <div key={notif.id} className={`p-4 rounded-lg flex items-start gap-4 ${config.bgColor}`}>
                <div className={`mt-1 ${config.color}`}>
                    <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">{notif.farm}</p>
                  <p className="text-sm text-muted-foreground">{notif.message}</p>
                  <p className="text-xs text-muted-foreground/80 mt-1">{notif.timestamp}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  );
}
