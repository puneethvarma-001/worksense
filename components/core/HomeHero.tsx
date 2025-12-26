import Link from 'next/link';
import React from 'react';

export function HomeHero() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-extrabold">HRMS for modern teams — multitenant demo</h1>
        <p className="mt-3 text-lg text-gray-600">Subdomain-first tenant routing, RBAC, and feature flags — build on this scaffold.</p>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/signup" className="rounded-md bg-blue-600 px-4 py-2 text-white">Create organization</Link>
          <Link href="/signin" className="rounded-md border px-4 py-2">Sign in</Link>
        </div>

        <div className="mt-10 text-left max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold">Modules included (mocked):</h3>
          <ul className="mt-3 list-disc list-inside text-gray-700">
            <li>Leave Management</li>
            <li>Payroll (mock)</li>
            <li>Onboarding & Exits</li>
            <li>AI mock endpoints for resume analysis</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
