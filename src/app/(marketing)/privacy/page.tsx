import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | irie kitchen",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm text-muted-foreground mb-2">Last updated: 17 September 2026</p>
      <h1 className="text-4xl font-bold text-forest mb-6">Privacy Policy</h1>

      <div className="space-y-2 text-foreground/80 leading-relaxed mb-10">
        <p>
          irie kitchen respects your privacy. This Privacy Policy explains how we collect, use,
          store and protect your personal information when you use our website, place an order or
          interact with our services.
        </p>
        <p>
          By using our website or services, you agree to the practices described in this Privacy
          Policy.
        </p>
      </div>

      <div className="space-y-10 text-foreground/80 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-forest mb-3">1. Information we collect</h2>
          <p>We may collect the following types of information:</p>
          <ul className="mt-3 list-disc pl-6 space-y-1">
            <li>
              <strong>Account information:</strong> Name, email address, phone number and password
              when you create an account.
            </li>
            <li>
              <strong>Delivery information:</strong> Address, delivery instructions and location
              details required to deliver your meals.
            </li>
            <li>
              <strong>Order and subscription information:</strong> Meal selections, subscription
              plan details, order history and preferences.
            </li>
            <li>
              <strong>Payment information:</strong> Payment details are processed by our
              authorized payment gateway provider. We do not store your full payment card details
              on our servers.
            </li>
            <li>
              <strong>Communication records:</strong> Messages, support requests or feedback you
              send to us.
            </li>
            <li>
              <strong>Usage data:</strong> Information about how you use our website, including
              pages visited, features used and general browsing activity. This may include IP
              address, browser type, device type and operating system.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">2. How we use your information</h2>
          <p>We use the information we collect to:</p>
          <ul className="mt-3 list-disc pl-6 space-y-1">
            <li>Process and fulfill your orders and subscriptions.</li>
            <li>Deliver meals to your specified address.</li>
            <li>Manage your account and preferences.</li>
            <li>Communicate with you about your orders, deliveries and account.</li>
            <li>Send important service updates (such as menu changes, delivery updates or policy changes).</li>
            <li>Improve our website, products and services.</li>
            <li>Comply with applicable legal obligations.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">3. Sharing your information</h2>
          <p>We do not sell your personal information.</p>
          <p className="mt-2">We may share your information with:</p>
          <ul className="mt-3 list-disc pl-6 space-y-1">
            <li>
              <strong>Delivery personnel:</strong> To fulfill your delivery (limited to the
              information required for delivery, such as name, address and phone number).
            </li>
            <li>
              <strong>Payment gateway providers:</strong> To process your payments securely.
            </li>
            <li>
              <strong>Service providers:</strong> Third-party tools or platforms we use for
              website hosting, analytics, communication or operations, who process data on our
              behalf.
            </li>
            <li>
              <strong>Legal requirements:</strong> If required by law, regulation, legal process
              or government request.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">4. Cookies and tracking</h2>
          <p>
            Our website may use cookies and similar technologies to improve your browsing
            experience, remember your preferences and analyze website usage.
          </p>
          <p className="mt-2">
            You can manage or disable cookies through your browser settings. Disabling cookies may
            affect certain features of the website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">5. Data storage and security</h2>
          <p>
            We take reasonable measures to protect your personal information from unauthorized
            access, loss, misuse or alteration.
          </p>
          <p className="mt-2">
            However, no method of electronic storage or internet transmission is completely
            secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">6. Data retention</h2>
          <p>
            We retain your personal information for as long as your account is active or as needed
            to provide services, comply with legal obligations, resolve disputes and enforce our
            agreements.
          </p>
          <p className="mt-2">
            If you request account deletion, we will delete or anonymize your personal data,
            except where retention is required by law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">7. Your rights</h2>
          <p>Depending on applicable law, you may have the right to:</p>
          <ul className="mt-3 list-disc pl-6 space-y-1">
            <li>Access the personal information we hold about you.</li>
            <li>Request correction of inaccurate information.</li>
            <li>Request deletion of your account and personal data.</li>
            <li>Withdraw consent where processing is based on consent.</li>
          </ul>
          <p className="mt-2">
            To exercise these rights, please contact us at{" "}
            <a href="mailto:iriesaladbar@gmail.com" className="text-forest hover:underline">
              iriesaladbar@gmail.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">8. Third-party links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the
            privacy practices or content of those websites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">9. Children&apos;s privacy</h2>
          <p>
            Our services are not directed at children under 18. We do not knowingly collect
            personal information from children under 18. If we become aware that we have collected
            such information, we will take steps to delete it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">10. Changes to this policy</h2>
          <p>We may update this Privacy Policy from time to time.</p>
          <p className="mt-2">
            The updated version will be published on this page with a revised &quot;Last
            updated&quot; date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">11. Governing law</h2>
          <p>
            This Privacy Policy is governed by the laws of India. Any dispute will be subject to
            the jurisdiction of the appropriate courts having jurisdiction over Hyderabad,
            Telangana, subject to applicable law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-forest mb-3">12. Contact</h2>
          <p>For questions about this Privacy Policy, please contact:</p>
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
