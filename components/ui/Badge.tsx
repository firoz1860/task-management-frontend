import React from "react";
import { cn } from "@/lib/utils";
import { TaskStatus, Priority } from "@/types";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "status" | "priority" | "default";
  status?: TaskStatus;
  priority?: Priority;
  className?: string;
  dot?: boolean;
}

const statusClasses: Record<TaskStatus, string> = {
  PENDING: "status-pending",
  IN_PROGRESS: "status-in-progress",
  COMPLETED: "status-completed",
};

const priorityClasses: Record<Priority, string> = {
  LOW: "priority-low",
  MEDIUM: "priority-medium",
  HIGH: "priority-high",
};

const statusLabels: Record<TaskStatus, string> = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

const priorityLabels: Record<Priority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

const dotColors: Record<TaskStatus, string> = {
  PENDING: "bg-blue-900 text-white",
  IN_PROGRESS: "bg-sky-400",
  COMPLETED: "bg-emerald-400",
};

export function Badge({
  children,
  status,
  priority,
  dot,
  className,
}: BadgeProps) {
  const baseClass =
    "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full";
  const variantClass = status
    ? statusClasses[status]
    : priority
      ? priorityClasses[priority]
      : "bg-slate-700 text-slate-300 border border-slate-600";

  return (
    <span className={cn(baseClass, variantClass, className)}>
      {dot && status && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full animate-pulse-soft",
            dotColors[status],
          )}
        />
      )}
      {children}
    </span>
  );
}

export function StatusBadge({
  status,
  dot,
}: {
  status: TaskStatus;
  dot?: boolean;
}) {
  return (
    <Badge status={status} dot={dot}>
      {statusLabels[status]}
    </Badge>
  );
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return <Badge priority={priority}>{priorityLabels[priority]}</Badge>;
}
