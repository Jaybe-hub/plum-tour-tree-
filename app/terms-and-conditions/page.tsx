import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using the Plum Tree Tours website and submitting tour enquiries."
};

const lastUpdated = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date());

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms & Conditions" subtitle={`Last updated: ${lastUpdated}`} />

      <section className="container max-w-2xl py-16">
        <div className="space-y-10 text-sm leading-relaxed text-ink-secondary">
          <div>
            <h2 className="text-h3 text-ink">1. Use of the Website</h2>
            <p className="mt-3">
              By using this website, you agree to use it only for lawful purposes related to browsing
              tour information and submitting genuine tour enquiries or booking requests. You agree not
              to misuse the site or attempt to interfere with its normal operation.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-ink">2. Tour Information and Availability</h2>
            <p className="mt-3">
              We aim to keep tour details — including descriptions, itineraries, images and pricing —
              accurate and up to date. However, availability, pricing and other details may change, and
              a tour shown on the website is not guaranteed to be available until confirmed with us directly.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-ink">3. Tour Enquiries and Booking Requests</h2>
            <p className="mt-3">
              Submitting a booking request through this website (including via WhatsApp) is an enquiry,
              not a confirmed booking. It indicates your interest in a tour and allows us to follow up
              with you regarding availability, pricing and next steps.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-ink">4. Booking Confirmation</h2>
            <p className="mt-3">
              A booking is only confirmed once we have communicated confirmation to you directly, following
              your enquiry. Online payment is not currently available on this website; any payment or
              confirmation process will be communicated to you separately.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-ink">5. Pricing and Price Changes</h2>
            <p className="mt-3">
              Prices shown on the website are indicative and may change without prior notice. The final
              price for your tour will be confirmed with you before booking is finalised.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-ink">6. Customer Responsibilities</h2>
            <p className="mt-3">
              When submitting an enquiry, you are responsible for providing accurate contact and travel
              information. You are also responsible for ensuring you meet any requirements relevant to
              your chosen tour (such as fitness for activities involved), as communicated to you.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-ink">7. Cancellation and Refund Terms</h2>
            <p className="mt-3">
              Cancellation and refund terms will be communicated to the customer and confirmed at the
              time of booking.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-ink">8. Changes to Tour Itineraries</h2>
            <p className="mt-3">
              Occasionally, a tour itinerary may need to change due to circumstances outside our control
              (such as weather, safety, or availability). Where possible, we will inform you of any
              significant changes in advance.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-ink">9. Third-Party Tour and Activity Providers</h2>
            <p className="mt-3">
              Some tours may involve third-party providers, such as accommodation or activity operators.
              Where this applies, it will be made clear as part of the specific tour details. We work to
              select reliable providers, but are not responsible for circumstances beyond our reasonable control.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-ink">10. Website Content and Intellectual Property</h2>
            <p className="mt-3">
              All content on this website — including text, images, logos and branding — belongs to Plum
              Tree Tours or its licensors, unless otherwise stated. You may not copy, reproduce or reuse
              this content without our permission.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-ink">11. Limitation of Liability</h2>
            <p className="mt-3">
              While we take care to provide accurate information and coordinate tours responsibly, we are
              not liable for indirect losses arising from use of this website or from circumstances beyond
              our reasonable control. Nothing in these terms limits any liability that cannot be excluded
              under applicable law.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-ink">12. Privacy and Handling of Submitted Information</h2>
            <p className="mt-3">
              Information you submit through this website is handled in line with our{" "}
              <a href="/privacy-policy" className="text-purple-700 hover:text-gold">Privacy Policy</a>.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-ink">13. Changes to These Terms</h2>
            <p className="mt-3">
              We may update these Terms & Conditions from time to time. The &quot;Last updated&quot; date
              at the top of this page reflects the most recent revision.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-ink">14. Contact / Enquiries</h2>
            <p className="mt-3">
              For questions about these terms, contact us at{" "}
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
