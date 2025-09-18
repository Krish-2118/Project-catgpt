
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { History, Eye } from 'lucide-react';
import { Button } from "./ui/button";

const pastPredictions = [
  { id: "PRED-001", farm: "North Field", crop: "Rice", predictedYield: "3.2 tons/ha", date: "2024-05-15", status: "Harvested" },
  { id: "PRED-002", farm: "River Bend Plot", crop: "Wheat", predictedYield: "2.9 tons/ha", date: "2024-04-20", status: "Harvested" },
  { id: "PRED-003", farm: "South Acre", crop: "Maize", predictedYield: "4.1 tons/ha", date: "2024-06-01", status: "Growing" },
  { id: "PRED-004", farm: "North Field", crop: "Cotton", predictedYield: "1.5 tons/ha", date: "2024-06-10", status: "Active" },
];

const statusColors: { [key: string]: string } = {
    Harvested: "bg-green-500/10 text-green-400 border-green-500/20",
    Growing: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Active: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
}

export default function PastPredictions() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
          <History className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="font-headline text-xl">Past Predictions</CardTitle>
            <CardDescription>A history of yield predictions for your lands.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Farm</TableHead>
              <TableHead>Crop</TableHead>
              <TableHead>Predicted Yield</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pastPredictions.map((pred) => (
              <TableRow key={pred.id}>
                <TableCell className="font-medium">{pred.farm}</TableCell>
                <TableCell>{pred.crop}</TableCell>
                <TableCell>{pred.predictedYield}</TableCell>
                <TableCell>{pred.date}</TableCell>
                <TableCell>
                    <Badge variant="outline" className={statusColors[pred.status]}>{pred.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View Details</span>
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
