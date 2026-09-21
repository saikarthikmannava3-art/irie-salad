import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | irie kitchen",
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm text-muted-foreground mb-2">Last updated: 17 September 2026</p>
      <h1 className="text-4xl font-bold text-forest mb-6">Terms & Conditions</h1>

      <div className="space-y-2 text-foreground/80 leading-relaxed mb-10">
        <p>Welcome to irie kitchen.</p>
        <p>
          These Terms & Conditions govern your access to and use of the irie kitchen website,
          purchase of meals, subscriptions and related services.
        </p>
        <p>By using our website or placing an order, you agree to these Terms & Conditions.</p>
      </div>

      <div className="space-y-10 text-foreground/80 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-forest mb-3">1. About irie kitchen</h2>
          <p>
            irie kitchen is a vegetarian food service providing freshly prepared meals and related
            food products for delivery within its available service areas in Hyderabad, Telangana.
          </p>
          <p className="mt-2">
            Our meals may include breakfast, lunch, evening snacks and dinner, depending on the
            menu available for the relevant date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">2. Eligibility</h2>
          <p>You must provide accurate information when creating an account or placing an order.</p>
          <p className="mt-2">
            You are responsible for keeping your account information and login credentials secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">3. Menu and availability</h2>
          <p>Our menu changes regularly.</p>
          <p className="mt-2">
            Meal availability, recipes, ingredients and portions may vary based on the daily menu,
            ingredient availability and operational requirements.
          </p>
          <p className="mt-2">
            We reserve the right to make reasonable substitutions or changes when an ingredient is
            unavailable or when required for food safety or operational reasons.
          </p>
          <p className="mt-2">
            Where a material change affects a paid order, irie kitchen will determine the
            appropriate resolution in accordance with its Refund & Cancellation Policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">4. Pricing</h2>
          <p>All prices displayed on the website are in Indian Rupees (&#8377;).</p>
          <p className="mt-2">
            Applicable taxes and charges, if any, will be displayed before payment.
          </p>
          <p className="mt-2">
            Prices may change from time to time. A price change will not affect an order that has
            already been successfully purchased unless otherwise communicated.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">5. Subscriptions</h2>
          <p>irie kitchen offers fixed-duration meal plans.</p>
          <p className="mt-2">A subscription is activated after successful payment and confirmation.</p>
          <p className="mt-2">
            The subscription covers the number of meals/deliveries specified in the selected plan.
          </p>
          <p className="mt-2">Subscriptions do not automatically renew.</p>
          <p className="mt-2">
            When the purchased subscription period ends, the customer may purchase a new
            subscription if they wish to continue using the service.
          </p>
          <p className="mt-2">
            No automatic payment will be taken for a new subscription after the current
            subscription ends.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">6. Meal customization</h2>
          <p>
            Where customization is available, customers may select or modify meals according to
            the options provided on the website.
          </p>
          <p className="mt-2">Customization is subject to the applicable fulfillment cutoff.</p>
          <p className="mt-2">
            For morning delivery: Breakfast and Lunch customization closes at 6 PM on the previous day.
          </p>
          <p className="mt-2">
            For evening delivery: Evening Snack and Dinner customization closes at 10 AM on the same day.
          </p>
          <p className="mt-2">
            After the relevant cutoff, changes may no longer be possible because the order may
            already have entered production and fulfillment.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">7. Pause and skip</h2>
          <p>
            Where supported by the customer&apos;s subscription, pause and skip options are subject
            to the applicable cutoff and availability.
          </p>
          <p className="mt-2">Pause and skip are different from cancellation.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">8. Cancellation</h2>
          <p>
            Customers cannot cancel a purchased subscription through the customer website after
            payment has been successfully completed.
          </p>
          <p className="mt-2">
            Any exceptional cancellation or refund is subject to the Refund & Cancellation Policy
            and may require approval by irie kitchen.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">9. Delivery</h2>
          <p>
            Delivery is currently available only within the service areas covered by irie kitchen
            in Hyderabad.
          </p>
          <p className="mt-2">
            Delivery times are estimated windows and may occasionally be affected by traffic,
            weather, operational issues or other circumstances outside our reasonable control.
          </p>
          <p className="mt-2">
            Please refer to our Delivery & Shipping Policy for more information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">10. Food storage and consumption</h2>
          <p>
            Customers are responsible for following the storage and reheating instructions
            provided with their meals.
          </p>
          <p className="mt-2">
            Food should be stored and consumed according to the instructions provided by
            irie kitchen.
          </p>
          <p className="mt-2">
            Customers should not consume food that has been improperly stored or handled after
            delivery.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">
            11. Allergies and dietary requirements
          </h2>
          <p>
            Customers are responsible for reviewing ingredient and allergen information before
            ordering.
          </p>
          <p className="mt-2">
            If you have a food allergy or specific dietary requirement, please contact us before
            placing your order.
          </p>
          <p className="mt-2">
            While we take reasonable precautions, we cannot guarantee that meals are completely
            free from traces of all allergens.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">12. Payments</h2>
          <p>Payments are processed through our authorized payment gateway provider.</p>
          <p className="mt-2">
            Once payment is successfully received and verified, the order/subscription will be
            confirmed.
          </p>
          <p className="mt-2">
            A payment attempt that fails, remains pending or is not successfully verified will
            not be treated as a completed purchase.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">13. Intellectual property</h2>
          <p>
            All website content, branding, text, graphics, photographs, logos, designs and other
            materials belonging to irie kitchen are protected by applicable intellectual property
            laws.
          </p>
          <p className="mt-2">
            You may not reproduce, modify, distribute or commercially use our content without
            written permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">14. Website availability</h2>
          <p>
            We aim to keep the website available and functional, but we do not guarantee
            uninterrupted access.
          </p>
          <p className="mt-2">
            We may temporarily suspend access for maintenance, security, updates or other
            operational reasons.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">15. Changes to these Terms</h2>
          <p>We may update these Terms & Conditions from time to time.</p>
          <p className="mt-2">
            The updated version will be published on this page with a revised &quot;Last
            updated&quot; date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">16. Governing law</h2>
          <p>These Terms & Conditions are governed by the laws of India.</p>
          <p className="mt-2">
            Any dispute will be subject to the jurisdiction of the appropriate courts having
            jurisdiction over Hyderabad, Telangana, subject to applicable law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">17. Contact</h2>
          <p>For questions regarding these Terms, please contact:</p>
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
