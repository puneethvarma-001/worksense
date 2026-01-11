export type TenantFlags = Record<string, boolean> | undefined;

export function parseFlags(header?: string | null): TenantFlags {
  if (!header) return undefined;

  // Try JSON first
  try {
    const parsed = JSON.parse(header);
    if (typeof parsed === 'object' && parsed !== null) return parsed;
  } catch (e) {
    // ignore
  }

  // Try CSV of enabled flags (e.g. "FEATURE_A,FEATURE_B")
  try {
    const parts = header.split(',').map((p) => p.trim()).filter(Boolean);
    if (parts.length) return Object.fromEntries(parts.map((k) => [k, true]));
  } catch (e) {
    // ignore
  }

  return undefined;
}

export function parseDemoRole(cookie?: string | null): string | undefined {
  if (!cookie) return undefined;
  try {
    // Some user agents/proxies or cookie handling may URL-encode the value
    // or replace '+' with spaces — normalize first.
    let normalized = cookie;
    try {
      normalized = decodeURIComponent(normalized);
    } catch (e) {
      // ignore invalid decodeURIComponent
    }
    // Replace any whitespace (where '+' might have become ' ') back to '+' for base64
    normalized = normalized.replace(/\s/g, '+');

    // cookie contains base64-encoded JSON like { role: 'Employee' }
    const decoded = Buffer.from(normalized, 'base64').toString('utf-8');
    const parsed = JSON.parse(decoded);
    return parsed?.role ?? undefined;
  } catch (e) {
    return undefined;
  }
}
