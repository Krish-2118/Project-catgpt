import FarmerDashboard from "@/components/farmer-dashboard";

export default function Home() {
  return (
    <main className="min-h-screen container mx-auto py-8">
      <header className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-primary">IndiYield</h1>
          <p className="text-muted-foreground mt-2">Your AI-Powered Agricultural Co-Pilot for Odisha</p>
      </header>
      <FarmerDashboard />
    </main>
  );
}
