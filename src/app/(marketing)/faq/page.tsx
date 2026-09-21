import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | irie kitchen",
  description:
    "Find answers to common questions about irie kitchen meal subscriptions, delivery, menu, customization, payments and more.",
};

const FAQS = [
  {
    question: "What is irie kitchen?",
    answer:
      "irie kitchen is a vegetarian food service that delivers freshly prepared Indian meals to your doorstep. We offer breakfast, lunch, evening snacks and dinner through daily and weekly subscription plans.",
  },
  {
    question: "Where does irie kitchen deliver?",
    answer:
      "We currently deliver within selected service areas in Hyderabad, Telangana. You can check if your area is serviceable during the subscription sign-up process.",
  },
  {
    question: "What types of meals do you offer?",
    answer:
      "Our menu includes a variety of vegetarian Indian meals. The menu changes regularly and may include options for breakfast, lunch, evening snacks and dinner, depending on the day.",
  },
  {
    question: "How does the subscription work?",
    answer:
      "You select a meal plan, choose your preferences and complete payment. Once confirmed, your subscription is active and meals are delivered according to your plan. Subscriptions are fixed-duration and do not auto-renew.",
  },
  {
    question: "Can I customize my meals?",
    answer:
      "Yes, where customization is available, you can select or modify your meals through your dashboard. Customization for morning delivery closes at 6 PM the previous day. For evening delivery, it closes at 10 AM the same day.",
  },
  {
    question: "What is the fulfillment cutoff?",
    answer:
      "The cutoff is the deadline by which you need to finalize your meal selection. For morning delivery (breakfast and lunch), the cutoff is 6 PM the previous day. For evening delivery (snacks and dinner), the cutoff is 10 AM the same day.",
  },
  {
    question: "Can I pause or skip a delivery?",
    answer:
      "Where supported by your subscription plan, you can pause or skip deliveries through your dashboard, subject to the applicable cutoff time. Pause and skip are different from cancellation.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Subscriptions cannot be cancelled through the website after payment has been completed. For exceptional cases, please contact us directly. See our Refund & Cancellation Policy for more details.",
  },
  {
    question: "What if there is a problem with my delivery?",
    answer:
      "If you receive a meal that is damaged, spoiled or incorrect, please contact us within 2 hours of delivery with a photo and description. We will review and determine the appropriate resolution.",
  },
  {
    question: "Is delivery free?",
    answer:
      "Delivery charges, if applicable, will be displayed during the order or subscription process before payment. Some plans may include free delivery.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Payments are processed through our authorized payment gateway. Supported methods will be displayed at checkout.",
  },
  {
    question: "Do you cater to allergies?",
    answer:
      "While we take reasonable precautions, we cannot guarantee that meals are completely free from traces of all allergens. If you have a food allergy or specific dietary requirement, please contact us before placing your order.",
  },
  {
    question: "How do I contact irie kitchen?",
    answer:
      "You can reach us by email at iriesaladbar@gmail.com or by phone/WhatsApp at +91 9657104014. We respond within 24 hours.",
  },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-forest mb-4">Frequently Asked Questions</h1>
      <p className="text-foreground/80 leading-relaxed mb-10">
        Find answers to common questions about irie kitchen. If you don&apos;t find what
        you&apos;re looking for, feel free to{" "}
        <a href="/contact" className="text-forest hover:underline font-medium">
          contact us
        </a>
        .
      </p>

      <div className="space-y-6">
        {FAQS.map((faq) => (
          <div key={faq.question} className="rounded-lg border border-border bg-white p-5">
            <h2 className="font-semibold text-foreground">{faq.question}</h2>
            <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
