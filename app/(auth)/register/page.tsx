"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Lock,
  User,
  Zap,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  Sun,
  Moon,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { GoogleLoginButton } from "@/components/ui/GoogleLogin";
import { getErrorMessage, cn } from "@/lib/utils";

const schema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[A-Z]/, "One uppercase letter required")
      .regex(/[0-9]/, "One number required"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8+ chars", ok: password.length >= 8 },
    { label: "Uppercase", ok: /[A-Z]/.test(password) },
    { label: "Number", ok: /[0-9]/.test(password) },
  ];
  if (!password) return null;
  return (
    <div className="flex gap-2 sm:gap-3 mt-1.5 flex-wrap">
      {checks.map((c) => (
        <span
          key={c.label}
          className={cn(
            "flex items-center gap-1 text-xs transition-colors",
            c.ok ? "text-emerald-400" : "text-slate-600",
          )}
        >
          <CheckCircle2 className="w-3 h-3" />
          {c.label}
        </span>
      ))}
    </div>
  );
}

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const pw = watch("password", "");

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const onSubmit = async (data: FormData) => {
    setServerError("");
    try {
      await registerUser(data.name, data.email, data.password);
      router.replace("/tasks");
    } catch (e) {
      setServerError(getErrorMessage(e));
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center px-4 py-8 sm:py-12 relative">
      {/* Theme toggle button */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-all duration-200"
        aria-label="Toggle theme"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Subtle gradient background - desktop only */}
      <div className="fixed inset-0 -z-10 hidden sm:block">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-blue-100 dark:bg-blue-950/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-100 dark:bg-emerald-950/20 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="w-full max-w-[400px] animate-fade-up relative z-10">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-10 sm:mb-12">
          <Link href="/login" className="relative mb-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30 dark:shadow-blue-950/50 hover:shadow-lg hover:shadow-blue-600/40 transition-all">
              <Zap className="w-7 h-7 text-white fill-white" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            TaskFlow
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Create your workspace account
          </p>
        </div>

        {/* Registration Card */}
        <div className="bg-white dark:bg-slate-950 rounded-2xl shadow-xl dark:shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-blue-600" />

          <div className="p-8 sm:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Create account
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Join thousands of productive teams
              </p>
            </div>

            {serverError && (
              <div className="mb-6 px-4 py-3.5 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-xl text-sm text-rose-700 dark:text-rose-400 font-medium">
                {serverError}
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400 dark:text-slate-600 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    autoComplete="name"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    {...register("name")}
                  />
                </div>
                {errors.name && (
                  <p className="mt-2 text-sm text-rose-600 dark:text-rose-400 font-medium">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400 dark:text-slate-600 pointer-events-none" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    inputMode="email"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-rose-600 dark:text-rose-400 font-medium">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400 dark:text-slate-600 pointer-events-none" />
                  <input
                    type={showPw ? "text" : "password"}
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    className="w-full pl-11 pr-11 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
                  >
                    {showPw ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-rose-600 dark:text-rose-400 font-medium">
                    {errors.password.message}
                  </p>
                )}
                <PasswordStrength password={pw} />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400 dark:text-slate-600 pointer-events-none" />
                  <input
                    type="password"
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    {...register("confirmPassword")}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-rose-600 dark:text-rose-400 font-medium">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-400 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-600/40 disabled:shadow-none"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-7">
              <div className="flex-1 h-px bg-slate-300 dark:bg-slate-700" />
              <span className="text-xs text-slate-500 dark:text-slate-600 font-semibold uppercase tracking-wide">
                Or
              </span>
              <div className="flex-1 h-px bg-slate-300 dark:bg-slate-700" />
            </div>

            {/* Google Login */}
            <GoogleLoginButton />
          </div>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
