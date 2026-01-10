"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { Background } from "@/components/shared/background";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/blocks/navbar";
import { Footer } from "@/components/blocks/footer";
import { Metadata } from "next";
import { protocol, rootDomain } from "@/lib/utils";

// export const metadata: Metadata = {
//   title: "Sign In",
//   description: "Sign in to your WorkSense organization.",
// };

export default function SigninPage() {
  const [subdomain, setSubdomain] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // pick up ?role= param if present (for demo use elsewhere)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get("role");
    if (roleParam) {
      // role can be passed, server will validate; keep it available via message for now
      setMessage(`Signing in as ${roleParam}`);
    }
  }, []);

  async function handleSubmit(e?: React.FormEvent) {
    if (e && typeof (e as any).preventDefault === 'function') (e as any).preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ subdomain, email }),
      });

      const json = await res.json().catch(() => ({ success: false }));
      if (json?.success) {
        const sanitized = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, "");
        const fallback = `${protocol}://${sanitized}.${rootDomain}`;
        const dashboardUrl = json.dashboardUrl || fallback;
        setEmail("");
        setSubdomain("");
        setPassword("");
        location.href = dashboardUrl;
      } else {
        setMessage(json?.error || "Sign in failed");
      }
    } catch (err) {
      setMessage("Sign in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <Background>
          <section className="py-28 lg:pt-44 lg:pb-32">
            <div className="container">
              <div className="flex flex-col gap-4">
                <Card className="mx-auto w-full max-w-sm">
                  <CardHeader className="flex flex-col items-center space-y-0">
                    <span className="mb-7 text-xl font-bold">WorkSense</span>
                    <p className="mb-2 text-2xl font-bold">Welcome back</p>
                    <p className="text-muted-foreground">
                      Please enter your details.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={(e) => { e.preventDefault(); void handleSubmit(e); }} className="grid gap-4">
                      <Input value={subdomain} onChange={(e) => setSubdomain((e.target as HTMLInputElement).value)} type="text" placeholder="Enter your subdomain" required />
                      <Input value={email} onChange={(e) => setEmail((e.target as HTMLInputElement).value)} type="email" placeholder="Enter your email" required />
                      <div>
                        <Input value={password} onChange={(e) => setPassword((e.target as HTMLInputElement).value)} type="password" placeholder="Enter your password" required />
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="remember" checked={remember} onCheckedChange={(val) => setRemember(!!val)} className="border-muted-foreground" />
                          <label
                            htmlFor="remember"
                            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Remember me
                          </label>
                        </div>
                        <button type="button" className="text-primary text-sm font-medium hover:underline">
                          Forgot password
                        </button>
                      </div>
                      <Button type="button" onClick={() => void handleSubmit()} className="mt-2 w-full" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign in'}
                      </Button>
                      <Button variant="outline" className="w-full">
                        Sign in with SSO
                      </Button>
                    </form>
                    {message ? (
                      <div className="text-muted-foreground mx-auto mt-8 flex justify-center gap-1 text-sm">
                        <p>{message}</p>
                      </div>
                    ) : (
                      <div className="text-muted-foreground mx-auto mt-8 flex justify-center gap-1 text-sm">
                        <p>Don&apos;t have an account?</p>
                        <Link href="/signup" className="text-primary font-medium">
                          Sign up
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </Background>
      </main>
      <Footer />
    </>
  );
}
