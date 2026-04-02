"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="page-bg min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center shadow-lg animate-pulse-soft">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-slate-950"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
          </div>
          <div className="flex gap-1.5">
            <span
              className="w-2 h-2 bg-blue-900/60 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="w-2 h-2 bg-blue-900/60 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="w-2 h-2 bg-blue-900/60 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
