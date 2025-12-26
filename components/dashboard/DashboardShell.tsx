"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Home, Users, Calendar, Cpu, Settings, Menu, X } from 'lucide-react';

type NavItem = {
  key: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  feature?: string; // optional feature flag required
};

export default function DashboardShell({
  tenant,
  emoji,
  flags
}: {
  tenant: string;
  emoji?: string;
  flags?: Record<string, boolean>;
}) {
  const [expanded, setExpanded] = useState(false); // hover-expanded on desktop
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < 768);
      // auto collapse on mobile
      if (window.innerWidth < 768) setExpanded(false);
    }
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const nav: NavItem[] = [
    { key: 'home', label: 'Overview', href: '#overview', icon: <Home className="h-5 w-5" /> },
    { key: 'users', label: 'Users', href: '#users', icon: <Users className="h-5 w-5" /> },
    { key: 'leave', label: 'Leave', href: '#leave', icon: <Calendar className="h-5 w-5" />, feature: 'FEATURE_LEAVE' },
    { key: 'ai', label: 'AI', href: '#ai', icon: <Cpu className="h-5 w-5" />, feature: 'FEATURE_AI_RESUME' },
    { key: 'settings', label: 'Settings', href: '#settings', icon: <Settings className="h-5 w-5" /> }
  ];

  const visibleNav = nav.filter((n) => (n.feature ? flags?.[n.feature] : true));

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-indigo-50 to-white">
      {/* Sidebar */}
      <aside
        className={`z-30 sticky top-0 left-0 h-screen transition-all duration-300 ease-in-out bg-white/60 backdrop-blur border-r border-gray-200 shadow-sm flex flex-col ${
          expanded ? 'w-64' : 'w-16'
        }`}
        onMouseEnter={() => !isMobile && setExpanded(true)}
        onMouseLeave={() => !isMobile && setExpanded(false)}
        onFocus={() => !isMobile && setExpanded(true)}
        onBlur={() => !isMobile && setExpanded(false)}
        aria-expanded={expanded}
      >
        <div className="flex items-center justify-between gap-2 px-3 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-indigo-100 text-xl select-none">{emoji ?? '🏢'}</div>
            {expanded && <div className="font-semibold text-gray-900">{tenant}</div>}
          </div>

          {/* Mobile toggles */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <nav className="mt-4 flex-1 overflow-auto">
          <ul className="space-y-1 px-2">
            {visibleNav.map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors ${
                    expanded ? 'justify-start' : 'justify-center'
                  }`}
                >
                  <span className="text-indigo-600">{item.icon}</span>
                  {expanded && <span className="font-medium">{item.label}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-3">
          {expanded ? (
            <Button variant="secondary" size="sm" className="w-full">
              New invite
            </Button>
          ) : (
            <Button variant="ghost" size="sm" className="w-full" onClick={() => setExpanded(true)} aria-label="Open sidebar">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              </svg>
            </Button>
          )}
        </div>
      </aside>

      {/* Mobile overlay sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white p-4 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center">{emoji ?? '🏢'}</div>
                <div className="font-semibold">{tenant}</div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <nav>
              <ul className="space-y-2">
                {visibleNav.map((item) => (
                  <li key={item.key}>
                    <a
                      href={item.href}
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-800 hover:bg-indigo-50 transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="text-indigo-600">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Welcome back — {tenant}</h2>
            <p className="mt-1 text-sm text-gray-600">Quick glance of your organization</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">Invite</Button>
            <Button size="sm">New</Button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Active users</CardTitle>
              <CardDescription>Last 7 days</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-bold py-6">24</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Open requests</CardTitle>
              <CardDescription>Pending items</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-bold py-6">3</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Storage</CardTitle>
              <CardDescription>Used / quota</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-bold py-6">2.1GB</CardContent>
          </Card>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-gray-700">
                <li>• Invite accepted by alice@{tenant}</li>
                <li>• New leave request submitted</li>
                <li>• Demo tenant created</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Button variant="ghost">Create user</Button>
              <Button variant="ghost">Create invite</Button>
              <Button variant="ghost">Manage billing</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
