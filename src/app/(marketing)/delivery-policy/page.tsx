import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delivery & Shipping Policy | irie kitchen",
  robots: { index: false, follow: false },
};

export default function DeliveryPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm text-muted-foreground mb-2">Last updated: 17 September 2026</p>
      <h1 className="text-4xl font-bold text-forest mb-6">Delivery & Shipping Policy</h1>

      <div className="space-y-2 text-foreground/80 leading-relaxed mb-10">
        <p>
          This policy explains how irie kitchen handles meal delivery for orders and subscriptions
          purchased through our website.
        </p>
      </div>

      <div className="space-y-10 text-foreground/80 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-forest mb-3">1. Service area</h2>
          <p>
            Delivery is currently available within selected service areas in Hyderabad, Telangana.
          </p>
          <p className="mt-2">
            You can check if your area is serviceable during the subscription sign-up process.
          </p>
          <p className="mt-2">
            Service areas may be expanded or modified from time to time. Updates will be reflected
            on the website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">2. Delivery schedule</h2>
          <p>Meals are delivered fresh according to the following schedule:</p>
          <ul className="mt-3 list-disc pl-6 space-y-1">
            <li>
              <strong>Morning delivery:</strong> Breakfast and Lunch are delivered in the morning
              window.
            </li>
            <li>
              <strong>Evening delivery:</strong> Evening Snack and Dinner are delivered in the
              evening window.
            </li>
          </ul>
          <p className="mt-2">
            Specific delivery windows may vary based on your location within the service area.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">3. Fulfillment cutoff</h2>
          <p>Orders and customizations are subject to a fulfillment cutoff:</p>
          <ul className="mt-3 list-disc pl-6 space-y-1">
            <li>
              <strong>Morning delivery:</strong> Customization and changes close at 6 PM on the
              previous day.
            </li>
            <li>
              <strong>Evening delivery:</strong> Customization and changes close at 10 AM on the
              same day.
            </li>
          </ul>
          <p className="mt-2">
            After the relevant cutoff, changes may no longer be possible because the order may
            already have entered production.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">4. Delivery charges</h2>
          <p>
            Delivery charges, if applicable, will be displayed during the subscription or order
            process before payment.
          </p>
          <p className="mt-2">
            irie kitchen may offer free delivery as part of certain subscription plans or
            promotions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">5. Delivery address</h2>
          <p>
            Customers are responsible for providing a correct and complete delivery address.
          </p>
          <p className="mt-2">
            If a delivery fails because the address is incorrect, incomplete or inaccessible, a
            replacement or refund will not be provided for the affected delivery.
          </p>
          <p className="mt-2">
            Address changes should be made before the applicable fulfillment cutoff.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">6. Delivery timing</h2>
          <p>
            Delivery times are estimated windows. While we aim to deliver within the scheduled
            window, delivery may occasionally be affected by traffic, weather, operational issues
            or other circumstances outside our reasonable control.
          </p>
          <p className="mt-2">
            irie kitchen will make reasonable efforts to notify the customer in case of
            significant delays.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">7. Receiving the delivery</h2>
          <p>
            Customers or an authorized person at the delivery address should be available to
            receive the delivery.
          </p>
          <p className="mt-2">
            If the delivery person is unable to hand over the order due to the customer being
            unavailable, the delivery person may leave the order at the door or a safe location as
            per any standing instructions. irie kitchen will not be responsible for the order
            after it has been delivered or left at the specified location.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">8. Food safety during delivery</h2>
          <p>
            Meals are packed in food-safe packaging designed to maintain appropriate temperature
            and hygiene during transit.
          </p>
          <p className="mt-2">
            Once the meal has been delivered, the customer is responsible for proper storage and
            consumption in accordance with any instructions provided.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">9. Delivery issues</h2>
          <p>
            If you experience a delivery issue (such as a missing delivery, damaged packaging or
            incorrect items), please contact us as soon as possible at{" "}
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
            Please refer to our Refund & Cancellation Policy for how delivery-related issues are
            resolved.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">10. Contact</h2>
          <p>For delivery queries, please contact:</p>
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
