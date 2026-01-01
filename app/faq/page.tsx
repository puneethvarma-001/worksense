import { Background } from "@/components/shared/background";
import { FAQ } from "@/components/blocks/faq";
import { DashedLine } from "@/components/shared/dashed-line";
import { Navbar } from "@/components/blocks/navbar";
import { Footer } from "@/components/blocks/footer";

export const metadata = {
  title: "FAQ",
  description: "Frequently asked questions about WorkSense HR platform.",
};

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main>
        <Background>
          <FAQ
            className="py-28 text-center lg:pt-44 lg:pb-32"
            className2="max-w-xl lg:grid-cols-1"
            headerTag="h1"
          />
          <DashedLine className="mx-auto max-w-xl" />
        </Background>
      </main>
      <Footer />
    </>
  );
}
