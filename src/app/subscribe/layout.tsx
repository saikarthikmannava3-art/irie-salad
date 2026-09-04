import type { Metadata } from "next";
import { MarketingHeader } from "@/components/layout/marketing-header";

export const metadata: Metadata = {
  title: "Subscribe | IRIE Kitchen",
  robots: { index: false, follow: false },
};

export default function SubscribeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MarketingHeader />
      <main className="flex-1 bg-cream/30">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
      </main>
    </>
  );
}
