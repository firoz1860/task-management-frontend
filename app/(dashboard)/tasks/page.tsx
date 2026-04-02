"use client";

import { useState } from "react";
import {
  Plus,
  ClipboardList,
  Clock,
  CheckCircle2,
  Layers,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { TaskCard } from "@/components/tasks/TaskCard";
import { TaskForm } from "@/components/tasks/TaskForm";
import { TaskFilters as TaskFiltersBar } from "@/components/tasks/TaskFilters";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { TaskCardSkeleton, StatCardSkeleton } from "@/components/ui/Skeleton";
import {
  useGetTasks,
  useGetStats,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
  useToggleTask,
} from "@/hooks/useTasks";
import { Task, TaskFilters } from "@/types";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const DEFAULT_FILTERS: TaskFilters = {
  page: 1,
  limit: 9,
  sortBy: "createdAt",
  sortOrder: "desc",
  status: "",
  priority: "",
  search: "",
};

function StatCard({ label, value, icon, accent, bgAccent, trend }: any) {
  return (
    <div className="card p-4 sm:p-5 relative overflow-hidden group cursor-default">
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none",
          bgAccent,
        )}
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-2 mb-3">
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-500 uppercase tracking-wider">
            {label}
          </p>
          <div className={cn("p-2 rounded-lg shrink-0", bgAccent)}>{icon}</div>
        </div>
        <p
          className={cn("text-2xl sm:text-3xl font-bold tabular-nums", accent)}
        >
          {value ?? "—"}
        </p>
        {trend && (
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            <span className="text-xs text-slate-600 dark:text-slate-500">
              {trend}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ hasFilters, onClear, onCreate }: any) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 sm:py-24 gap-5 px-4 text-center">
      <div className="relative">
        <div className="w-20 h-20 rounded-3xl bg-slate-200 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/50 flex items-center justify-center">
          <ClipboardList className="w-9 h-9 text-slate-600 dark:text-slate-500" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-900/20 border border-blue-900/30 rounded-full flex items-center justify-center">
          <Plus className="w-3.5 h-3.5 text-blue-900 dark:text-blue-300" />
        </div>
      </div>
      <div>
        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-300 mb-1.5">
          {hasFilters ? "No tasks match your filters" : "No tasks yet"}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-500 max-w-xs mx-auto">
          {hasFilters
            ? "Try adjusting your filters."
            : "Create your first task and get things done."}
        </p>
      </div>
      {hasFilters ? (
        <Button variant="ghost" size="sm" onClick={onClear}>
          Clear filters
        </Button>
      ) : (
        <Button
          size="sm"
          onClick={onCreate}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Create First Task
        </Button>
      )}
    </div>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  return h < 12 ? "morning" : h < 17 ? "afternoon" : "evening";
}

