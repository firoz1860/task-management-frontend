"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { notificationsApi, NotificationResponse } from "@/lib/notifications";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: Date;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (
    notification: Omit<Notification, "id" | "timestamp" | "read">,
  ) => void;
  markAsRead: (id: string) => void;
  clearNotifications: () => void;
  unreadCount: number;
  isLoading: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch notifications on mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await notificationsApi.getNotifications();
        const transformedNotifications: Notification[] = data.map((notif) => ({
          id: notif.id,
          title: notif.title,
          message: notif.message,
          type: notif.type,
          timestamp: new Date(notif.timestamp),
          read: notif.read,
        }));
        setNotifications(transformedNotifications);
      } catch {
        // Fallback to empty list
        setNotifications([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const addNotification = (
    notification: Omit<Notification, "id" | "timestamp" | "read">,
  ) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)),
    );
    // Also notify the backend
    notificationsApi.markAsRead(id).catch((err) => console.error(err));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        clearNotifications,
        unreadCount,
        isLoading,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within NotificationProvider",
    );
  }
  return context;
}
