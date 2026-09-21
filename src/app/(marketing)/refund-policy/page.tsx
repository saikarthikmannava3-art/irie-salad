import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | irie kitchen",
  robots: { index: false, follow: false },
};

export default function RefundPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm text-muted-foreground mb-2">Last updated: 17 September 2026</p>
      <h1 className="text-4xl font-bold text-forest mb-6">Refund & Cancellation Policy</h1>

      <div className="space-y-2 text-foreground/80 leading-relaxed mb-10">
        <p>
          This policy explains how cancellations and refunds are handled for orders and
          subscriptions purchased through the irie kitchen website.
        </p>
      </div>

      <div className="space-y-10 text-foreground/80 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-forest mb-3">1. Subscription cancellation</h2>
          <p>
            Customers cannot cancel a purchased subscription through the customer website after
            payment has been successfully completed.
          </p>
          <p className="mt-2">
            Subscriptions are fixed-duration plans. Once purchased, the subscription will remain
            active for the duration of the selected plan.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">2. Exceptional cancellations</h2>
          <p>
            In exceptional circumstances, irie kitchen may, at its sole discretion, consider a
            cancellation request.
          </p>
          <p className="mt-2">
            Exceptional cancellation requests must be submitted by contacting irie kitchen
            directly at{" "}
            <a href="mailto:iriesaladbar@gmail.com" className="text-forest hover:underline">
              iriesaladbar@gmail.com
            </a>{" "}
            or{" "}
            <a href="tel:+919657104014" className="text-forest hover:underline">
              +91 9657104014
            </a>
            .
          </p>
          <p className="mt-2">
            Approval of an exceptional cancellation is not guaranteed and will depend on the
            circumstances and the stage of fulfillment.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">3. Pause and skip</h2>
          <p>
            Where supported by the customer&apos;s subscription plan, customers may pause or skip
            deliveries subject to the applicable fulfillment cutoff.
          </p>
          <p className="mt-2">
            Pause and skip are different from cancellation. Using pause or skip will not result in
            a refund for the paused or skipped period unless otherwise stated.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">4. Quality issues</h2>
          <p>
            If you receive a meal that is damaged, spoiled or materially different from what was
            ordered, please contact us within 2 hours of delivery with a photograph and
            description of the issue.
          </p>
          <p className="mt-2">
            irie kitchen will review the complaint and determine the appropriate resolution, which
            may include a replacement meal, credit or refund for the affected item(s).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">5. Delivery failures</h2>
          <p>
            If a delivery cannot be completed due to reasons within irie kitchen&apos;s control
            (for example, a missed delivery by irie kitchen), the affected meal will be credited
            or replaced as determined by irie kitchen.
          </p>
          <p className="mt-2">
            If a delivery cannot be completed due to reasons within the customer&apos;s control
            (for example, incorrect address, customer unavailable, access issues), a refund or
            replacement will not be provided for the affected delivery.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">6. Refund method</h2>
          <p>
            Where a refund is approved, it will be processed to the original payment method used
            for the purchase.
          </p>
          <p className="mt-2">
            Refund processing time depends on the payment provider and may take 5 to 10 business
            days to reflect in the customer&apos;s account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">7. Substitutions</h2>
          <p>
            If a menu item is unavailable, irie kitchen may substitute it with a comparable
            alternative. If the substitution materially changes the order, the customer may
            contact irie kitchen for resolution.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">8. Changes to this policy</h2>
          <p>We may update this Refund & Cancellation Policy from time to time.</p>
          <p className="mt-2">
            The updated version will be published on this page with a revised &quot;Last
            updated&quot; date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">9. Contact</h2>
          <p>For refund or cancellation queries, please contact:</p>
          <div className="mt-3">
            <p className="font-medium text-foreground">irie kitchen</p>
            <p>Hyderabad, Telangana, India</p>
            <p>
              Email:{" "}
              <a href="mailto:iriesaladbar@gmail.com" className="text-forest hover:underline">
                iriesaladbar@gmail.com
              </a>
            </p>
            <p>
              Phone/WhatsApp:{" "}
              <a href="tel:+919657104014" className="text-forest hover:underline">
                +91 9657104014
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
