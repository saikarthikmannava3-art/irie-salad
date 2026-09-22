"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BRAND } from "@/lib/constants";

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return !!url && url !== "your-project-url" && url !== "your-supabase-url" && !url.includes("placeholder");
}

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!isSupabaseConfigured()) {
      // Demo mode: redirect to dashboard
      setTimeout(() => {
        window.location.href = "/dashboard";
        setLoading(false);
      }, 1000);
      return;
    }

    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();

      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            phone,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest text-white font-bold text-xl">
            I
          </div>
          <span className="text-2xl font-bold text-forest">{BRAND.name}</span>
        </Link>
      </div>

      <div className="rounded-xl border border-border bg-white p-8 shadow-sm">
        <h1 className="text-xl font-bold text-center text-foreground mb-1">Create your account</h1>
        <p className="text-sm text-center text-muted-foreground mb-6">
          Start your healthy eating journey
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-danger/10 p-3 text-sm text-danger">{error}</div>
        )}

        {success ? (
          <div className="rounded-lg bg-forest/10 p-4 text-center">
            <div className="text-lg font-semibold text-forest mb-2">Check your email</div>
            <p className="text-sm text-muted-foreground">
              We sent a verification link to <span className="font-medium text-foreground">{email}</span>.
              Please check your inbox and click the link to activate your account.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Phone"
              type="tel"
              placeholder="+91 9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Min 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
            <Button type="submit" loading={loading} className="w-full">
              Create Account
            </Button>
          </form>
        )}
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-forest hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
