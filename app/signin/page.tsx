import React from 'react';
import { Header } from '@/components/core/Header';
import { Footer } from '@/components/core/Footer';
import { SigninForm } from '@/components/auth/SigninForm';

export default function SigninPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-semibold">Sign in to your organization</h1>
          <p className="mt-2 text-sm text-gray-600">Provide your organization subdomain and email to sign in for demo purposes.</p>
          <div className="mt-6">
            <SigninForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
