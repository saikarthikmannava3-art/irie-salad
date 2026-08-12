import Link from "next/link";
import { BRAND } from "@/lib/constants";

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-forest text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-forest font-bold text-lg">
                I
              </div>
              <span className="text-xl font-bold">{BRAND.name}</span>
            </div>
            <p className="mt-3 text-sm text-white/70">{BRAND.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50">Menu</h4>
            <ul className="mt-3 space-y-2">
              <li><Link href="/menu" className="text-sm text-white/70 hover:text-white">Our Salads</Link></li>
              <li><Link href="/plans" className="text-sm text-white/70 hover:text-white">Plans & Pricing</Link></li>
              <li><Link href="/about" className="text-sm text-white/70 hover:text-white">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50">Support</h4>
            <ul className="mt-3 space-y-2">
              <li><Link href="/dashboard" className="text-sm text-white/70 hover:text-white">My Account</Link></li>
              <li><span className="text-sm text-white/70">help@iriesalad.com</span></li>
              <li><span className="text-sm text-white/70">+91 98765 43210</span></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50">Legal</h4>
            <ul className="mt-3 space-y-2">
              <li><span className="text-sm text-white/70">Privacy Policy</span></li>
              <li><span className="text-sm text-white/70">Terms of Service</span></li>
              <li><span className="text-sm text-white/70">Refund Policy</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/20 pt-8 text-center text-sm text-white/50">
          &copy; {new Date().getFullYear()} Irie Foods Pvt Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
