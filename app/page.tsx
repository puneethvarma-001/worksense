import React from 'react';
import { Header } from '@/components/core/Header';
import { Footer } from '@/components/core/Footer';
import { HomeHero } from '@/components/core/HomeHero';

export default async function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HomeHero />
      </main>
      <Footer />
    </div>
  );
}
