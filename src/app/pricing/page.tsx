import { Background } from "@/components/shared/background";
import { Pricing } from "@/components/blocks/pricing";
import { Navbar } from "@/components/blocks/navbar";
import { Footer } from "@/components/blocks/footer";

export const metadata = {
  title: "Pricing",
  description: "Flexible pricing plans for teams of all sizes.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Background>
          <Pricing className="py-28 text-center lg:pt-44 lg:pb-32" />
        </Background>
      </main>
      <Footer />
    </>
  );
}
