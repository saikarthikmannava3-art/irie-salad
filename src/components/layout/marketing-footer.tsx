import Link from "next/link";
import { BRAND } from "@/lib/constants";

export function MarketingFooter() {
  return (
    <footer className="border-t border-forest-dark bg-forest-dark text-white">
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
              <li><Link href="/menu" className="text-sm text-white/70 hover:text-white">Our Menu</Link></li>
              <li><Link href="/plans" className="text-sm text-white/70 hover:text-white">Subscriptions</Link></li>
              <li><Link href="/how-it-works" className="text-sm text-white/70 hover:text-white">How It Works</Link></li>
              <li><Link href="/food-standard" className="text-sm text-white/70 hover:text-white">Our Food Standard</Link></li>
              <li><Link href="/about" className="text-sm text-white/70 hover:text-white">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50">Support</h4>
            <ul className="mt-3 space-y-2">
              <li><Link href="/dashboard" className="text-sm text-white/70 hover:text-white">My Account</Link></li>
              <li><Link href="/contact" className="text-sm text-white/70 hover:text-white">Contact Us</Link></li>
              <li><Link href="/faq" className="text-sm text-white/70 hover:text-white">FAQ</Link></li>
              <li><a href="mailto:iriesaladbar@gmail.com" className="text-sm text-white/70 hover:text-white">iriesaladbar@gmail.com</a></li>
              <li><a href="tel:+919657104014" className="text-sm text-white/70 hover:text-white">+91 9657104014</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50">Legal</h4>
            <ul className="mt-3 space-y-2">
              <li><Link href="/terms" className="text-sm text-white/70 hover:text-white">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="text-sm text-white/70 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/refund-policy" className="text-sm text-white/70 hover:text-white">Refund & Cancellation</Link></li>
              <li><Link href="/delivery-policy" className="text-sm text-white/70 hover:text-white">Delivery Policy</Link></li>
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
