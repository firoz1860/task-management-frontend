"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/context/AuthContext";
import { NotificationProvider } from "@/context/NotificationContext";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <NotificationProvider>
            {children}
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "#1E293B",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#F8FAFC",
                  fontFamily: "var(--font-outfit)",
                  fontSize: "14px",
                },
              }}
              richColors
              closeButton
            />
          </NotificationProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
