"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LogOut,
  User,
  ChevronDown,
  Zap,
  Bell,
  Menu,
  X,
  CheckSquare,
  Moon,
  Sun,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getInitials } from "@/lib/utils";
import { toast } from "sonner";
import { NotificationsPanel } from "@/components/ui/NotificationsPanel";

export function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const shouldBeDark = savedTheme === "dark";

    setIsDark(shouldBeDark);

    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }

    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Signed out successfully");
      router.push("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  const handleThemeToggle = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
      toast.success("Dark mode enabled");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      toast.success("Light mode enabled");
    }
  };

  const handleProfileClick = () => {
    setMenuOpen(false);
    router.push("/profile");
  };

  return (
    <>
      <header className="sticky top-0 z-40">
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-blue-700/30 dark:border-slate-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4 transition-all duration-300">
            {/* Logo */}
            <Link
              href="/tasks"
              className="flex items-center gap-2.5 group shrink-0"
            >
              <div className="relative w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shadow-warm group-hover:shadow-glow transition-all duration-300">
                <Zap className="w-4 h-4 text-white fill-white" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border-2 border-blue-900 dark:border-slate-900 animate-pulse-soft" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-base sm:text-lg tracking-tight text-white">
                  TaskFlow
                </span>
                <span className="text-[10px] text-blue-200 dark:text-slate-600 font-medium tracking-widest uppercase hidden sm:block">
                  Workspace
                </span>
              </div>
            </Link>

            {/* Desktop right */}
            <div className="hidden sm:flex items-center gap-2">
              {/* Theme toggle */}
              <button
                onClick={handleThemeToggle}
                className="p-2 rounded-lg text-white dark:text-slate-400 hover:text-blue-100 dark:hover:text-slate-200 hover:bg-blue-700 dark:hover:bg-slate-800/60 transition-all duration-200"
                title="Toggle theme"
              >
                {isDark ? (
                  <Sun style={{ width: 18, height: 18 }} />
                ) : (
                  <Moon style={{ width: 18, height: 18 }} />
                )}
              </button>
              {/* Notification bell */}
              <NotificationsPanel />
              <div className="w-px h-6 bg-blue-700/40 dark:bg-slate-700 mx-1" />

              {/* User dropdown */}
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex items-center gap-2.5 pl-1 pr-3 py-1.5 rounded-xl hover:bg-blue-700 dark:hover:bg-slate-800/60 transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-white">
                      {user ? getInitials(user.name) : "U"}
                    </span>
                  </div>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-sm font-medium text-white">
                      {user?.name}
                    </span>
                    <span className="text-xs text-blue-200 dark:text-slate-500 truncate max-w-[120px]">
                      {user?.email}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-white dark:text-slate-500 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {menuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-lg dark:shadow-card z-20 overflow-hidden animate-scale-in">
                      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700/50">
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-200 truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-500 truncate">
                          {user?.email}
                        </p>
                      </div>
                      <div className="p-1.5">
                        <button
                          onClick={handleProfileClick}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/40 rounded-lg transition-all"
                        >
                          <User className="w-4 h-4" />
                          Profile
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-all"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Mobile: avatar + hamburger */}
            <div className="flex sm:hidden items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {user ? getInitials(user.name) : "U"}
                </span>
              </div>
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="p-2 rounded-xl text-white dark:text-slate-400 hover:text-blue-100 dark:hover:text-slate-200 hover:bg-blue-700 dark:hover:bg-slate-800/60 transition-all"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm sm:hidden animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed top-14 right-0 left-0 z-30 sm:hidden animate-fade-up">
            <div className="glass border-b border-slate-800/80 px-4 py-4 flex flex-col gap-2">
              {/* User info */}
              <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-slate-800/40 border border-slate-700/40 mb-1">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-900/40 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-blue-300">
                    {user ? getInitials(user.name) : "U"}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200">
                    {user?.name}
                  </p>
                  <p className="text-xs text-slate-500">{user?.email}</p>
                </div>
              </div>

              <button
                onClick={handleProfileClick}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all text-sm"
              >
                <User className="w-4 h-4" />
                Profile
              </button>
              <div className="h-px bg-slate-800 my-1" />
              <button
                onClick={handleThemeToggle}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all text-sm w-full"
              >
                {isDark ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
                {isDark ? "Light" : "Dark"} Mode
              </button>
              <div className="h-px bg-slate-800 my-1" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all text-sm"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
