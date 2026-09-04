import type { Metadata } from "next";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { CustomerSidebar } from "@/components/layout/customer-sidebar";

export const metadata: Metadata = {
  title: "My Account | IRIE Kitchen",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MarketingHeader />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          <CustomerSidebar />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </>
  );
}
