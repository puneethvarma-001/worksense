"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, LogOut } from 'lucide-react';
import { clearDemoSessionCookie, protocol, rootDomain } from '@/lib/utils';

type NavItem = {
  key: string;
  label: string;
  href: string;
  icon: React.ReactNode;
};

interface SidebarProps {
  tenant: string;
  subdomain: string;
  role: string;
  navItems: NavItem[];
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
}

export function Sidebar({
  tenant,
  subdomain,
  role,
  navItems,
  isOpen,
  onClose,
  isMobile
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={`
      fixed md:sticky top-0 left-0 h-screen z-40 transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
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
          <button onClick={onClose} className="md:hidden">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
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
                  onClick={() => isMobile && onClose()}
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
        <button
          onClick={() => {
            clearDemoSessionCookie();
            if (isMobile) onClose();
            window.location.href = `${protocol}://${rootDomain}/signin`;
          }}
          className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <LogOut className="h-5 w-5 text-gray-500" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}