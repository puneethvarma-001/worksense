import React from 'react';
import { Navbar } from '@/components/blocks/navbar';
import { Footer } from '@/components/blocks/footer';
import { Background } from '@/components/shared/background';
import { MarketingHero } from '@/components/marketing/MarketingHero';
import { FeaturesGrid } from '@/components/marketing/FeaturesGrid';
import { RoleBasedSection } from '@/components/marketing/RoleBasedSection';
import { CTASection } from '@/components/marketing/CTASection';

export default async function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Background className="via-muted to-muted/80">
          <div className="py-28 lg:py-32 lg:pt-44">
            <MarketingHero />
          </div>
          <section id="features" className="pb-28 lg:pb-32">
            <FeaturesGrid />
          </section>
          <section id="roles" className="pb-28 lg:pb-32">
            <RoleBasedSection />
          </section>
        </Background>
        <Background variant="bottom">
          <CTASection />
        </Background>
      </main>
      <Footer />
    </>
  );
}
