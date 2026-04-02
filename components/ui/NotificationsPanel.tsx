"use client";

import { useState } from "react";
import { Bell, X, Check } from "lucide-react";
import { useNotifications } from "@/context/NotificationContext";

export function NotificationsPanel() {
  const { notifications, markAsRead, unreadCount } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
      case "error":
        return "bg-rose-500/10 border-rose-500/20 text-rose-400";
      case "warning":
        return "bg-blue-900/20 border-blue-900/40 text-blue-300";
      default:
        return "bg-blue-500/10 border-blue-500/20 text-blue-400";
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "warning":
        return "⚠";
      default:
        return "ℹ";
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-slate-600 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800/60 transition-all"
        title="Notifications"
      >
        <Bell style={{ width: 18, height: 18 }} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-96 glass rounded-xl border border-slate-300 dark:border-slate-700/50 shadow-card z-20 overflow-hidden animate-scale-in max-h-96 overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700/50 bg-slate-100 dark:bg-slate-900/50">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200">
                Notifications
                {unreadCount > 0 && (
                  <span className="ml-2 text-xs bg-red-500/20 text-red-500 dark:text-red-400 px-2 py-0.5 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800/60 transition-colors"
              >
                <X className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              </button>
            </div>

            {/* Notifications List */}
            {notifications.length > 0 ? (
              <div className="divide-y divide-slate-200 dark:divide-slate-700/30">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 border-l-2 cursor-pointer transition-colors ${
                      notification.read
                        ? "bg-slate-50 dark:bg-slate-900/20 border-l-slate-300 dark:border-l-slate-700/30"
                        : "bg-slate-100 dark:bg-slate-900/40 border-l-blue-900"
                    } hover:bg-slate-200 dark:hover:bg-slate-900/60`}
                    onClick={() => {
                      markAsRead(notification.id);
                    }}
                  >
                    <div className="flex gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${getTypeColor(notification.type)}`}
                      >
                        {getTypeBadge(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-200">
                          {notification.title}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-slate-700 dark:text-slate-500 mt-1">
                          {new Date(notification.timestamp).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-900 rounded-full mt-1 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No notifications yet</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
