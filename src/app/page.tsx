

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
      },
      form: {
        steps: {
            land: 'Describe Land',
            crop: 'Select Crop',
            season: 'Growing Season',
            confirm: 'Get Prediction',
        },
        land: {
            title: "Let's Get Started",
            description: 'Begin by providing details about your farmland in Odisha.',
        },
        crop: {
            title: 'Select Your Crop',
            description: 'Based on your land, we suggest these crops. Choose one or select another from the list.',
            suggestions: 'AI Suggestions',
            other: 'Or Choose Another Crop',
        },
        season: {
            title: 'Select the Sowing Season',
            description: 'Choose the appropriate season for your crop.',
        },
        confirm: {
            title: 'Confirm Your Selection',
            description: 'Review your selections before generating the AI prediction.',
            summaryTitle: 'Prediction Summary',
            landDetails: 'Land Details:',
            district: 'District',
            soilType: 'Soil Type',
            irrigation: 'Irrigation',
            topography: 'Topography',
            crop: 'Crop',
            region: 'Region',
            season: 'Season',
            cta: "You're all set! Click the button below to generate your personalized crop yield prediction and recommendations.",
        },
        buttons: {
            back: 'Back',
            backToDashboard: 'Back to Dashboard',
            next: 'Next',
            fetchingSuggestions: 'Fetching Suggestions...',
            getPrediction: 'Get AI Prediction',
            generatingPrediction: 'Generating Prediction...',
        }
      },
      results: {
          title: "Prediction Results",
          startNew: "Start New Prediction",
          resultsDisplay: {
              title: "AI Prediction Results",
              description: "Your personalized yield forecast and recommendations are ready.",
              predictedYield: "Predicted Yield",
              recommendations: "Actionable Recommendations",
              irrigation: "Irrigation Plan",
              fertilization: "Fertilization Strategy",
              pestControl: "Pest Control Advisory",
          },
          marketPrices: {
                title: "Market Intelligence",
                description: "Current prices for your crop in major local markets.",
                mandi: "Mandi",
                price: "Price (per Quintal)",
                change: "24h Change",
                analystCorner: "AI Analyst Corner",
                trendAnalysis: "Trend Analysis:",
                recommendation: "Recommendation:",
          },
          cropStatistics: {
              regionalTitle: "Regional Yield Averages",
              historicalTitle: "Historical Yield for",
              regionalDescription: "Average yield for all major crops in",
              historicalDescription: "Yield data in",
              yieldLabel: "Yield (t/ha)",
              avgYieldLabel: "Avg. Yield (t/ha)",
              allCrops: "All Crops",
          }
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
      },
      form: {
        steps: {
            land: 'ଜମି ବର୍ଣ୍ଣନା କରନ୍ତୁ',
            crop: 'ଫସଲ ଚୟନ କରନ୍ତୁ',
            season: 'ବୃଦ୍ଧି ଋତୁ',
            confirm: 'ପୂର୍ବାନୁମାନ ପ୍ରାପ୍ତ କରନ୍ତୁ',
        },
        land: {
            title: 'ଚାଲନ୍ତୁ ଆରମ୍ଭ କରିବା',
            description: 'ଓଡ଼ିଶାରେ ଆପଣଙ୍କର ଚାଷ ଜମି ବିଷୟରେ ବିବରଣୀ ପ୍ରଦାନ କରି ଆରମ୍ଭ କରନ୍ତୁ।',
        },
        crop: {
            title: 'ଆପଣଙ୍କ ଫସଲ ଚୟନ କରନ୍ତୁ',
            description: 'ଆପଣଙ୍କ ଜମି ଉପରେ ଆଧାର କରି, ଆମେ ଏହି ଫସଲଗୁଡିକ ପରାମର୍ଶ ଦେଉଛୁ। ଗୋଟିଏ ବାଛନ୍ତୁ କିମ୍ବା ତାଲିକାରୁ ଅନ୍ୟଟି ଚୟନ କରନ୍ତୁ।',
            suggestions: 'AI ପରାମର୍ଶ',
            other: 'କିମ୍ବା ଅନ୍ୟ ଫସଲ ବାଛନ୍ତୁ',
        },
        season: {
            title: 'ବୁଣିବା ଋତୁ ଚୟନ କରନ୍ତୁ',
            description: 'ଆପଣଙ୍କ ଫସଲ ପାଇଁ ଉପଯୁକ୍ତ ଋତୁ ବାଛନ୍ତୁ।',
        },
        confirm: {
            title: 'ଆପଣଙ୍କ ଚୟନ ନିଶ୍ଚିତ କରନ୍ତୁ',
            description: 'AI ପୂର୍ବାନୁମାନ ସୃଷ୍ଟି କରିବା ପୂର୍ବରୁ ଆପଣଙ୍କର ଚୟନଗୁଡିକ ସମୀକ୍ଷା କରନ୍ତୁ।',
            summaryTitle: 'ପୂର୍ବାନୁମାନ ସାରାଂଶ',
            landDetails: 'ଜମି ବିବରଣୀ:',
            district: 'ଜିଲ୍ଲା',
            soilType: 'ମୃତ୍ତିକା ପ୍ରକାର',
            irrigation: 'ଜଳସେଚନ',
            topography: 'ଭୂപ്രകൃତି',
            crop: 'ଫସଲ',
            region: 'ଅଞ୍ଚଳ',
            season: 'ଋତୁ',
            cta: 'ଆପଣ ସବୁ ପ୍ରସ୍ତୁତ! ଆପଣଙ୍କର ବ୍ୟକ୍ତିଗତ ଫସଲ ଅମଳ ପୂର୍ବାନୁମାନ ଏବଂ ସୁପାରିଶଗୁଡିକ ସୃଷ୍ଟି କରିବାକୁ ନିମ୍ନରେ ଥିବା ବଟନ୍ କ୍ଲିକ୍ କରନ୍ତୁ।',
        },
        buttons: {
            back: 'ପଛକୁ',
            backToDashboard: 'ଡ୍ୟାସବୋର୍ଡକୁ ଫେରନ୍ତୁ',
            next: 'ପରବର୍ତ୍ତୀ',
            fetchingSuggestions: 'ପରାମର୍ଶ ଅଣାଯାଉଛି...',
            getPrediction: 'AI ପୂର୍ବାନୁମାନ ପାଆନ୍ତୁ',
            generatingPrediction: 'ପୂର୍ବାନୁମାନ ସୃଷ୍ଟି କରାଯାଉଛି...',
        }
      },
      results: {
          title: "ପୂର୍ବାନୁମାନ ଫଳାଫଳ",
          startNew: "ନୂଆ ପୂର୍ବାନୁମାନ ଆରମ୍ଭ କରନ୍ତୁ",
          resultsDisplay: {
              title: "AI ପୂର୍ବାନୁମାନ ଫଳାଫଳ",
              description: "ଆପଣଙ୍କର ବ୍ୟକ୍ତିଗତ ଅମଳ ପୂର୍ବାନୁମାନ ଏବଂ ସୁପାରିଶଗୁଡିକ ପ୍ରସ୍ତୁତ।",
              predictedYield: "ପୂର୍ବାନୁମାନିତ ଅମଳ",
              recommendations: "କାର୍ଯ୍ୟକ୍ଷମ ସୁପାରିଶଗୁଡିକ",
              irrigation: "ଜଳସେଚନ ଯୋଜନା",
              fertilization: "ସାର ପ୍ରୟୋଗ ରଣନୀତି",
              pestControl: "କୀଟନାଶକ ପରାମର୍ଶ",
          },
          marketPrices: {
                title: "ବଜାର ଗୁପ୍ତଚର",
                description: "ପ୍ରମୁଖ ସ୍ଥାନୀୟ ବଜାରରେ ଆପଣଙ୍କ ଫସଲ ପାଇଁ ବର୍ତ୍ତମାନର ମୂଲ୍ୟ।",
                mandi: "ମଣ୍ଡି",
                price: "ମୂଲ୍ୟ (ପ୍ରତି କ୍ୱିଣ୍ଟାଲ)",
                change: "୨୪ ଘଣ୍ଟାର ପରିବର୍ତ୍ତନ",
                analystCorner: "AI ବିଶ୍ଳେଷକ କର୍ଣ୍ଣର",
                trendAnalysis: "ପ୍ରବଣତା ବିଶ୍ଳେଷଣ:",
                recommendation: "ସୁପାରିଶ:",
          },
          cropStatistics: {
              regionalTitle: "ଆଞ୍ଚଳିକ ଅମଳ ହାରାହାରି",
              historicalTitle: "ପାଇଁ ଐତିହାସିକ ଅମଳ",
              regionalDescription: "ପ୍ରମୁଖ ଫସଲ ପାଇଁ ହାରାହାରି ଅମଳ",
              historicalDescription: "ରେ ଅମଳ ତଥ୍ୟ",
              yieldLabel: "ଅମଳ (ଟନ୍/ହେ)",
              avgYieldLabel: "ହାରାହାରି ଅମଳ (ଟନ୍/ହେ)",
              allCrops: "ସମସ୍ତ ଫସଲ",
          }
      }
    }
  }

  const t = locales[language];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'or' : 'en');
  }

  return (
    <main className="min-h-screen container mx-auto py-8">
      <header className="mb-12">
        <div className="w-full flex flex-col md:flex-row justify-center md:justify-between items-center px-4">
            <div className="flex-1 text-center order-2 md:order-1">
                <h1 className="text-4xl font-bold tracking-tight text-primary">{t.title}</h1>
                <p className="text-muted-foreground mt-2 text-center">{t.tagline}</p>
            </div>
            <div className="order-1 md:order-2 self-end md:self-center mb-4 md:mb-0">
                <Button variant="secondary" onClick={toggleLanguage}>{t.toggleButton}</Button>
            </div>
        </div>
      </header>
      <FarmerDashboard language={language} locales={locales} />
    </main>
  );
}
