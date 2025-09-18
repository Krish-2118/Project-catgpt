import PredictionForm from "@/components/prediction-form";
import AppLayout from "@/components/layout/app-layout";

export default function PredictPage() {
  const handleFormSubmit = async (data: any) => {
    "use server";
    console.log("Form submitted on server", data);
    // In a real scenario: redirect(`/results?predictionId=...`);
  };

  return (
    <AppLayout>
      <div className="flex-1 px-4 py-8 lg:px-8 lg:py-12">
        <div className="max-w-5xl mx-auto">
          <PredictionForm onSubmit={handleFormSubmit} />
        </div>
      </div>
    </AppLayout>
  );
}
