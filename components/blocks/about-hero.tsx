import { DashedLine } from "@/components/shared/dashed-line";

const stats = [
  {
    value: "10K+",
    label: "Organizations",
  },
  {
    value: "500K",
    label: "Employees managed",
  },
  {
    value: "99.9%",
    label: "Uptime SLA",
  },
  {
    value: "24/7",
    label: "Support",
  },
];

export function AboutHero() {
  return (
    <section>
      <div className="container flex max-w-5xl flex-col justify-between gap-8 md:gap-20 lg:flex-row lg:items-center lg:gap-24 xl:gap-24">
        <div className="flex-[1.5]">
          <h1 className="text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Modern HR for modern teams
          </h1>

          <p className="text-muted-foreground mt-5 text-2xl md:text-3xl lg:text-4xl">
            WorkSense is bringing enterprise HR to organizations of all sizes.
          </p>

          <p className="text-muted-foreground mt-8 hidden max-w-lg space-y-6 text-lg text-balance md:block lg:mt-12">
            At WorkSense, we are dedicated to transforming how organizations
            manage their people. Our mission is to provide teams with powerful,
            yet simple HR tools that scale with their growth.
            <br />
            <br />
            We&apos;re customer-obsessed — investing the time to understand every
            aspect of your HR workflow so that we can help you operate better
            than ever before. We&apos;re all in this together because your success is
            our success.
          </p>
        </div>

        <div
          className={`relative flex flex-1 flex-col justify-center gap-3 pt-10 lg:pt-0 lg:pl-10`}
        >
          <DashedLine
            orientation="vertical"
            className="absolute top-0 left-0 max-lg:hidden"
          />
          <DashedLine
            orientation="horizontal"
            className="absolute top-0 lg:hidden"
          />
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <div className="text-4xl tracking-wide md:text-5xl font-semibold">
                {stat.value}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
