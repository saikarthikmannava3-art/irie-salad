import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export default function DispatchPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dispatch & Delivery</h1>
        <p className="text-muted-foreground">Driver routes and delivery tracking</p>
      </div>
      <Card className="py-16 text-center">
        <MapPin size={48} className="mx-auto text-muted-foreground/30 mb-4" />
        <CardTitle className="text-muted-foreground">Coming Soon</CardTitle>
        <CardDescription className="mt-2">
          Printable A4 dispatch sheets grouped by zone. Driver assignment, route optimization via Google Maps,
          delivery confirmation with timestamp and photo proof.
        </CardDescription>
      </Card>
    </div>
  );
}
