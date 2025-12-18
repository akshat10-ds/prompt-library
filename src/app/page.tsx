import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LandingHeader, HeroSection, FeaturedPrompts, CategoryCards } from '@/components/landing';
import { prompts } from '@/data';

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="gradient-mesh" />

      <LandingHeader />

      <main>
        <HeroSection />
        <FeaturedPrompts />
        <CategoryCards />

        {/* Final CTA Section */}
        <section className="py-16 px-6 text-center">
          <p className="text-text-secondary mb-4">
            Ready to explore more?
          </p>
          <Link
            href="/library"
            className="inline-flex items-center gap-2 px-6 py-3 bg-text-primary text-background rounded-lg font-medium hover:bg-text-secondary transition-colors"
          >
            Browse All {prompts.length} Prompts
            <ArrowRight size={18} />
          </Link>
        </section>
      </main>

      <div className="noise-overlay" />
    </div>
  );
}
