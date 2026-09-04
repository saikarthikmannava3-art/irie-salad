import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | IRIE Kitchen",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-forest">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-3 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
          <Link href="/menu">
            <Button variant="outline">View Menu</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
