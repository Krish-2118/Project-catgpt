import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ResultsSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      <Card className="md:col-span-1 shadow-lg h-fit">
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-12 w-1/2 mb-2" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
      <div className="md:col-span-2 space-y-4">
        <Skeleton className="h-8 w-1/3 mb-4" />
        <div className="space-y-4">
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
