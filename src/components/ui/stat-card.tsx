import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: { value: number; label: string };
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({ title, value, subtitle, trend, icon, className }: StatCardProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-white p-6 shadow-sm", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-1 text-3xl font-bold text-foreground">{value}</p>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
          {trend && (
            <p
              className={cn(
                "mt-1 text-sm font-medium",
                trend.value >= 0 ? "text-success" : "text-danger"
              )}
            >
              {trend.value >= 0 ? "+" : ""}
              {trend.value}% {trend.label}
            </p>
          )}
        </div>
        {icon && (
          <div className="rounded-lg bg-forest/10 p-3 text-forest">{icon}</div>
        )}
      </div>
    </div>
  );
}
