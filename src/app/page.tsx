import { LandingHeader, HeroSection, FeaturedPrompts, CategoryCards, RolePicker } from '@/components/landing';

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
          <RolePicker />
        </section>
      </main>

      <div className="noise-overlay" />
    </div>
  );
}
