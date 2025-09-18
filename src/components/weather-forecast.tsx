
import { Sun, Cloud, CloudRain, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const mockForecast = [
    { day: "Mon", temp: 32, condition: "Sunny", icon: <Sun className="h-6 w-6 text-yellow-500" /> },
    { day: "Tue", temp: 30, condition: "Partly Cloudy", icon: <Cloud className="h-6 w-6 text-gray-400" /> },
    { day: "Wed", temp: 28, condition: "Rain", icon: <CloudRain className="h-6 w-6 text-blue-500" /> },
    { day: "Thu", temp: 31, condition: "Sunny", icon: <Sun className="h-6 w-6 text-yellow-500" /> },
    { day: "Fri", temp: 29, condition: "Windy", icon: <Wind className="h-6 w-6 text-gray-500" /> },
];


export default function WeatherForecast({ region }: { region: string }) {
    const regionLabel = region.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline text-xl">5-Day Weather Forecast</CardTitle>
                <CardDescription>Weather prediction for {regionLabel}.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center space-x-2">
                    {mockForecast.map((forecast) => (
                        <div key={forecast.day} className="flex flex-col items-center space-y-2 text-center">
                            <span className="font-semibold text-muted-foreground">{forecast.day}</span>
                            {forecast.icon}
                            <span className="font-bold text-lg">{forecast.temp}°C</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
