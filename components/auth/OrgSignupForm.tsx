'use client';
import React, { useState } from 'react';
import { protocol, rootDomain } from '@/lib/utils';

export function OrgSignupForm() {
  const [subdomain, setSubdomain] = useState('');
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('🏢');
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    const res = await fetch('/api/tenants/create', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ subdomain, name, emoji })
    });

    const json = await res.json().catch(() => ({ success: false }));
    if (json?.success) {
      // If API returned a dashboard URL, navigate there. Prefer full host URL; construct fallback if missing.
      const sanitized = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
      const fallback = `${protocol}://${sanitized}.${rootDomain}`;
      const dashboardUrl = json.dashboardUrl || fallback;
      // Clear form and navigate
      setSubdomain('');
      setName('');
      // Use full navigation to the dashboard
      location.href = dashboardUrl;
    } else {
      setMessage('Failed to create organization');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Organization name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" placeholder="Acme Corp" />
      </div>

      <div>
        <label className="block text-sm font-medium">Subdomain</label>
        <input value={subdomain} onChange={(e) => setSubdomain(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" placeholder="acme" />
      </div>

      <div>
        <label className="block text-sm font-medium">Emoji (optional)</label>
        <input value={emoji} onChange={(e) => setEmoji(e.target.value)} className="mt-1 block w-24 rounded-md border px-3 py-2" />
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-md bg-blue-600 px-4 py-2 text-white">Create organization</button>
        {message ? <div className="text-sm text-gray-700">{message}</div> : null}
      </div>
    </form>
  );
}
