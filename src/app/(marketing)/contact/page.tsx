import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | irie kitchen",
  description:
    "Get in touch with irie kitchen. Reach us by email, phone or WhatsApp for orders, delivery queries, feedback and support.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-forest mb-4">Contact Us</h1>
      <p className="text-foreground/80 leading-relaxed mb-10">
        Have a question, feedback or need help with your order? We&apos;d love to hear from you.
        Reach out to us through any of the channels below.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        <a
          href="mailto:iriesaladbar@gmail.com"
          className="flex items-start gap-4 rounded-xl border border-border bg-white p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest/10 text-forest">
            <Mail size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Email</h2>
            <p className="mt-1 text-sm text-forest">iriesaladbar@gmail.com</p>
            <p className="mt-1 text-xs text-muted-foreground">We respond within 24 hours</p>
          </div>
        </a>

        <a
          href="https://wa.me/919657104014"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-4 rounded-xl border border-border bg-white p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest/10 text-forest">
            <Phone size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Phone / WhatsApp</h2>
            <p className="mt-1 text-sm text-forest">+91 9657104014</p>
            <p className="mt-1 text-xs text-muted-foreground">Call or message us on WhatsApp</p>
          </div>
        </a>

        <div className="flex items-start gap-4 rounded-xl border border-border bg-white p-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest/10 text-forest">
            <MapPin size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Location</h2>
            <p className="mt-1 text-sm text-muted-foreground">Hyderabad, Telangana, India</p>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-xl border border-border bg-white p-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest/10 text-forest">
            <Clock size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Support Hours</h2>
            <p className="mt-1 text-sm text-muted-foreground">Monday to Saturday, 9 AM to 6 PM IST</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-cream p-8">
        <h2 className="text-xl font-bold text-forest mb-4">Common queries</h2>
        <div className="space-y-4 text-foreground/80 text-sm leading-relaxed">
          <div>
            <p className="font-medium text-foreground">Order or delivery issues</p>
            <p>
              If you have a problem with your delivery (missing, damaged or incorrect items),
              please contact us within 2 hours of delivery with a photo and description.
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground">Subscription queries</p>
            <p>
              For questions about your plan, pausing, skipping or any changes, reach out via email
              or WhatsApp.
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground">Allergies or dietary needs</p>
            <p>
              If you have a food allergy or specific dietary requirement, please contact us before
              placing your order so we can advise you.
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground">Feedback</p>
            <p>
              We value your feedback. Let us know what you think about our meals, service or
              anything else. It helps us improve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
