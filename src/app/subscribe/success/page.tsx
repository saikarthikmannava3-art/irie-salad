import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, ChefHat } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="text-center py-12">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
        <CheckCircle size={48} className="text-success" />
      </div>

      <h1 className="text-3xl font-bold text-forest mb-2">
        Welcome to irie kitchen!
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Your subscription is active. Get ready for fresh Indian meals!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto mb-8">
        <div className="rounded-xl bg-cream p-5">
          <Calendar size={24} className="text-forest mx-auto mb-2" />
          <p className="font-semibold text-foreground">First Delivery</p>
          <p className="text-sm text-muted-foreground">Tomorrow</p>
        </div>
        <div className="rounded-xl bg-cream p-5">
          <ChefHat size={24} className="text-forest mx-auto mb-2" />
          <p className="font-semibold text-foreground">Customize Daily</p>
          <p className="text-sm text-muted-foreground">Before 6 PM cutoff</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/dashboard">
          <Button size="lg">Go to Dashboard</Button>
        </Link>
        <Link href="/dashboard/subscription">
          <Button variant="outline" size="lg">Manage Subscription</Button>
        </Link>
      </div>
    </div>
  );
}
