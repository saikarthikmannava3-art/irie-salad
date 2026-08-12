"use client";

import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Plus, Trash2 } from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Demo User",
    email: "demo@iriesalad.com",
    phone: "+91 98765 43210",
  });

  const [addresses] = useState([
    { id: "1", label: "Home", line1: "123 HSR Layout, Sector 1", city: "Bangalore", pincode: "560102", isDefault: true },
    { id: "2", label: "Work", line1: "456 Koramangala, 5th Block", city: "Bangalore", pincode: "560095", isDefault: false },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground">Manage your account details and addresses</p>
      </div>

      {/* Personal Info */}
      <Card>
        <CardTitle className="mb-4">Personal Information</CardTitle>
        <div className="space-y-4 max-w-md">
          <Input
            label="Full Name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
          <Input
            label="Email"
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <Input
            label="Phone"
            type="tel"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          />
          <Button size="sm">Save Changes</Button>
        </div>
      </Card>

      {/* Addresses */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <CardTitle>Delivery Addresses</CardTitle>
          <Button variant="outline" size="sm">
            <Plus size={14} /> Add Address
          </Button>
        </div>
        <div className="space-y-3">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`flex items-start justify-between rounded-lg border p-4 ${
                addr.isDefault ? "border-forest bg-forest/5" : "border-border"
              }`}
            >
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-forest mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{addr.label}</p>
                    {addr.isDefault && (
                      <span className="text-xs bg-forest/10 text-forest px-1.5 py-0.5 rounded">Default</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{addr.line1}</p>
                  <p className="text-sm text-muted-foreground">{addr.city} - {addr.pincode}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">Edit</Button>
                {!addr.isDefault && (
                  <Button variant="ghost" size="sm" className="text-danger">
                    <Trash2 size={14} />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
