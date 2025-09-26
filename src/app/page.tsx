

"use client";

import { useState } from "react";
import FarmerDashboard from "@/components/farmer-dashboard";
import { Button } from "@/components/ui/button";

export type Language = 'en' | 'or';

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');

  const locales = {
    en: {
      title: "IndiYield",
      tagline: "Your AI-Powered Agricultural Co-Pilot for Odisha",
      toggleButton: "ଓଡ଼ିଆରେ ଦେଖନ୍ତୁ",
      dashboard: {
        title: "Ready for your next cycle?",
        description: "Use our powerful AI to get detailed yield predictions and actionable recommendations for your crops.",
        button: "Start a New Prediction",
      }
    },
    or: {
      title: "ଇଣ୍ଡି-ଇଲ୍ଡ",
      tagline: "ଓଡ଼ିଶା ପାଇଁ ଆପଣଙ୍କର AI-ଚାଳିତ କୃଷି ସହ-ପାଇଲଟ",
      toggleButton: "View in English",
      dashboard: {
        title: "ଆପଣଙ୍କ ପରବର୍ତ୍ତୀ ଚକ୍ର ପାଇଁ ପ୍ରସ୍ତୁତ କି?",
        description: "ଆପଣଙ୍କ ଫସଲ ପାଇଁ ବିସ୍ତୃତ ଅମଳର ପୂର୍ବାନୁମାନ ଏବଂ କାର୍ଯ୍ୟକ୍ଷମ ସୁପାରିଶ ପାଇବାକୁ ଆମର ଶକ୍ତିଶାଳୀ AI ବ୍ୟବହାର କରନ୍ତୁ।",
        button: "ଏକ ନୂଆ ପୂର୍ବାନୁମାନ ଆରମ୍ଭ କରନ୍ତୁ",
      }
    }
  }

  const t = locales[language];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'or' : 'en');
  }

  return (
    <main className="min-h-screen container mx-auto py-8">
      <header className="mb-12 flex flex-col items-center text-center">
        <div className="w-full flex flex-col md:flex-row justify-center md:justify-between items-center">
            <div className="flex-1 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-primary">{t.title}</h1>
            </div>
            <div className="mt-4 md:mt-0">
                <Button variant="secondary" onClick={toggleLanguage}>{t.toggleButton}</Button>
            </div>
        </div>
        <p className="text-muted-foreground mt-2 text-center">{t.tagline}</p>
      </header>
      <FarmerDashboard language={language} locales={locales} />
    </main>
  );
}
