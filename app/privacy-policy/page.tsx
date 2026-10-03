import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Plum Tree Tours handles information submitted through this website."
};

const lastUpdated = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date());

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" subtitle={`Last updated: ${lastUpdated}`} />

      <section className="container max-w-2xl py-16">
        <div className="space-y-10 text-sm leading-relaxed text-ink-secondary">
          <div>
            <h2 className="text-h3 text-ink">1. Introduction</h2>
            <p className="mt-3">
              This Privacy Policy explains how Plum Tree Tours collects, uses and protects information
              submitted through this website. By using this site, you agree to the practices described
              here. This policy may be updated as our services and tools develop — see Section 10.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-ink">2. Information We Collect</h2>
            <p className="mt-3">When you submit a tour booking enquiry or contact form, we may collect:</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone / WhatsApp number</li>
              <li>Destination and tour preferences, travel dates, and number of travellers</li>
              <li>Any additional message or request you choose to include</li>
            </ul>
            <p className="mt-3">
              We do not currently collect payment information, as online payment is not available on this website.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-ink">3. How Booking and Enquiry Information Is Used</h2>
            <p className="mt-3">
              Information submitted through the Book a Tour or Contact pages is used solely to respond
              to your enquiry, discuss tour options, and coordinate a booking. We do not sell or rent
              your information to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-ink">4. WhatsApp Communication</h2>
            <p className="mt-3">
              Our booking and contact forms may open WhatsApp with your details pre-filled, so you can
              send your enquiry directly to us. This message is prepared in your browser and only sent
              if you choose to send it — we do not receive form submissions until you do. Once sent,
              your conversation takes place on WhatsApp, which is operated by Meta and governed by
              WhatsApp&apos;s own privacy policy, not this one.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-ink">5. Cookies and Website Analytics</h2>
            <p className="mt-3">
              This website does not currently use tracking cookies or analytics tools. If this changes
              in future — for example, to understand general website usage — this policy will be updated
              to reflect that.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-ink">6. Third-Party Services</h2>
            <p className="mt-3">
              Website content (such as tours, destinations, and blog posts) is managed using Sanity, a
              third-party content management platform. Sanity stores the content displayed on this site;
              it is not used to store personal information submitted through our forms. We do not
              currently integrate any other third-party services on this website.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-ink">7. Data Security</h2>
            <p className="mt-3">
              We take reasonable steps to protect information shared with us. However, no method of
              transmission over the internet is completely secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-ink">8. Data Retention</h2>
            <p className="mt-3">
              We retain enquiry and booking information only for as long as necessary to respond to your
              request and coordinate your tour, unless a longer period is required for legitimate business
              or legal reasons.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-ink">9. Your Rights and Enquiries</h2>
            <p className="mt-3">
              You may ask us what information we hold about you, request a correction, or request that it
              be deleted, in line with applicable Nigerian data protection regulations. To make a request,
              contact us using the details in Section 11.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-ink">10. Changes to This Policy</h2>
            <p className="mt-3">
              We may update this Privacy Policy as our website, tools, or services change. The &quot;Last
              updated&quot; date at the top of this page reflects the most recent revision.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-ink">11. Contact Us</h2>
            <p className="mt-3">
              For questions about this Privacy Policy or your information, contact us at{" "}
              <a href="mailto:plumtreetours01@gmail.com" className="text-purple-700 hover:text-gold">
                plumtreetours01@gmail.com
              </a>{" "}
              or via WhatsApp through our{" "}
              <a href="/contact" className="text-purple-700 hover:text-gold">Contact page</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
