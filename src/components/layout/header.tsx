import { Leaf } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-card border-b">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
          <Leaf className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold font-headline">IndiYield</h1>
        </Link>
        <p className="text-sm text-muted-foreground hidden md:block">AI-Powered Crop Yield Predictions for India</p>
      </div>
    </header>
  );
}
