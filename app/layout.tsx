import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { MotionProvider } from '@/components/motion/motion';
import { ThemeProvider } from '@/components/providers/theme-provider';

export const metadata: Metadata = {
  title: 'WorkSense HR',
  description: 'Next.js template for building a multi-tenant SaaS.'
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
      <body>
        {/* Header moved to components/core/Header */}
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
