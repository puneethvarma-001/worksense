"use client";
import React, { useState } from "react";
import Link from "next/link";

import { Background } from "@/components/shared/background";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/blocks/navbar";
import { Footer } from "@/components/blocks/footer";
import { Metadata } from "next";
import { protocol, rootDomain } from "@/lib/utils";

// export const metadata: Metadata = {
//   title: "Sign Up",
//   description: "Create your WorkSense organization.",
// };

export default function SignupPage() {
  const [orgName, setOrgName] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e?: React.FormEvent) {
    if (e && typeof (e as any).preventDefault === 'function') (e as any).preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const res = await fetch("/api/tenants/create", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ subdomain, name: orgName, emoji: "🏢", owner: { name: fullName, email } }),
      });

      const json = await res.json().catch(() => ({ success: false }));
      if (json?.success) {
        const sanitized = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, "");
        const fallback = `${protocol}://${sanitized}.${rootDomain}`;
        const dashboardUrl = json.dashboardUrl || fallback;
        // Clear fields and navigate
        setOrgName("");
        setSubdomain("");
        setFullName("");
        setEmail("");
        setPassword("");
        location.href = dashboardUrl;
      } else {
        setMessage(json?.error || "Failed to create organization");
      }
    } catch (err) {
      setMessage("Failed to create organization");
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
                    <p className="mb-2 text-2xl font-bold">Start your free trial</p>
                    <p className="text-muted-foreground">
                      Create your organization in minutes.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={(e) => { e.preventDefault(); void handleSubmit(e); }} className="grid gap-4">
                      <Input value={orgName} onChange={(e) => setOrgName((e.target as HTMLInputElement).value)} type="text" placeholder="Organization name" required />
                      <Input value={subdomain} onChange={(e) => setSubdomain((e.target as HTMLInputElement).value)} type="text" placeholder="Choose your subdomain" required />
                      <Input value={fullName} onChange={(e) => setFullName((e.target as HTMLInputElement).value)} type="text" placeholder="Enter your name" required />
                      <Input value={email} onChange={(e) => setEmail((e.target as HTMLInputElement).value)} type="email" placeholder="Enter your email" required />
                      <div>
                        <Input
                          value={password}
                          onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
                          type="password"
                          placeholder="Enter your password"
                          required
                        />
                        <p className="text-muted-foreground mt-1 text-sm">
                          Must be at least 8 characters.
                        </p>
                      </div>
                      <Button type="button" onClick={() => void handleSubmit()} className="mt-2 w-full" disabled={loading}>
                        {loading ? 'Creating...' : 'Create organization'}
                      </Button>
                      <Button variant="outline" className="w-full">
                        Sign up with SSO
                      </Button>
                    </form>
                    {message ? (
                      <div className="text-muted-foreground mx-auto mt-8 flex justify-center gap-1 text-sm">
                        <p>{message}</p>
                      </div>
                    ) : (
                      <div className="text-muted-foreground mx-auto mt-8 flex justify-center gap-1 text-sm">
                        <p>Already have an account?</p>
                        <Link href="/signin" className="text-primary font-medium">
                          Sign in
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
