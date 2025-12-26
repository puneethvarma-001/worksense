import React from 'react';

export function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto px-4 py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} HR Multitenant Demo — Built for demo purposes
      </div>
    </footer>
  );
}
