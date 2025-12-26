import Link from 'next/link';
import React from 'react';

export function Header() {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-xl font-bold">HR Multitenant Demo</div>
          <nav className="hidden md:flex space-x-3 text-sm text-gray-600">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/signup" className="hover:underline">Sign up</Link>
            <Link href="/signin" className="hover:underline">Sign in</Link>
          </nav>
        </div>

        <div className="text-sm text-gray-600">
          <Link href="/admin" className="hover:underline">Admin</Link>
        </div>
      </div>
    </header>
  );
}
