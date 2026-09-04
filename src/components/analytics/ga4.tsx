import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_title: document.title,
              send_page_view: true,
            });
          `,
        }}
      />
    </>
  );
}

// GA4 event helpers for subscription funnel tracking
export function trackSubscriptionFunnel(step: string, data?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", step, { event_category: "subscription_funnel", ...data });
  }
}

export function trackProductView(productName: string, productSlug: string, price: number) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "view_item", {
      currency: "INR",
      value: price,
      items: [{ item_id: productSlug, item_name: productName, price }],
    });
  }
}

export function trackBeginCheckout(value: number, items: { item_id: string; item_name: string; price: number }[]) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "begin_checkout", { currency: "INR", value, items });
  }
}

export function trackPurchase(transactionId: string, value: number, items: { item_id: string; item_name: string; price: number }[]) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "purchase", { transaction_id: transactionId, currency: "INR", value, items });
  }
}
