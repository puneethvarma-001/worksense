import Link from "next/link";

import { Background } from "@/components/shared/background";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/blocks/navbar";
import { Footer } from "@/components/blocks/footer";

export const metadata = {
  title: "Sign In",
  description: "Sign in to your WorkSense organization.",
};

export default function SigninPage() {
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
                    <form className="grid gap-4">
                      <Input type="text" placeholder="Enter your subdomain" required />
                      <Input type="email" placeholder="Enter your email" required />
                      <div>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          required
                        />
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="remember"
                            className="border-muted-foreground"
                          />
                          <label
                            htmlFor="remember"
                            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Remember me
                          </label>
                        </div>
                        <a href="#" className="text-primary text-sm font-medium">
                          Forgot password
                        </a>
                      </div>
                      <Button type="submit" className="mt-2 w-full">
                        Sign in
                      </Button>
                      <Button variant="outline" className="w-full">
                        Sign in with SSO
                      </Button>
                    </form>
                    <div className="text-muted-foreground mx-auto mt-8 flex justify-center gap-1 text-sm">
                      <p>Don&apos;t have an account?</p>
                      <Link href="/signup" className="text-primary font-medium">
                        Sign up
                      </Link>
                    </div>
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
