"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart, Sector } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { crops } from "@/lib/data"

const chartData = [
  { crop: "rice", revenue: 275000, fill: "var(--color-rice)" },
  { crop: "wheat", revenue: 200000, fill: "var(--color-wheat)" },
  { crop: "cotton", revenue: 187000, fill: "var(--color-cotton)" },
  { crop: "sugarcane", revenue: 150000, fill: "var(--color-sugarcane)" },
  { crop: "maize", revenue: 120000, fill: "var(--color-maize)" },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
  },
  ...crops.reduce((acc, crop) => {
    acc[crop.value] = { label: crop.label, color: `hsl(var(--chart-${Object.keys(acc).length + 1}))` };
    return acc;
  }, {} as any)
}

export default function RevenueChart() {
  const totalRevenue = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.revenue, 0)
  }, [])

  return (
    <Card className="flex flex-col shadow-lg">
      <CardHeader className="items-center pb-0">
        <CardTitle>Annual Revenue Breakdown</CardTitle>
        <CardDescription>Revenue by Crop - Last 12 Months</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="revenue"
              nameKey="crop"
              innerRadius={80}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalRevenue.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Revenue
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm pt-4">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing data for the last 12 months.
        </div>
      </CardFooter>
    </Card>
  )
}
