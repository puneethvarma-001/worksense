import { Background } from "@/components/shared/background";
import Contact from "@/components/blocks/contact";
import { Navbar } from "@/components/blocks/navbar";
import { Footer } from "@/components/blocks/footer";

export const metadata = {
  title: "Contact",
  description: "Get in touch with WorkSense. We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <Background>
          <Contact />
        </Background>
      </main>
      <Footer />
    </>
  );
}
