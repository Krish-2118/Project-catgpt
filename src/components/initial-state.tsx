
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";

export default function InitialState() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-image");

  return (
    <Card className="overflow-hidden shadow-lg border-primary/20">
      <CardContent className="p-0">
        <div className="relative">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              width={1200}
              height={400}
              className="w-full h-auto object-cover max-h-[250px] md:max-h-[300px] opacity-70"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
              Welcome to IndiYield
            </h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl">
              Your partner in precision agriculture. Start by describing your land to receive AI-driven yield predictions and actionable advice.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
