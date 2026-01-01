import Link from "next/link";

import { Background } from "@/components/shared/background";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/blocks/navbar";
import { Footer } from "@/components/blocks/footer";

export const metadata = {
  title: "Sign Up",
  description: "Create your WorkSense organization.",
};

export default function SignupPage() {
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
                    <form className="grid gap-4">
                      <Input type="text" placeholder="Organization name" required />
                      <Input type="text" placeholder="Choose your subdomain" required />
                      <Input type="text" placeholder="Enter your name" required />
                      <Input type="email" placeholder="Enter your email" required />
                      <div>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          required
                        />
                        <p className="text-muted-foreground mt-1 text-sm">
                          Must be at least 8 characters.
                        </p>
                      </div>
                      <Button type="submit" className="mt-2 w-full">
                        Create organization
                      </Button>
                      <Button variant="outline" className="w-full">
                        Sign up with SSO
                      </Button>
                    </form>
                    <div className="text-muted-foreground mx-auto mt-8 flex justify-center gap-1 text-sm">
                      <p>Already have an account?</p>
                      <Link href="/signin" className="text-primary font-medium">
                        Sign in
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
