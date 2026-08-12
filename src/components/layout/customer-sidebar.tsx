"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Repeat, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { label: "Subscription", href: "/dashboard/subscription", icon: Repeat },
  { label: "Profile", href: "/dashboard/profile", icon: User },
];

export function CustomerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 md:shrink-0">
      <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible p-1">
        {NAV.map((item) => {
          const active = item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap",
                active
                  ? "bg-forest/10 text-forest"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
        <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <LogOut size={18} />
          Sign Out
        </button>
      </nav>
    </aside>
  );
}