export default function TasksPage() {
  const { user } = useAuth();
  const [filters, setFilters] = useState<TaskFilters>(DEFAULT_FILTERS);
  const [createOpen, setCreateOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [deleteTask, setDeleteTask] = useState<Task | null>(null);

  const { data, isLoading } = useGetTasks(filters);
  const { data: stats, isLoading: statsLoading } = useGetStats();
  const createMutation = useCreateTask();
  const updateMutation = useUpdateTask();
  const deleteMutation = useDeleteTask();
  const toggleMutation = useToggleTask();

  const update = (p: Partial<TaskFilters>) =>
    setFilters((f) => ({ ...f, ...p }));
  const hasFilters = !!(filters.status || filters.priority || filters.search);

  const handleCreate = async (d: any) => {
    await createMutation.mutateAsync(d);
    setCreateOpen(false);
  };
  const handleEdit = async (d: any) => {
    if (!editTask) return;
    await updateMutation.mutateAsync({ id: editTask.id, ...d });
    setEditTask(null);
  };
  const handleDelete = async () => {
    if (!deleteTask) return;
    await deleteMutation.mutateAsync(deleteTask.id);
    setDeleteTask(null);
  };

  const tasks = data?.tasks || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 1;
  const firstName = user?.name?.split(" ")[0] || "there";
  const completionPct = stats?.total
    ? Math.round((stats.completed / stats.total) * 100)
    : 0;

  return (
    <div className="page-bg min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-6 sm:gap-8">
        {/* Header */}
        <div className="flex flex-row items-end justify-between gap-4 animate-fade-up">
          <div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-500 mb-1 font-medium">
              Good {getGreeting()},{" "}
              <span className="text-blue-900 dark:text-blue-300 font-semibold">
                {firstName}
              </span>{" "}
              👋
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              My Tasks
            </h1>
          </div>
          <Button
            onClick={() => setCreateOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
            size="sm"
          >
            <span className="hidden xs:inline">New Task</span>
            <span className="xs:hidden">New</span>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 stagger-children">
          {statsLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <StatCardSkeleton key={i} />
            ))
          ) : (
            <>
              <StatCard
                label="Total"
                value={stats?.total}
                icon={
                  <Layers className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                }
                accent="text-slate-900 dark:text-slate-200"
                bgAccent="bg-slate-200 dark:bg-slate-700/20"
                trend={`${completionPct}% done`}
              />
              <StatCard
                label="Pending"
                value={stats?.pending}
                icon={
                  <Clock className="w-4 h-4 text-blue-900 dark:text-blue-300" />
                }
                accent="text-blue-900 dark:text-blue-300"
                bgAccent="bg-blue-900/20"
              />
              <StatCard
                label="In Progress"
                value={stats?.inProgress}
                icon={<AlertTriangle className="w-4 h-4 text-sky-400" />}
                accent="text-sky-400"
                bgAccent="bg-sky-500/10"
              />
              <StatCard
                label="Completed"
                value={stats?.completed}
                icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                accent="text-emerald-400"
                bgAccent="bg-emerald-500/10"
              />
            </>
          )}
        </div>

        {/* Progress bar */}
        {!statsLoading && stats && stats.total > 0 && (
          <div className="glass rounded-xl p-4 animate-fade-up">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Overall Progress
              </span>
              <span className="text-xs font-bold text-blue-900 dark:text-blue-300">
                {completionPct}%
              </span>
            </div>
            <div className="h-2 bg-slate-300 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-900 to-emerald-500 rounded-full transition-all duration-700"
                style={{ width: `${completionPct}%` }}
              />
            </div>
            <div className="flex items-center gap-3 sm:gap-4 mt-3 flex-wrap">
              {[
                {
                  dot: "bg-blue-900 dark:bg-blue-300",
                  label: `${stats.pending} pending`,
                },
                { dot: "bg-sky-400", label: `${stats.inProgress} in progress` },
                {
                  dot: "bg-emerald-400",
                  label: `${stats.completed} completed`,
                },
              ].map(({ dot, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <span className={cn("w-2 h-2 rounded-full", dot)} />
                  <span className="text-xs text-slate-500">{label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4 animate-fade-up">
          <TaskFiltersBar filters={filters} onChange={update} total={total} />
        </div>

        {/* Task Grid */}
        <div className="flex flex-col gap-5">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <TaskCardSkeleton key={i} />
              ))}
            </div>
          ) : tasks.length === 0 ? (
            <EmptyState
              hasFilters={hasFilters}
              onClear={() =>
                update({ status: "", priority: "", search: "", page: 1 })
              }
              onCreate={() => setCreateOpen(true)}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 stagger-children">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={setEditTask}
                  onDelete={setDeleteTask}
                  onToggle={(id) => toggleMutation.mutate(id)}
                  isToggling={toggleMutation.isPending}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <Button
                variant="ghost"
                size="sm"
                disabled={filters.page === 1}
                onClick={() => update({ page: filters.page - 1 })}
                leftIcon={<ChevronLeft className="w-4 h-4" />}
              >
                <span className="hidden sm:inline">Prev</span>
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const start = Math.max(
                    1,
                    Math.min(filters.page - 2, totalPages - 4),
                  );
                  const p = start + i;
                  if (p > totalPages) return null;
                  return (
                    <button
                      key={p}
                      onClick={() => update({ page: p })}
                      className={cn(
                        "w-8 h-8 rounded-lg text-sm font-medium transition-all",
                        p === filters.page
                          ? "bg-blue-900 text-white shadow-lg"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200",
                      )}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
              <Button
                variant="ghost"
                size="sm"
                disabled={filters.page === totalPages}
                onClick={() => update({ page: filters.page + 1 })}
                rightIcon={<ChevronRight className="w-4 h-4" />}
              >
                <span className="hidden sm:inline">Next</span>
              </Button>
            </div>
          )}
        </div>
      </main>

      <Modal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create New Task"
        size="md"
      >
        <TaskForm
          onSubmit={handleCreate}
          onCancel={() => setCreateOpen(false)}
          isLoading={createMutation.isPending}
        />
      </Modal>
      <Modal
        isOpen={!!editTask}
        onClose={() => setEditTask(null)}
        title="Edit Task"
        size="md"
      >
        <TaskForm
          task={editTask}
          onSubmit={handleEdit}
          onCancel={() => setEditTask(null)}
          isLoading={updateMutation.isPending}
        />
      </Modal>
      <Modal
        isOpen={!!deleteTask}
        onClose={() => setDeleteTask(null)}
        title="Delete Task"
        size="sm"
      >
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 shrink-0">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Delete{" "}
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                "{deleteTask?.title}"
              </span>
              ? This cannot be undone.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="ghost"
              onClick={() => setDeleteTask(null)}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              isLoading={deleteMutation.isPending}
              fullWidth
            >
              Delete Task
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
