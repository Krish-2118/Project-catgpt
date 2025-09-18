
import { Sun, Cloud, CloudRain, Wind, CloudDrizzle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const mockForecast: { [key: string]: { day: string; temp: number; condition: string; icon: React.ReactNode }[] } = {
    bhubaneswar: [
        { day: "Mon", temp: 34, condition: "Sunny", icon: <Sun className="h-6 w-6 text-yellow-500" /> },
        { day: "Tue", temp: 32, condition: "Partly Cloudy", icon: <Cloud className="h-6 w-6 text-gray-400" /> },
        { day: "Wed", temp: 30, condition: "Rain", icon: <CloudRain className="h-6 w-6 text-blue-500" /> },
        { day: "Thu", temp: 33, condition: "Sunny", icon: <Sun className="h-6 w-6 text-yellow-500" /> },
        { day: "Fri", temp: 31, condition: "Windy", icon: <Wind className="h-6 w-6 text-gray-500" /> },
    ],
    cuttack: [
        { day: "Mon", temp: 35, condition: "Sunny", icon: <Sun className="h-6 w-6 text-yellow-500" /> },
        { day: "Tue", temp: 33, condition: "Partly Cloudy", icon: <Cloud className="h-6 w-6 text-gray-400" /> },
        { day: "Wed", temp: 31, condition: "Drizzle", icon: <CloudDrizzle className="h-6 w-6 text-blue-400" /> },
        { day: "Thu", temp: 34, condition: "Sunny", icon: <Sun className="h-6 w-6 text-yellow-500" /> },
        { day: "Fri", temp: 32, condition: "Cloudy", icon: <Cloud className="h-6 w-6 text-gray-500" /> },
    ],
    puri: [
        { day: "Mon", temp: 32, condition: "Windy", icon: <Wind className="h-6 w-6 text-gray-500" /> },
        { day: "Tue", temp: 31, condition: "Partly Cloudy", icon: <Cloud className="h-6 w-6 text-gray-400" /> },
        { day: "Wed", temp: 29, condition: "Rain", icon: <CloudRain className="h-6 w-6 text-blue-500" /> },
        { day: "Thu", temp: 32, condition: "Sunny", icon: <Sun className="h-6 w-6 text-yellow-500" /> },
        { day: "Fri", temp: 30, condition: "Windy", icon: <Wind className="h-6 w-6 text-gray-500" /> },
    ],
    default: [
        { day: "Mon", temp: 34, condition: "Sunny", icon: <Sun className="h-6 w-6 text-yellow-500" /> },
        { day: "Tue", temp: 32, condition: "Partly Cloudy", icon: <Cloud className="h-6 w-6 text-gray-400" /> },
        { day: "Wed", temp: 30, condition: "Rain", icon: <CloudRain className="h-6 w-6 text-blue-500" /> },
        { day: "Thu", temp: 33, condition: "Sunny", icon: <Sun className="h-6 w-6 text-yellow-500" /> },
        { day: "Fri", temp: 31, condition: "Windy", icon: <Wind className="h-6 w-6 text-gray-500" /> },
    ]
};


export default function WeatherForecast({ region }: { region: string }) {
    const regionKey = region.toLowerCase().replace(' ', '');
    const data = mockForecast[regionKey] || mockForecast.default;
    
    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline text-xl">5-Day Weather Forecast</CardTitle>
                <CardDescription>Weather prediction for {region}.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center space-x-2">
                    {data.map((forecast) => (
                        <div key={forecast.day} className="flex flex-col items-center space-y-2 text-center p-2 rounded-lg hover:bg-muted/50 transition-colors w-full">
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
