import React from 'react';
import { Header } from '@/components/core/Header';
import { Footer } from '@/components/core/Footer';
import { OrgSignupForm } from '@/components/auth/OrgSignupForm';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-semibold">Create your organization</h1>
          <p className="mt-2 text-sm text-gray-600">Create a subdomain and get started — this demo will create tenant metadata in Upstash (Redis).</p>
          <div className="mt-6">
            <OrgSignupForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
