"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  hideClose?: boolean;
}

const sizeMap = { sm: "sm:max-w-md", md: "sm:max-w-lg", lg: "sm:max-w-2xl" };

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  hideClose,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-fade-in" />

      {/* Panel — slides up from bottom on mobile, centered on desktop */}
      <div
        className={cn(
          "relative w-full glass shadow-card overflow-hidden modal-enter",
          "rounded-t-2xl sm:rounded-2xl",
          "max-h-[90vh] overflow-y-auto",
          sizeMap[size],
        )}
      >
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-900/40 to-transparent" />

        {/* Mobile drag handle */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-slate-700 rounded-full" />
        </div>

        {title && (
          <div className="flex items-center justify-between px-5 sm:px-6 pt-3 sm:pt-5 pb-4 border-b border-slate-700/50">
            <h2 className="text-base sm:text-lg font-semibold text-slate-100">
              {title}
            </h2>
            {!hideClose && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-700/60 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        <div className="px-5 sm:px-6 py-5 pb-safe">{children}</div>
      </div>
    </div>
  );
}
