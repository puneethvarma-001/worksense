import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const protocol =
  process.env.NODE_ENV === 'production' ? 'http' : 'http';
export const rootDomain =
  process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clearDemoSessionCookie() {
  if (typeof document === 'undefined') return;
  // Clear cookie on current host
  document.cookie = 'demo_session=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

  try {
    // Try a few domain variations (strip port if present)
    const host = rootDomain.split(':')[0];
    // Clear cookie for explicit host and dot-prefixed domain
    document.cookie = `demo_session=; Path=/; Domain=${host}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `demo_session=; Path=/; Domain=.${host}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  } catch (err) {
    // best-effort; ignore errors
    // some browsers/hosts will ignore Domain clears on localhost
  }
}
