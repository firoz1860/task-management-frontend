"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Edit2, Mail, User, Calendar, LogOut, Check } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/utils";

export default function ProfilePage() {
  const { user, logout, isLoading, updateUser, refreshUser } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading && !user) {
      router.push("/login");
    }
  }, [mounted, isLoading, user, router]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  if (!mounted || isLoading || !user) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 pt-20 flex items-center justify-center transition-colors duration-300">
        <div className="text-slate-600 dark:text-slate-400">Loading...</div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    try {
      setIsSaving(true);
      const response = await api.put("/auth/profile", {
        name: formData.name,
      });

      // Update user in context - response.data contains { success, message, data: { user } }
      if (response.data?.data?.user) {
        updateUser(response.data.data.user);
        // Also update form data immediately
        setFormData((prev) => ({
          ...prev,
          name: response.data.data.user.name,
        }));
        // Refresh user from server to ensure all data is synced
        await refreshUser();
      }

      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Signed out successfully");
      router.push("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recently";

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-20 pb-12 transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Back Button */}
        <Link
          href="/tasks"
          className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 mb-8 transition-colors duration-200"
        >
          ← Back to Tasks
        </Link>

        {/* Profile Card */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-700/50 overflow-hidden shadow-xl dark:shadow-2xl bg-white dark:bg-slate-900/50 backdrop-blur-sm transition-all duration-300">
          {/* Header Gradient */}
          <div className="h-32 bg-gradient-to-r from-blue-600/30 via-blue-500/20 to-transparent dark:from-blue-600/10 dark:via-blue-500/10 dark:to-transparent transition-all duration-300" />

          {/* Content */}
          <div className="px-6 sm:px-8 pb-8">
            {/* Avatar & Title */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:gap-6 -mt-16 mb-8">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600/20 to-blue-500/20 dark:from-blue-600/10 dark:to-blue-500/10 border-4 border-white dark:border-slate-900 flex items-center justify-center shrink-0 shadow-lg transition-all duration-300">
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-300">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="mt-4 sm:mt-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 transition-colors duration-300">
                  {user.name}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-sm transition-colors duration-300">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Profile Info Grid */}
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2 transition-colors duration-300">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all duration-300"
                  />
                ) : (
                  <div className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-slate-900 dark:text-slate-100 transition-all duration-300">
                    {formData.name}
                  </div>
                )}
              </div>

              {/* Email Field (Read-only) */}
              <div>
                <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2 transition-colors duration-300">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <div className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-slate-900 dark:text-slate-100 transition-all duration-300">
                  {formData.email}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 transition-colors duration-300">
                  Email cannot be changed
                </p>
              </div>

              {/* Member Since */}
              <div>
                <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2 transition-colors duration-300">
                  <Calendar className="w-4 h-4" />
                  Member Since
                </label>
                <div className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-slate-900 dark:text-slate-100 transition-all duration-300">
                  {joinDate}
                </div>
              </div>

              {/* Account Type Badge */}
              <div>
                <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2 block transition-colors duration-300">
                  Account Type
                </label>
                <div className="inline-block px-4 py-2 rounded-lg bg-blue-500/10 dark:bg-blue-500/10 border border-blue-500/30 dark:border-blue-500/30 text-blue-700 dark:text-blue-400 text-sm font-semibold transition-all duration-300">
                  {user.provider === "google"
                    ? "🔵 Google Account"
                    : "📧 Email Account"}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8 pt-8 border-t border-slate-200 dark:border-slate-700/50 transition-all duration-300">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
                  >
                    <Check className="w-4 h-4" />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-semibold transition-all duration-300"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-semibold transition-all duration-300"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-rose-500/10 dark:bg-rose-500/10 hover:bg-rose-500/20 dark:hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-semibold border border-rose-500/20 dark:border-rose-500/20 transition-all duration-300"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
