"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Facebook, Linkedin, Twitter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DashedLine } from "@/components/shared/dashed-line";

const contactInfo = [
  {
    title: "Corporate office",
    content: (
      <p className="text-muted-foreground mt-3">
        123 Business Park
        <br />
        San Francisco, CA 94102
      </p>
    ),
  },
  {
    title: "Email us",
    content: (
      <div className="mt-3">
        <div>
          <p>Sales</p>
          <Link
            href="mailto:sales@worksense.com"
            className="text-muted-foreground hover:text-foreground"
          >
            sales@worksense.com
          </Link>
        </div>
        <div className="mt-1">
          <p>Support</p>
          <Link
            href="mailto:support@worksense.com"
            className="text-muted-foreground hover:text-foreground"
          >
            support@worksense.com
          </Link>
        </div>
      </div>
    ),
  },
  {
    title: "Follow us",
    content: (
      <div className="mt-3 flex gap-6 lg:gap-10">
        <Link href="#" className="text-muted-foreground hover:text-foreground">
          <Facebook className="size-5" />
        </Link>
        <Link href="#" className="text-muted-foreground hover:text-foreground">
          <Twitter className="size-5" />
        </Link>
        <Link href="#" className="text-muted-foreground hover:text-foreground">
          <Linkedin className="size-5" />
        </Link>
      </div>
    ),
  },
];

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <section className="py-28 lg:py-32 lg:pt-44">
      <div className="container max-w-2xl">
        <h1 className="text-center text-2xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
          Contact us
        </h1>
        <p className="text-muted-foreground mt-4 text-center leading-snug font-medium lg:mx-auto">
          We&apos;d love to hear from you. Send us a message.
        </p>

        <div className="mt-10 flex justify-between gap-8 max-sm:flex-col md:mt-14 lg:mt-20 lg:gap-12">
          {contactInfo.map((info, index) => (
            <div key={index}>
              <h2 className="font-medium">{info.title}</h2>
              {info.content}
            </div>
          ))}
        </div>

        <DashedLine className="my-12" />

        {/* Inquiry Form */}
        <div className="mx-auto">
          <h2 className="mb-4 text-lg font-semibold">Inquiries</h2>
          
          {isSubmitted ? (
            <div className="w-full gap-2 rounded-md border p-2 sm:p-5 md:p-8">
              <div className="h-full px-3 py-6">
                <div className="mx-auto mb-4 flex w-fit justify-center rounded-full border p-2">
                  <Check className="size-8" />
                </div>
                <h2 className="mb-2 text-center text-2xl font-bold text-pretty">
                  Thank you
                </h2>
                <p className="text-muted-foreground text-center text-lg text-pretty">
                  Form submitted successfully, we will get back to you soon
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-2 space-y-4 rounded-md"
            >
              <div className="w-full space-y-2">
                <Label htmlFor="name">Full name *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="First and last name"
                  required
                />
              </div>

              <div className="w-full space-y-2">
                <Label htmlFor="email">Email address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="me@company.com"
                  required
                />
              </div>

              <div className="w-full space-y-2">
                <Label htmlFor="company">Company name</Label>
                <Input id="company" type="text" placeholder="Company name" />
              </div>

              <div className="w-full space-y-2">
                <Label htmlFor="employees">Number of employees</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="e.g. 11-50" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2-10">2-10</SelectItem>
                    <SelectItem value="11-50">11-50</SelectItem>
                    <SelectItem value="51-500">51-500</SelectItem>
                    <SelectItem value="500+">500+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full space-y-2">
                <Label htmlFor="message">Your message *</Label>
                <Textarea
                  id="message"
                  placeholder="Write your message"
                  className="resize-none"
                  required
                />
              </div>

              <div className="flex flex-row items-start space-y-0 space-x-2">
                <Checkbox id="agree" required />
                <Label htmlFor="agree" className="leading-none">
                  I agree to the terms and conditions
                </Label>
              </div>

              <div className="flex w-full items-center justify-end pt-3">
                <Button type="submit" className="rounded-lg" size="sm">
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
