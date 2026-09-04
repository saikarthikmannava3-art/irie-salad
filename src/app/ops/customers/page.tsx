"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Users, UserCheck, UserX, Mail, Phone, MapPin, Calendar, ArrowUpDown, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { CUSTOMERS, type Customer } from "@/data/customers";

const PAGE_SIZE = 25;

type SortKey = "name" | "registeredAt" | "signInCount" | "lastSignIn";
type SortDir = "asc" | "desc";

function parseDate(d: string | null): number {
  if (!d) return 0;
  // DD-MM-YYYY HH:MM:SS
  const [date, time] = d.split(" ");
  const [day, month, year] = date.split("-");
  return new Date(`${year}-${month}-${day}T${time || "00:00:00"}`).getTime();
}

export default function CustomersPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState<SortKey>("registeredAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [filter, setFilter] = useState<"all" | "active" | "inactive" | "banned" | "deleted">("all");

  const stats = useMemo(() => {
    const total = CUSTOMERS.length;
    const active = CUSTOMERS.filter((c) => c.signInCount > 1 && !c.isBanned && !c.isDeleted).length;
    const withEmail = CUSTOMERS.filter((c) => c.email).length;
    const banned = CUSTOMERS.filter((c) => c.isBanned).length;
    const deleted = CUSTOMERS.filter((c) => c.isDeleted).length;
    const avgSignIns = Math.round(CUSTOMERS.reduce((sum, c) => sum + c.signInCount, 0) / total);
    return { total, active, withEmail, banned, deleted, avgSignIns };
  }, []);

  const filtered = useMemo(() => {
    let list = CUSTOMERS;

    // Filter
    if (filter === "active") list = list.filter((c) => c.signInCount > 1 && !c.isBanned && !c.isDeleted);
    if (filter === "inactive") list = list.filter((c) => c.signInCount <= 1 && !c.isBanned && !c.isDeleted);
    if (filter === "banned") list = list.filter((c) => c.isBanned);
    if (filter === "deleted") list = list.filter((c) => c.isDeleted);

    // Search
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          (c.name && c.name.toLowerCase().includes(q)) ||
          (c.phone && c.phone.includes(q)) ||
          (c.email && c.email.toLowerCase().includes(q)) ||
          (c.address && c.address.toLowerCase().includes(q)) ||
          c.referralCode.toLowerCase().includes(q)
      );
    }

    // Sort
    list = [...list].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") {
        cmp = (a.name || "").localeCompare(b.name || "");
      } else if (sortKey === "signInCount") {
        cmp = a.signInCount - b.signInCount;
      } else if (sortKey === "registeredAt") {
        cmp = parseDate(a.registeredAt) - parseDate(b.registeredAt);
      } else if (sortKey === "lastSignIn") {
        cmp = parseDate(a.lastSignIn) - parseDate(b.lastSignIn);
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return list;
  }, [search, filter, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
    setPage(0);
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-forest">Customers</h1>
        <p className="text-muted-foreground">All registered customers from the platform</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        <StatCard title="Total Customers" value={stats.total} icon={<Users size={20} />} />
        <StatCard title="Active (2+ logins)" value={stats.active} icon={<UserCheck size={20} />} />
        <StatCard title="With Email" value={stats.withEmail} icon={<Mail size={20} />} />
        <StatCard title="Avg Sign-ins" value={stats.avgSignIns} icon={<ArrowUpDown size={20} />} />
        <StatCard title="Banned" value={stats.banned} icon={<UserX size={20} />} />
        <StatCard title="Marked Deleted" value={stats.deleted} icon={<Trash2 size={20} />} />
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {(["all", "active", "inactive", "banned", "deleted"] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "primary" : "ghost"}
              size="sm"
              onClick={() => { setFilter(f); setPage(0); }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === "all" && ` (${stats.total})`}
            </Button>
          ))}
        </div>
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search name, phone, email, address, referral code..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="w-full rounded-lg border border-border bg-white py-2 pl-9 pr-3 text-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
          />
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-3">
        Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filtered.length)} of {filtered.length} customers
      </p>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium">
                <button onClick={() => toggleSort("name")} className="flex items-center gap-1 hover:text-forest">
                  Customer {sortKey === "name" && (sortDir === "asc" ? "↑" : "↓")}
                </button>
              </th>
              <th className="px-4 py-3 text-left font-medium">Contact</th>
              <th className="px-4 py-3 text-left font-medium hidden lg:table-cell">Address</th>
              <th className="px-4 py-3 text-left font-medium">
                <button onClick={() => toggleSort("registeredAt")} className="flex items-center gap-1 hover:text-forest">
                  Registered {sortKey === "registeredAt" && (sortDir === "asc" ? "↑" : "↓")}
                </button>
              </th>
              <th className="px-4 py-3 text-center font-medium">
                <button onClick={() => toggleSort("signInCount")} className="flex items-center gap-1 hover:text-forest">
                  Logins {sortKey === "signInCount" && (sortDir === "asc" ? "↑" : "↓")}
                </button>
              </th>
              <th className="px-4 py-3 text-left font-medium hidden md:table-cell">
                <button onClick={() => toggleSort("lastSignIn")} className="flex items-center gap-1 hover:text-forest">
                  Last Active {sortKey === "lastSignIn" && (sortDir === "asc" ? "↑" : "↓")}
                </button>
              </th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((c) => (
              <tr key={c.id} onClick={() => router.push(`/ops/customers/${c.id}`)} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer">
                <td className="px-4 py-3">
                  <div className="font-medium text-foreground">{c.name || "—"}</div>
                  <div className="text-xs text-muted-foreground font-mono">{c.referralCode}</div>
                </td>
                <td className="px-4 py-3">
                  {c.phone && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Phone size={11} /> {c.phone}
                    </div>
                  )}
                  {c.email && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <Mail size={11} /> {c.email}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  {c.address ? (
                    <div className="flex items-start gap-1 text-xs text-muted-foreground max-w-xs">
                      <MapPin size={11} className="shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{c.address}</span>
                      {c.addressCount > 1 && (
                        <Badge variant="default" className="text-[9px] shrink-0">+{c.addressCount - 1}</Badge>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar size={11} />
                    {c.registeredAt.split(" ")[0]}
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`text-sm font-semibold ${c.signInCount > 10 ? "text-forest" : c.signInCount > 1 ? "text-foreground" : "text-muted-foreground"}`}>
                    {c.signInCount}
                  </span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="text-xs text-muted-foreground">
                    {c.lastSignIn ? c.lastSignIn.split(" ")[0] : "Never"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    {c.isBanned && <Badge variant="warning" className="text-[10px]">Banned</Badge>}
                    {c.isDeleted && <Badge variant="warning" className="text-[10px]">Deleted</Badge>}
                    {!c.isBanned && !c.isDeleted && c.signInCount > 1 && (
                      <Badge variant="success" className="text-[10px]">Active</Badge>
                    )}
                    {!c.isBanned && !c.isDeleted && c.signInCount <= 1 && (
                      <Badge variant="default" className="text-[10px]">New</Badge>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <Button variant="ghost" size="sm" disabled={page === 0} onClick={() => setPage(page - 1)}>
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page + 1} of {totalPages}
          </span>
          <Button variant="ghost" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>
            Next
          </Button>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          No customers match your search.
        </div>
      )}
    </div>
  );
}
