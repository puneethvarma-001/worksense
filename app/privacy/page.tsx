import { Navbar } from "@/components/blocks/navbar";
import { Footer } from "@/components/blocks/footer";

export const metadata = {
  title: "Privacy Policy",
  description: "WorkSense privacy policy and data protection information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="mx-auto max-w-2xl px-4 py-28 lg:pt-44 lg:pb-32">
          <article className="prose prose-lg dark:prose-invert">
            <h1>Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: January 01, 2025</p>
            
            <p>
              This Privacy Policy describes Our policies and procedures on the collection, 
              use and disclosure of Your information when You use the Service and tells 
              You about Your privacy rights and how the law protects You.
            </p>

            <h2>Interpretation and Definitions</h2>
            
            <h3>Interpretation</h3>
            <p>
              The words of which the initial letter is capitalized have meanings defined 
              under the following conditions. The following definitions shall have the 
              same meaning regardless of whether they appear in singular or in plural.
            </p>

            <h3>Definitions</h3>
            <p>For the purposes of this Privacy Policy:</p>
            <ul>
              <li>
                <strong>Account</strong> means a unique account created for You to access 
                our Service or parts of our Service.
              </li>
              <li>
                <strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, 
                &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to WorkSense HR.
              </li>
              <li>
                <strong>Cookies</strong> are small files that are placed on Your computer, 
                mobile device or any other device by a website.
              </li>
              <li>
                <strong>Personal Data</strong> is any information that relates to an 
                identified or identifiable individual.
              </li>
              <li>
                <strong>Service</strong> refers to the Website.
              </li>
            </ul>

            <h2>Collecting and Using Your Personal Data</h2>
            
            <h3>Types of Data Collected</h3>
            
            <h4>Personal Data</h4>
            <p>
              While using Our Service, We may ask You to provide Us with certain 
              personally identifiable information that can be used to contact or 
              identify You. Personally identifiable information may include, but 
              is not limited to:
            </p>
            <ul>
              <li>Email address</li>
              <li>First name and last name</li>
              <li>Usage Data</li>
            </ul>

            <h4>Usage Data</h4>
            <p>
              Usage Data is collected automatically when using the Service. Usage 
              Data may include information such as Your Device&apos;s Internet Protocol 
              address (e.g. IP address), browser type, browser version, the pages 
              of our Service that You visit, the time and date of Your visit, the 
              time spent on those pages, unique device identifiers and other 
              diagnostic data.
            </p>

            <h2>Use of Your Personal Data</h2>
            <p>The Company may use Personal Data for the following purposes:</p>
            <ul>
              <li>
                <strong>To provide and maintain our Service</strong>, including 
                to monitor the usage of our Service.
              </li>
              <li>
                <strong>To manage Your Account:</strong> to manage Your registration 
                as a user of the Service.
              </li>
              <li>
                <strong>To contact You:</strong> To contact You by email, telephone 
                calls, SMS, or other equivalent forms of electronic communication.
              </li>
              <li>
                <strong>To provide You</strong> with news, special offers and general 
                information about other goods, services and events.
              </li>
            </ul>

            <h2>Security of Your Personal Data</h2>
            <p>
              The security of Your Personal Data is important to Us, but remember 
              that no method of transmission over the Internet, or method of 
              electronic storage is 100% secure. While We strive to use commercially 
              acceptable means to protect Your Personal Data, We cannot guarantee 
              its absolute security.
            </p>

            <h2>Children&apos;s Privacy</h2>
            <p>
              Our Service does not address anyone under the age of 13. We do not 
              knowingly collect personally identifiable information from anyone 
              under the age of 13.
            </p>

            <h2>Changes to this Privacy Policy</h2>
            <p>
              We may update Our Privacy Policy from time to time. We will notify 
              You of any changes by posting the new Privacy Policy on this page.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, You can contact us:
            </p>
            <ul>
              <li>By email: privacy@worksense.com</li>
              <li>By visiting the contact page on our website</li>
            </ul>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}
