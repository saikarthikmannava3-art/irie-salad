"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS, BRAND } from "@/lib/constants";

const MENU_SUBNAV = [
  { label: "Breakfast", href: "/menu?tab=breakfast" },
  { label: "Lunch", href: "/menu?tab=lunch" },
  { label: "Snacks", href: "/menu?tab=snacks" },
  { label: "Dinner", href: "/menu?tab=dinner" },
  { label: "Fresh & Wellness", href: "/menu?tab=fresh-wellness" },
];

export function MarketingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMenuDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-cream-light/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest text-white font-bold text-lg">
            I
          </div>
          <span className="text-xl font-bold text-forest">{BRAND.name}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.marketing.map((item) =>
            item.label === "Menu" ? (
              <div key={item.href} className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center gap-1 text-sm font-medium text-foreground/70 hover:text-forest transition-colors"
                  onClick={() => setMenuDropdownOpen(!menuDropdownOpen)}
                  onMouseEnter={() => setMenuDropdownOpen(true)}
                >
                  {item.label}
                  <ChevronDown size={14} className={`transition-transform ${menuDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {menuDropdownOpen && (
                  <div
                    className="absolute left-0 top-full mt-2 w-48 rounded-lg border border-border bg-cream-light py-2 shadow-lg"
                    onMouseLeave={() => setMenuDropdownOpen(false)}
                  >
                    <Link
                      href="/menu"
                      className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-cream hover:text-forest transition-colors"
                      onClick={() => setMenuDropdownOpen(false)}
                    >
                      View All
                    </Link>
                    <div className="my-1 border-t border-border" />
                    {MENU_SUBNAV.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block px-4 py-2 text-sm text-foreground/70 hover:bg-cream hover:text-forest transition-colors"
                        onClick={() => setMenuDropdownOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground/70 hover:text-forest transition-colors"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link href="/subscribe">
            <Button size="sm">Start Your Plan</Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-cream-light px-4 py-4 space-y-1">
          {NAV_ITEMS.marketing.map((item) =>
            item.label === "Menu" ? (
              <div key={item.href}>
                <Link
                  href="/menu"
                  className="block text-sm font-medium text-foreground/70 py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Menu
                </Link>
                <div className="pl-4 space-y-1">
                  {MENU_SUBNAV.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block text-xs text-muted-foreground py-1.5"
                      onClick={() => setMobileOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="block text-sm font-medium text-foreground/70 py-2"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ),
          )}
          <div className="flex gap-3 pt-3">
            <Link href="/login" className="flex-1">
              <Button variant="outline" size="sm" className="w-full">Log in</Button>
            </Link>
            <Link href="/subscribe" className="flex-1">
              <Button size="sm" className="w-full">Start Your Plan</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
