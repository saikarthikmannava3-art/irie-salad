import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "outline";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-forest/10 text-forest",
  success: "bg-green-100 text-green-800",
  warning: "bg-amber-100 text-amber-800",
  danger: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800",
  outline: "border border-border text-muted-foreground",
};

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

// Order status badge with semantic colors
const STATUS_VARIANTS: Record<string, BadgeVariant> = {
  scheduled: "info",
  locked: "warning",
  in_production: "warning",
  packed: "info",
  dispatched: "info",
  delivered: "success",
  skipped: "outline",
  paused: "outline",
  cancelled: "danger",
  active: "success",
  pending_payment: "warning",
  completed: "success",
  expired: "danger",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const variant = STATUS_VARIANTS[status] || "default";
  const label = status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
}
