import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "success";
type Size = "xs" | "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-blue-900 to-blue-950 hover:from-blue-800 hover:to-blue-900 text-white font-semibold shadow-lg hover:shadow-xl border border-blue-700/40",
  secondary:
    "bg-blue-900/20 hover:bg-blue-900/30 text-blue-900 dark:text-blue-300 dark:bg-blue-900/40 border border-blue-900/40 hover:border-blue-900/60",
  ghost:
    "bg-transparent hover:bg-slate-800/60 text-slate-400 hover:text-slate-100 border border-transparent hover:border-slate-700/60",
  danger:
    "bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 hover:border-rose-500/40",
  success:
    "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 border border-emerald-500/20 hover:border-emerald-500/40",
};

const sizes: Record<Size, string> = {
  xs: "px-2.5 py-1.5 text-xs rounded-lg gap-1.5",
  sm: "px-3.5 py-2 text-sm rounded-lg gap-2",
  md: "px-5 py-2.5 text-sm rounded-xl gap-2",
  lg: "px-7 py-3.5 text-base rounded-xl gap-2.5",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading,
      leftIcon,
      rightIcon,
      fullWidth,
      children,
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200 ease-out cursor-pointer select-none",
          "active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          !disabled && !isLoading && "hover:-translate-y-px",
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : leftIcon ? (
          <span className="shrink-0">{leftIcon}</span>
        ) : null}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
