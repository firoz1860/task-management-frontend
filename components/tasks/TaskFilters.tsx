"use client";

import { useEffect, useState } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import type { TaskFilters, TaskStatus, Priority } from "@/types";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface TaskFiltersProps {
  filters: TaskFilters;
  onChange: (f: Partial<TaskFilters>) => void;
  total: number;
}

const statusOpts: { value: TaskStatus | ""; label: string }[] = [
  { value: "", label: "All Status" },
  { value: "PENDING", label: "Pending" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
];

const priorityOpts: { value: Priority | ""; label: string }[] = [
  { value: "", label: "All Priority" },
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
];

export function TaskFilters({ filters, onChange, total }: TaskFiltersProps) {
  const [searchValue, setSearchValue] = useState(filters.search || "");

  useEffect(() => {
    const timer = setTimeout(
      () => onChange({ search: searchValue, page: 1 }),
      300,
    );
    return () => clearTimeout(timer);
  }, [searchValue]); // eslint-disable-line

  const hasFilters = !!filters.status || !!filters.priority || !!filters.search;
  const clearAll = () => {
    setSearchValue("");
    onChange({ status: "", priority: "", search: "", page: 1 });
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Search + filters row */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search tasks..."
            className="input-field w-full pl-10 pr-9 py-2.5 text-sm"
          />
          {searchValue && (
            <button
              onClick={() => setSearchValue("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-0.5 touch-manipulation"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Selects row */}
        <div className="flex gap-2 sm:gap-3">
          <div className="relative flex-1 sm:flex-none">
            <select
              value={filters.status || ""}
              onChange={(e) =>
                onChange({ status: e.target.value as TaskStatus | "", page: 1 })
              }
              className="input-field w-full sm:w-36 pl-3 pr-8 py-2.5 text-sm appearance-none cursor-pointer [&>option]:bg-slate-100 [&>option]:text-slate-900 dark:[&>option]:bg-slate-800 dark:[&>option]:text-slate-100"
            >
              {statusOpts.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
          </div>

          <div className="relative flex-1 sm:flex-none">
            <select
              value={filters.priority || ""}
              onChange={(e) =>
                onChange({ priority: e.target.value as Priority | "", page: 1 })
              }
              className="input-field w-full sm:w-32 pl-3 pr-8 py-2.5 text-sm appearance-none cursor-pointer [&>option]:bg-slate-100 [&>option]:text-slate-900 dark:[&>option]:bg-slate-800 dark:[&>option]:text-slate-100"
            >
              {priorityOpts.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
          </div>

          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="shrink-0 px-3"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Active chips + count */}
      <div className="flex items-center justify-between gap-2 min-h-[24px]">
        <div className="flex items-center gap-2 flex-wrap">
          {filters.status && (
            <FilterChip
              label={
                statusOpts.find((o) => o.value === filters.status)?.label || ""
              }
              onRemove={() => onChange({ status: "", page: 1 })}
            />
          )}
          {filters.priority && (
            <FilterChip
              label={
                priorityOpts.find((o) => o.value === filters.priority)?.label ||
                ""
              }
              onRemove={() => onChange({ priority: "", page: 1 })}
            />
          )}
          {filters.search && (
            <FilterChip
              label={`"${filters.search}"`}
              onRemove={() => {
                setSearchValue("");
                onChange({ search: "", page: 1 });
              }}
            />
          )}
        </div>
        <span className="text-xs text-slate-500 shrink-0 font-medium">
          {total} {total === 1 ? "task" : "tasks"}
        </span>
      </div>
    </div>
  );
}

function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-blue-900/20 text-blue-300 border border-blue-900/40 rounded-full">
      {label}
      <button
        onClick={onRemove}
        className="hover:text-blue-200 transition-colors touch-manipulation"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}
