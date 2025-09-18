"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PastPredictions from "./past-predictions";
import RevenueChart from "./revenue-chart";
import LandStatus from "./land-status";
import { Button } from "./ui/button";

export default function FarmerDashboard() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8">
       <div className="flex items-center justify-between space-y-2">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Welcome Back, Farmer!
          </h1>
          <p className="text-muted-foreground">
            Here's a snapshot of your farm's performance and health.
          </p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2 bg-primary/5 border-primary/20 flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-2xl">Ready for your next cycle?</CardTitle>
            <CardDescription>
              Use our powerful AI to get detailed yield predictions and actionable
              recommendations for your crops.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/predict">
                <Button size="lg">
                    <span>Start a New Prediction</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
            </Link>
          </CardContent>
        </Card>
        <LandStatus />
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <RevenueChart />
        </div>
        <div className="lg:col-span-3">
          <PastPredictions />
        </div>
      </div>
    </div>
  );
}
