import React from 'react';

export default async function LeavePage() {
  // Minimal scaffold for the Leave module
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Leave (Mock)</h1>
      <p className="mt-2 text-sm text-muted-foreground">This page is a scaffold for the Leave module — server actions and RBAC will be added to enforce apply/approve flows.</p>

      <div className="mt-6">
        <h2 className="font-medium">My Leaves</h2>
        <ul className="mt-2 list-disc list-inside text-sm">
          <li>2025-12-01 — Annual Leave — Approved</li>
          <li>2025-11-15 — Sick Leave — Pending</li>
        </ul>
      </div>
    </div>
  );
}
