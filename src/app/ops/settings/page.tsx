import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Organization and kitchen configuration</p>
      </div>

      <Card>
        <CardTitle className="mb-4">Organization</CardTitle>
        <div className="space-y-4 max-w-md">
          <Input label="Organization Name" defaultValue="Irie Foods Pvt Ltd" />
          <Input label="Brand Name" defaultValue="irie kitchen" />
          <Input label="Support Email" defaultValue="help@iriekitchen.com" />
          <Input label="Support Phone" defaultValue="+91 98765 43210" />
          <Button size="sm">Save</Button>
        </div>
      </Card>

      <Card>
        <CardTitle className="mb-4">Kitchen</CardTitle>
        <div className="space-y-4 max-w-md">
          <Input label="Kitchen Name" defaultValue="HSR Kitchen" />
          <Input label="Kitchen Code" defaultValue="BLR-HSR-01" />
          <Input label="City" defaultValue="Bangalore" />
          <Input label="Max Daily Capacity" defaultValue="200" type="number" />
          <Input label="Cutoff Time (24h)" defaultValue="18:00" type="time" />
          <Button size="sm">Save</Button>
        </div>
      </Card>

      <Card>
        <CardTitle className="mb-1">Delivery Zones</CardTitle>
        <CardDescription>Configure delivery zones and fees</CardDescription>
        <div className="mt-4 space-y-3">
          {[
            { name: "HSR 3km", fee: "Free", active: true },
            { name: "Koramangala 5km", fee: "Free", active: true },
          ].map((zone) => (
            <div key={zone.name} className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="font-medium">{zone.name}</p>
                <p className="text-sm text-muted-foreground">Delivery: {zone.fee}</p>
              </div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
