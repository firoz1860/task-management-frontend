"use client";

import { useState } from "react";
import {
  Calendar,
  MoreVertical,
  Pencil,
  Trash2,
  CheckCircle2,
  Circle,
  Clock,
} from "lucide-react";
import { Task } from "@/types";
import { StatusBadge, PriorityBadge } from "@/components/ui/Badge";
import { cn, formatDate, isOverdue } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onToggle: (taskId: string) => void;
  isToggling?: boolean;
}

const priorityAccent: Record<string, string> = {
  LOW: "from-slate-500/5",
  MEDIUM: "from-terra-500/5",
  HIGH: "from-rose-500/8",
};

const priorityBar: Record<string, string> = {
  LOW: "bg-slate-600",
  MEDIUM: "bg-terra-500",
  HIGH: "bg-rose-500",
};

export function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggle,
  isToggling,
}: TaskCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const overdue = isOverdue(task.dueDate) && task.status !== "COMPLETED";
  const isCompleted = task.status === "COMPLETED";

  return (
    <div
      className={cn(
        "group relative card p-4 sm:p-5 flex flex-col gap-3 overflow-hidden",
        `bg-gradient-to-br ${priorityAccent[task.priority]} to-transparent`,
        isCompleted && "opacity-70",
      )}
    >
      {/* Priority bar */}
      <div
        className={cn(
          "absolute left-0 top-4 bottom-4 w-0.5 rounded-r-full",
          priorityBar[task.priority],
        )}
      />

      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2.5 min-w-0 flex-1">
          {/* Toggle button */}
          <button
            onClick={() => onToggle(task.id)}
            disabled={isToggling}
            className={cn(
              "mt-0.5 shrink-0 transition-all duration-200 touch-manipulation",
              isToggling && "opacity-50 cursor-wait",
              isCompleted
                ? "text-emerald-400"
                : task.status === "IN_PROGRESS"
                  ? "text-sky-400"
                  : "text-slate-600 hover:text-blue-600",
            )}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : task.status === "IN_PROGRESS" ? (
              <Clock className="w-5 h-5" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </button>

          <h3
            className={cn(
              "text-sm font-semibold text-slate-100 leading-snug line-clamp-2",
              isCompleted && "line-through text-slate-400",
            )}
          >
            {task.title}
          </h3>
        </div>

        {/* More menu — always visible on mobile, hover-visible on desktop */}
        <div className="relative shrink-0">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-700/60 transition-all sm:opacity-0 sm:group-hover:opacity-100 touch-manipulation"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-full mt-1 w-40 glass rounded-xl border border-slate-700/50 shadow-card z-20 p-1.5 animate-scale-in">
                <button
                  onClick={() => {
                    onEdit(task);
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-700/40 rounded-lg transition-all"
                >
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => {
                    onDelete(task);
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 pl-8">
          {task.description}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 pl-8 mt-auto pt-1 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <StatusBadge status={task.status} dot />
          <PriorityBadge priority={task.priority} />
        </div>
        {task.dueDate && (
          <div
            className={cn(
              "flex items-center gap-1.5 text-xs shrink-0",
              overdue ? "text-rose-400" : "text-slate-500",
            )}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(task.dueDate)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
