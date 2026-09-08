import type { Metadata } from "next";
import { OpsSidebar } from "@/components/layout/ops-sidebar";

export const metadata: Metadata = {
  title: "Operations | irie kitchen",
  robots: { index: false, follow: false },
};

export default function OpsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted">
      <OpsSidebar />
      <main className="lg:pl-64">
        <div className="p-4 pt-18 lg:pt-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
