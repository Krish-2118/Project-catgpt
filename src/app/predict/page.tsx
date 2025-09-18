
import DashboardV2 from "@/components/dashboard-v2";
import Header from "@/components/layout/header";

export default function PredictPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <DashboardV2 />
      </main>
    </div>
  );
}
