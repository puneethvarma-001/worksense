import React from 'react';
import { Header } from '@/components/core/Header';
import { MarketingHero } from '@/components/marketing/MarketingHero';
import { FeaturesGrid } from '@/components/marketing/FeaturesGrid';
import { RoleBasedSection } from '@/components/marketing/RoleBasedSection';
import { CTASection } from '@/components/marketing/CTASection';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';

export default async function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <MarketingHero />
        <FeaturesGrid />
        <RoleBasedSection />
        <CTASection />
      </main>
      <MarketingFooter />
    </div>
  );
}
