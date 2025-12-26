'use client';
import React, { useState, useEffect } from 'react';
import { protocol, rootDomain } from '@/lib/utils';
import { Role } from '@/rbac/roles';

export function SigninForm() {
  const [subdomain, setSubdomain] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<string>('Employee');
  const [message, setMessage] = useState<string | null>(null);

  // Check for ?role= query param to preselect role
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get('role');
    if (roleParam && Object.values(Role).includes(roleParam as Role)) {
      setRole(roleParam);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ subdomain, email, role })
    });

    const json = await res.json().catch(() => ({ success: false }));
    if (json?.success) {
      setMessage('Signed in — demo cookie set');
      setEmail('');
      setSubdomain('');
      // Redirect to tenant dashboard — prefer server-provided full host URL, fall back to constructed host
      const sanitized = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
      const fallback = `${protocol}://${sanitized}.${rootDomain}`;
      const dashboardUrl = json.dashboardUrl || fallback;
      location.href = dashboardUrl;
    } else {
      setMessage('Sign in failed');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Organization subdomain</label>
        <input value={subdomain} onChange={(e) => setSubdomain(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" placeholder="acme" />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" placeholder="you@company.com" />
      </div>

      <div>
        <label className="block text-sm font-medium">Role (Demo)</label>
        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value)} 
          className="mt-1 block w-full rounded-md border px-3 py-2 bg-white"
        >
          {Object.values(Role).map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        <p className="mt-1 text-xs text-gray-500">Select a role to test different permissions</p>
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-md bg-blue-600 px-4 py-2 text-white">Sign in</button>
        {message ? <div className="text-sm text-gray-700">{message}</div> : null}
      </div>
    </form>
  );
}
