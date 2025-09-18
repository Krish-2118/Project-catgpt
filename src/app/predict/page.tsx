import PredictionForm from "@/components/prediction-form";
import PredictHeader from "@/components/layout/predict-header";

export default function PredictPage() {
  const handleFormSubmit = async (data: any) => {
    "use server";
    console.log("Form submitted on server", data);
    // Here you would typically redirect to a results page with the data
    // For now, we'll just log it.
    // In a real scenario: redirect(`/results?predictionId=...`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PredictHeader />
      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <PredictionForm onSubmit={handleFormSubmit} />
      </main>
    </div>
  );
}
