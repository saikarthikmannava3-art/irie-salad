"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, ShoppingBag, ChefHat, Package, UtensilsCrossed,
  Repeat, Truck, PackageCheck, MapPin, Settings, LogOut, Menu, X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/constants";
import { useState } from "react";

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard, ShoppingBag, ChefHat, Package, UtensilsCrossed,
  Repeat, Truck, PackageCheck, MapPin, Settings,
};

const NAV = [
  { label: "Dashboard", href: "/ops", icon: "LayoutDashboard" },
  { label: "Orders", href: "/ops/orders", icon: "ShoppingBag" },
  { label: "Production", href: "/ops/production", icon: "ChefHat" },
  { label: "Inventory", href: "/ops/inventory", icon: "Package" },
  { label: "Menu", href: "/ops/menu", icon: "UtensilsCrossed" },
  { label: "Subscriptions", href: "/ops/subscriptions", icon: "Repeat" },
  { label: "Procurement", href: "/ops/procurement", icon: "Truck" },
  { label: "Packing", href: "/ops/packing", icon: "PackageCheck" },
  { label: "Dispatch", href: "/ops/dispatch", icon: "MapPin" },
  { label: "Settings", href: "/ops/settings", icon: "Settings" },
];

export function OpsSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/ops" ? pathname === "/ops" : pathname.startsWith(href);

  const navContent = (
    <>
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-6 border-b border-forest-light">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-forest font-bold text-sm">
          I
        </div>
        <div>
          <span className="text-sm font-bold text-white">{BRAND.name}</span>
          <p className="text-[10px] text-white/50 uppercase tracking-wider">Operations</p>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {NAV.map((item) => {
          const Icon = ICON_MAP[item.icon];
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-white/15 text-white"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-forest-light p-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-colors">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-forest">
        {navContent}
      </aside>

      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex h-14 items-center gap-3 bg-forest px-4">
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <span className="text-sm font-bold text-white">{BRAND.name} Ops</span>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <>
          <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-forest">
            {navContent}
          </aside>
        </>
      )}
    </>
  );
}
