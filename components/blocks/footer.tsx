import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Footer() {
  const navigation = [
    { name: "Product", href: "/#features" },
    { name: "About Us", href: "/about" },
    { name: "Pricing", href: "/pricing" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  const social = [
    { name: "Twitter", href: "#" },
    { name: "LinkedIn", href: "#" },
  ];

  const legal = [{ name: "Privacy Policy", href: "/privacy" }];

  return (
    <footer className="flex flex-col items-center gap-14 pt-28 lg:pt-32">
      <div className="container space-y-3 text-center">
        <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
          Start your free trial today
        </h2>
        <p className="text-muted-foreground mx-auto max-w-xl leading-snug text-balance">
          WorkSense is the fit-for-purpose tool for modern HR management and
          multi-tenant organizations.
        </p>
        <div>
          <Button size="lg" className="mt-4" asChild>
            <Link href="/signup">Get started</Link>
          </Button>
        </div>
      </div>

      <nav className="container flex flex-col items-center gap-4">
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="font-medium transition-opacity hover:opacity-75"
              >
                {item.name}
              </Link>
            </li>
          ))}
          {social.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center gap-0.5 font-medium transition-opacity hover:opacity-75"
              >
                {item.name} <ArrowUpRight className="size-4" />
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {legal.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="text-muted-foreground text-sm transition-opacity hover:opacity-75"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="text-primary mt-10 w-full md:mt-14 lg:mt-20">
        <svg
          viewBox="0 0 1200 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <text
            x="50%"
            y="80"
            textAnchor="middle"
            className="fill-current"
            style={{
              fontSize: "100px",
              fontWeight: "bold",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            WorkSense
          </text>
          <defs>
            <linearGradient
              id="footer-gradient"
              x1="600"
              y1="0"
              x2="600"
              y2="100"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="currentColor" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </footer>
  );
}
