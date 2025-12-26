'use client';
import React from 'react';

export function FeatureFlagBadge({ flags }: { flags?: Record<string, boolean> }) {
  if (!flags || Object.keys(flags).length === 0) {
    return (
      <div className="rounded-md bg-gray-100 p-2 text-xs text-gray-700" aria-hidden>
        <span className="text-gray-500">No flags</span>
      </div>
    );
  }

  const enabled = Object.entries(flags).filter(([, v]) => v);

  return (
    <div className="rounded-md bg-gray-50 border px-3 py-1 text-xs text-gray-700" aria-live="polite">
      <strong className="mr-2">Flags</strong>
      <span className="text-sm font-medium mr-2">{enabled.length}/{Object.keys(flags).length} enabled</span>
      <span className="sr-only">Feature flags enabled: {enabled.map(([k]) => k).join(', ')}</span>
    </div>
  );
}
