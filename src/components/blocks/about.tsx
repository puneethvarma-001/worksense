import Link from "next/link";

import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <section className="container mt-10 flex max-w-5xl flex-col-reverse gap-8 md:mt-14 md:gap-14 lg:mt-20 lg:flex-row lg:items-end">
      {/* Left Column */}
      <div className="flex flex-col gap-8 lg:gap-16 xl:gap-20">
        <div className="flex-1 space-y-4 text-lg md:space-y-6">
          <h2 className="text-foreground text-4xl">Our Mission</h2>
          <div className="text-muted-foreground max-w-xl space-y-6">
            <p>
              We started building WorkSense in 2022 with a simple goal: make
              enterprise-grade HR accessible to everyone. Every feature has been
              designed from the ground up with multi-tenancy and scalability in
              mind.
            </p>
            <p>
              We are 100% committed to delivering the best HR experience for
              modern teams. Whether you&apos;re a startup with 5 employees or an
              enterprise with thousands, WorkSense scales with you.
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-4 text-lg md:space-y-6">
          <h2 className="text-foreground text-4xl">The Team</h2>
          <div className="text-muted-foreground max-w-xl space-y-6">
            <p>
              Our team consists of HR professionals and engineers who understand
              the challenges of managing people at scale. We&apos;ve built tools at
              companies like Workday, BambooHR, and Gusto.
            </p>
            <p>
              If you&apos;re interested in building the future of HR technology,
              check out our open roles below.
            </p>
          </div>
          <div className="mt-8">
            <Link href="/contact">
              <Button size="lg">Get in touch</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-8 lg:gap-16 xl:gap-20">
        <div className="flex-1 space-y-4 text-lg md:space-y-6">
          <div className="text-muted-foreground max-w-xl space-y-6">
            <p>
              At WorkSense, we are dedicated to transforming how organizations
              manage their most valuable asset: their people. Our mission is to
              provide teams with an unbeatable edge through intuitive tools and
              actionable insights.
            </p>
            <p>
              We&apos;re customer-obsessed — investing the time to understand every
              aspect of your HR workflow so that we can help you operate better
              than ever before. We&apos;re all in this together because your success
              is our success.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
