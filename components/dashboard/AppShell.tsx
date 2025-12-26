"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  DollarSign, 
  Calendar, 
  Clock, 
  UserPlus, 
  Building2, 
  FileText, 
  CalendarDays,
  Brain,
  Menu,
  X,
  LogOut
} from 'lucide-react';

type NavItem = {
  key: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  permission?: string;
};

export function AppShell({
  tenant,
  subdomain,
  role,
  flags,
  children
}: {
  tenant: string;
  subdomain: string;
  role: string;
  flags?: Record<string, boolean>;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setSidebarOpen(false);
    }
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const nav: NavItem[] = [
    { 
      key: 'dashboard', 
      label: 'Dashboard', 
      href: `/s/${subdomain}/app`, 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      key: 'payroll', 
      label: 'Payroll', 
      href: `/s/${subdomain}/app/payroll`, 
      icon: <DollarSign className="h-5 w-5" /> 
    },
    { 
      key: 'leave', 
      label: 'Leave', 
      href: `/s/${subdomain}/app/leave`, 
      icon: <Calendar className="h-5 w-5" /> 
    },
    { 
      key: 'attendance', 
      label: 'Attendance', 
      href: `/s/${subdomain}/app/attendance`, 
      icon: <Clock className="h-5 w-5" /> 
    },
    { 
      key: 'onboarding', 
      label: 'Onboarding & Exits', 
      href: `/s/${subdomain}/app/onboarding-exits`, 
      icon: <UserPlus className="h-5 w-5" /> 
    },
    { 
      key: 'org', 
      label: 'Organization', 
      href: `/s/${subdomain}/app/org`, 
      icon: <Building2 className="h-5 w-5" /> 
    },
    { 
      key: 'policies', 
      label: 'Policies', 
      href: `/s/${subdomain}/app/policies`, 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      key: 'holidays', 
      label: 'Holidays', 
      href: `/s/${subdomain}/app/holidays`, 
      icon: <CalendarDays className="h-5 w-5" /> 
    },
    { 
      key: 'ai', 
      label: 'AI Tools', 
      href: `/s/${subdomain}/app/ai`, 
      icon: <Brain className="h-5 w-5" /> 
    }
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 h-screen z-40 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        w-64 bg-white border-r border-gray-200 flex flex-col
      `}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              {tenant[0]?.toUpperCase() || 'W'}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{tenant}</div>
              <div className="text-xs text-gray-500">{role}</div>
            </div>
          </div>
          {isMobile && (
            <button onClick={() => setSidebarOpen(false)} className="md:hidden">
              <X className="h-5 w-5 text-gray-500" />
            </button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {nav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                      ${isActive 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                    onClick={() => isMobile && setSidebarOpen(false)}
                  >
                    <span className={isActive ? 'text-blue-600' : 'text-gray-500'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Link
            href="/signin"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <LogOut className="h-5 w-5 text-gray-500" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/30 z-30 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="h-5 w-5 text-gray-700" />
            </button>
            <div className="flex-1 md:flex-none">
              <h1 className="text-lg font-semibold text-gray-900 truncate">
                {nav.find(n => n.href === pathname)?.label || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-sm text-gray-600">
                {tenant}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
