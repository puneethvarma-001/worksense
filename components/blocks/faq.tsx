import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const categories = [
  {
    title: "Getting Started",
    questions: [
      {
        question: "How do I create my organization?",
        answer:
          "Simply sign up with your email, choose a subdomain for your organization, and you're ready to go. Our onboarding process guides you through the initial setup.",
      },
      {
        question: "Can I import existing employee data?",
        answer:
          "Yes, WorkSense supports bulk import via CSV. You can also integrate with existing HR systems through our API.",
      },
      {
        question: "How does multi-tenant isolation work?",
        answer:
          "Each organization operates in a completely isolated environment with its own data, settings, and users. There's no data sharing between tenants.",
      },
    ],
  },
  {
    title: "Features & Pricing",
    questions: [
      {
        question: "Is there a free tier available?",
        answer:
          "Yes, we offer a free tier for small teams with up to 10 employees. This includes core HR features and basic reporting.",
      },
      {
        question: "What features are included in the premium plan?",
        answer:
          "Premium includes advanced analytics, custom workflows, API access, priority support, and integrations with popular tools like Slack and Microsoft Teams.",
      },
    ],
  },
  {
    title: "Support",
    questions: [
      {
        question: "How do I get support?",
        answer:
          "You can reach our support team via the contact form, email, or through the in-app chat. Enterprise customers get dedicated account managers.",
      },
      {
        question: "Do you offer training or onboarding assistance?",
        answer:
          "Yes, we provide comprehensive documentation, video tutorials, and live onboarding sessions for enterprise customers.",
      },
    ],
  },
];

export const FAQ = ({
  headerTag = "h2",
  className,
  className2,
}: {
  headerTag?: "h1" | "h2";
  className?: string;
  className2?: string;
}) => {
  return (
    <section className={cn("py-28 lg:py-32", className)}>
      <div className="container max-w-5xl">
        <div className={cn("mx-auto grid gap-16 lg:grid-cols-2", className2)}>
          <div className="space-y-4">
            {headerTag === "h1" ? (
              <h1 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
                Got Questions?
              </h1>
            ) : (
              <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
                Got Questions?
              </h2>
            )}
            <p className="text-muted-foreground max-w-md leading-snug lg:mx-auto">
              If you can&apos;t find what you&apos;re looking for,{" "}
              <Link href="/contact" className="underline underline-offset-4">
                get in touch
              </Link>
              .
            </p>
          </div>

          <div className="grid gap-6 text-start">
            {categories.map((category, categoryIndex) => (
              <div key={category.title}>
                <h3 className="text-muted-foreground border-b py-4">
                  {category.title}
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item, i) => (
                    <AccordionItem key={i} value={`${categoryIndex}-${i}`}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
