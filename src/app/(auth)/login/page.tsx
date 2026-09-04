"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BRAND } from "@/lib/constants";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Demo login, in production use Supabase auth
    // Redirect based on email pattern
    setTimeout(() => {
      if (email.includes("ops") || email.includes("admin") || email.includes("kitchen")) {
        window.location.href = "/ops";
      } else {
        window.location.href = "/dashboard";
      }
      setLoading(false);
    }, 1000);
  }

  return (
    <div className="space-y-6">
      {/* Logo */}
      <div className="text-center">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest text-white font-bold text-xl">
            I
          </div>
          <span className="text-2xl font-bold text-forest">{BRAND.name}</span>
        </Link>
      </div>

      {/* Card */}
      <div className="rounded-xl border border-border bg-white p-8 shadow-sm">
        <h1 className="text-xl font-bold text-center text-foreground mb-1">Welcome back</h1>
        <p className="text-sm text-center text-muted-foreground mb-6">
          Sign in to your account
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-danger/10 p-3 text-sm text-danger">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" loading={loading} className="w-full">
            Sign In
          </Button>
        </form>

      </div>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium text-forest hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
