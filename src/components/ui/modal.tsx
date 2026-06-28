"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface ModalProps {
  /** Whether the modal is visible */
  open: boolean;
  /** Called when the user requests to close (X button, backdrop click, Escape) */
  onClose: () => void;
  /** Modal title displayed in the header */
  title?: string;
  /** Optional subtitle below the title */
  subtitle?: string;
  /** Optional icon/emoji rendered left of the title */
  icon?: React.ReactNode;
  /** Content rendered in the scrollable body */
  children: React.ReactNode;
  /** Content rendered in the sticky footer bar */
  footer?: React.ReactNode;
  /** Max width class — defaults to "max-w-4xl" */
  maxWidth?: string;
  /** Whether the modal takes full viewport height — defaults to false */
  fullHeight?: boolean;
  /** Additional className for the modal container */
  className?: string;
}

export function Modal({
  open,
  onClose,
  title,
  subtitle,
  icon,
  children,
  footer,
  maxWidth = "max-w-4xl",
  fullHeight = false,
  className = "",
}: ModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={(e) => {
        // Close on backdrop click (only if clicking the overlay itself)
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`bg-card w-full ${maxWidth} ${fullHeight ? "h-full" : "max-h-[90vh]"} rounded-xl shadow-2xl border border-border flex flex-col overflow-hidden ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || icon) && (
          <div className="flex justify-between items-center p-6 border-b border-border bg-muted/20 shrink-0">
            <div className="flex items-center gap-3">
              {icon && <div className="text-3xl bg-muted p-2 rounded-lg">{icon}</div>}
              <div>
                {title && <h2 className="text-2xl font-bold">{title}</h2>}
                {subtitle && (
                  <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
                )}
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Body (scrollable) */}
        <div className="flex-1 overflow-y-auto">{children}</div>

        {/* Footer (sticky) */}
        {footer && (
          <div className="p-4 border-t border-border bg-card shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
