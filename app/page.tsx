import React from 'react';
import { Navbar } from '@/components/blocks/navbar';
import { Footer } from '@/components/blocks/footer';
import { Background } from '@/components/shared/background';
import { MarketingHero } from '@/components/marketing/MarketingHero';
import { Logos } from '@/components/blocks/logos';
import { Features } from '@/components/marketing/Features';
import { ResourceAllocation } from '@/components/blocks/resource-allocation';
import { Testimonials } from '@/components/blocks/testimonials';
import { Pricing } from '@/components/blocks/pricing';
import { FAQ } from '@/components/blocks/faq';

export default async function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Background className="via-muted to-muted/80">
            <MarketingHero />
            <Logos />
            <Features />
            <ResourceAllocation />
        </Background>
        <Testimonials />
        <Background variant="bottom">
          <Pricing />
          <FAQ />
        </Background>
      </main>
      <Footer />
    </>
  );
}
