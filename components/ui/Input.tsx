import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, hint, leftIcon, rightIcon, className, id, ...props },
    ref,
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {label}
            {props.required && (
              <span className="text-blue-900 dark:text-blue-300 ml-1">*</span>
            )}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "input-field w-full px-4 py-2.5 text-base sm:text-sm",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error &&
                "border-rose-500/60 focus:border-rose-500 focus:shadow-[0_0_0_3px_rgba(244,63,94,0.1)]",
              className,
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <p className="text-xs text-rose-500 dark:text-rose-400 mt-0.5">
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-xs text-slate-600 dark:text-slate-500 mt-0.5">
            {hint}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {label}
            {props.required && (
              <span className="text-blue-900 dark:text-blue-300 ml-1\">*</span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "input-field w-full px-4 py-2.5 text-base sm:text-sm resize-none min-h-[80px] sm:min-h-[90px]",
            error &&
              "border-rose-500/60 focus:border-rose-500 focus:shadow-[0_0_0_3px_rgba(244,63,94,0.1)]",
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-rose-400 mt-0.5">{error}</p>}
        {hint && !error && (
          <p className="text-xs text-slate-500 mt-0.5">{hint}</p>
        )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, options, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          className={cn(
            "input-field w-full px-4 py-2.5 text-base sm:text-sm appearance-none cursor-pointer [&>option]:bg-slate-100 [&>option]:text-slate-900 dark:[&>option]:bg-slate-800 dark:[&>option]:text-slate-100",
            error && "border-rose-500/60",
            className,
          )}
          {...props}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-rose-400 mt-0.5">{error}</p>}
        {hint && !error && (
          <p className="text-xs text-slate-500 mt-0.5">{hint}</p>
        )}
      </div>
    );
  },
);
Select.displayName = "Select";
