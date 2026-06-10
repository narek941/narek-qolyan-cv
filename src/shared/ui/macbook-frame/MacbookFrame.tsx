"use client";

import { type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

interface MacbookFrameProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /** Render a browser chrome bar (traffic lights + address bar). */
  showBrowserChrome?: boolean;
  /** Address-bar text when chrome is shown. Keep it brandless. */
  addressBarText?: string;
}

/**
 * Notebook device mock — companion to the ScrollX UI iPhone frame.
 * Aluminium lid with bezel, webcam dot, screen slot for children, and
 * a base deck with the trackpad notch.
 */
export const MacbookFrame = ({
  children,
  showBrowserChrome = true,
  addressBarText = "app.example.dev",
  className,
  ...props
}: MacbookFrameProps) => (
  <div className={cn("relative w-full select-none", className)} {...props}>
    {/* Lid */}
    <div className="relative mx-auto w-[88%] rounded-t-xl rounded-b-md bg-gradient-to-b from-[#3a3a3e] via-[#232327] to-[#1a1a1e] p-[2.5%] pb-[1.8%] shadow-[0_24px_60px_-16px_rgba(0,0,0,0.7)]">
      {/* Webcam */}
      <div className="absolute left-1/2 top-[1.1%] h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-[#0a0a0c] ring-1 ring-white/10" />

      {/* Screen */}
      <div className="relative overflow-hidden rounded-md bg-[#0a0a14]" style={{ aspectRatio: "16/10" }}>
        {showBrowserChrome && (
          <div className="flex h-[7%] min-h-[22px] items-center gap-2 border-b border-white/10 bg-[#16161e] px-2.5">
            <span className="h-2 w-2 rounded-full bg-red-500/80" />
            <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
            <span className="h-2 w-2 rounded-full bg-green-500/80" />
            <span className="mx-auto flex h-[60%] w-[55%] items-center justify-center rounded-md bg-white/[0.06] font-mono text-[8px] tracking-wide text-white/40">
              {addressBarText}
            </span>
          </div>
        )}
        <div
          className="relative w-full overflow-hidden"
          style={{ height: showBrowserChrome ? "93%" : "100%" }}
        >
          {children}
        </div>
      </div>
    </div>

    {/* Base deck */}
    <div className="relative mx-auto h-[14px] w-full rounded-b-xl rounded-t-sm bg-gradient-to-b from-[#4a4a50] via-[#2e2e34] to-[#1c1c20] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.8)]">
      {/* Trackpad notch */}
      <div className="absolute left-1/2 top-0 h-[6px] w-[14%] -translate-x-1/2 rounded-b-lg bg-[#141418]" />
      {/* Bottom light edge */}
      <div className="absolute inset-x-[6%] bottom-[2px] h-px bg-white/10" />
    </div>
  </div>
);
