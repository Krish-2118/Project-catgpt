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
    },
    or: {
      title: "ଇଣ୍ଡି-ਯੀల్ਡ",
      tagline: "ଓଡ଼ିଶା ପାଇଁ ଆପଣଙ୍କର AI-ଚାଳିତ କୃଷି ସହ-ପାଇଲଟ",
      toggleButton: "View in English",
    }
  }

  const t = locales[language];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'or' : 'en');
  }

  return (
    <main className="min-h-screen container mx-auto py-8">
      <header className="text-center mb-12 relative">
          <h1 className="text-4xl font-bold tracking-tight text-primary">{t.title}</h1>
          <p className="text-muted-foreground mt-2">{t.tagline}</p>
          <div className="absolute top-0 right-0">
            <Button variant="ghost" onClick={toggleLanguage}>{t.toggleButton}</Button>
          </div>
      </header>
      <FarmerDashboard language={language} locales={locales} />
    </main>
  );
}
