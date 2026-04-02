"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RootPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      router.replace(isAuthenticated ? "/tasks" : "/login");
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <div className="page-bg flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-warm flex items-center justify-center animate-bounce-soft">
          <span className="text-slate-950 font-bold text-lg">T</span>
        </div>
        <div className="w-6 h-6 border-2 border-blue-900/30 border-t-blue-900 rounded-full animate-spin" />
      </div>
    </div>
  );
}
