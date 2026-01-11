import { Background } from "@/components/shared/background";
import About from "@/components/blocks/about";
import { AboutHero } from "@/components/blocks/about-hero";
import { DashedLine } from "@/components/shared/dashed-line";
import { Navbar } from "@/components/blocks/navbar";
import { Footer } from "@/components/blocks/footer";

export const metadata = {
  title: "About Us",
  description: "Learn more about WorkSense and our mission to transform HR management.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <Background>
          <div className="py-28 lg:py-32 lg:pt-44">
            <AboutHero />
            <About />
            <div className="pt-28 lg:pt-32">
              <DashedLine className="container max-w-5xl scale-x-115" />
            </div>
          </div>
        </Background>
      </main>
      <Footer />
    </>
  );
}
