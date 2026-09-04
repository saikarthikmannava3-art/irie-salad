"use client";

import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { Pause, Play } from "lucide-react";

export default function SubscriptionPage() {
  const [paused, setPaused] = useState(false);
  const [skipDates, setSkipDates] = useState<string[]>([]);

  const upcomingDates = Array.from({ length: 9 }, (_, i) => {
    const d = new Date("2026-08-12");
    d.setDate(d.getDate() + i);
    return d.toISOString().slice(0, 10);
  });

  function toggleSkip(date: string) {
    setSkipDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Subscription</h1>
        <p className="text-muted-foreground">Manage your plan, skip days, or pause</p>
      </div>

      {/* Plan Details */}
      <Card>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>12-Day Plan</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Aug 10 - Aug 25, 2026</p>
          </div>
          <StatusBadge status={paused ? "paused" : "active"} />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="rounded-lg bg-muted p-3">
            <p className="text-xs text-muted-foreground">Delivered</p>
            <p className="text-xl font-bold text-foreground">3</p>
          </div>
          <div className="rounded-lg bg-muted p-3">
            <p className="text-xs text-muted-foreground">Remaining</p>
            <p className="text-xl font-bold text-forest">9</p>
          </div>
          <div className="rounded-lg bg-muted p-3">
            <p className="text-xs text-muted-foreground">Skipped</p>
            <p className="text-xl font-bold text-mustard">{skipDates.length}</p>
          </div>
        </div>
      </Card>

      {/* Pause/Resume */}
      <Card>
        <CardTitle className="mb-3">Pause Subscription</CardTitle>
        <p className="text-sm text-muted-foreground mb-4">
          Pausing freezes all upcoming deliveries. Your remaining meals are preserved.
        </p>
        <Button
          variant={paused ? "primary" : "outline"}
          onClick={() => setPaused(!paused)}
        >
          {paused ? <><Play size={16} /> Resume Subscription</> : <><Pause size={16} /> Pause Subscription</>}
        </Button>
      </Card>

      {/* Skip Days */}
      <Card>
        <CardTitle className="mb-1">Skip Individual Days</CardTitle>
        <p className="text-sm text-muted-foreground mb-4">
          Tap to skip/unskip. Skipped days are added back to your plan. Skip before the cutoff: 6 PM (previous day) for morning delivery, or 10 AM (same day) for evening delivery.
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {upcomingDates.map((date) => {
            const d = new Date(date);
            const isSkipped = skipDates.includes(date);
            return (
              <button
                key={date}
                onClick={() => toggleSkip(date)}
                className={`rounded-lg border-2 p-3 text-center transition-all ${
                  isSkipped
                    ? "border-danger bg-danger/5 text-danger"
                    : "border-border hover:border-sage"
                }`}
              >
                <p className="text-xs text-muted-foreground">
                  {d.toLocaleDateString("en-IN", { weekday: "short" })}
                </p>
                <p className="text-lg font-bold">{d.getDate()}</p>
                <p className="text-xs">{isSkipped ? "Skipped" : d.toLocaleDateString("en-IN", { month: "short" })}</p>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Support Note */}
      <Card className="border-border">
        <CardTitle className="mb-2">Need to Cancel?</CardTitle>
        <p className="text-sm text-muted-foreground">
          To cancel your subscription, please contact support. We're here to help with any questions or concerns.
        </p>
      </Card>
    </div>
  );
}
