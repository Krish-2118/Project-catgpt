
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Notifications from './notifications';
import PastPredictions from './past-predictions';

export default function FarmerDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Welcome Back, Farmer!</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening on your farms today.</p>
        </div>
        <Button asChild size="lg">
          <Link href="/predict">
            Start New Prediction <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Notifications />
        </div>
        <div className="lg:col-span-2">
          <PastPredictions />
        </div>
      </div>
    </div>
  );
}
