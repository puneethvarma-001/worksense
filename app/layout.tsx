import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { MotionProvider } from '@/components/motion/motion';
import { ThemeProvider } from '@/components/providers/theme-provider';

export const metadata: Metadata = {
  title: {
    default: 'WorkSense HR - Modern Multi-tenant HRMS',
    template: '%s | WorkSense HR',
  },
  description: 'Enterprise HRMS platform designed for modern, multi-tenant organizations. Manage your team with powerful HR tools that scale.',
  keywords: [
    'HR software',
    'HRMS',
    'multi-tenant',
    'employee management',
    'HR platform',
    'SaaS HR',
  ],
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  const theme = localStorage.getItem("theme");
                  if (theme === "dark") document.documentElement.classList.add("dark");
                  if (theme === "light") document.documentElement.classList.remove("dark");
                } catch (_) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <MotionProvider>
            {children}
          </MotionProvider>
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
