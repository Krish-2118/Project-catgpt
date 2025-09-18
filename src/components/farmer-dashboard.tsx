"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Notifications from "./notifications";
import PastPredictions from "./past-predictions";
import RevenueChart from "./revenue-chart";
import LandStatus from "./land-status";

export default function FarmerDashboard() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
          Welcome Back, Farmer!
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Here's a snapshot of your farm's performance and recent activity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-8">
          <Link href="/predict" className="block group">
            <Card className="bg-primary/5 border-primary/20 hover:bg-primary/10 hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="text-2xl text-primary flex items-center justify-between">
                  <span>Start a New Prediction</span>
                  <ArrowRight className="h-6 w-6 transform group-hover:translate-x-1 transition-transform" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Use our AI to get detailed yield predictions and actionable
                  recommendations for your next crop cycle.
                </p>
              </CardContent>
            </Card>
          </Link>

          <RevenueChart />
        </div>

        {/* Right sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <LandStatus />
          <Notifications />
          <PastPredictions />
        </div>
      </div>
    </div>
  );
}
