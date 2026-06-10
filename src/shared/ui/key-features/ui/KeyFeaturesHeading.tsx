import { Sparkles } from "lucide-react";

import { cn } from "@/shared/lib/cn";

import type { KeyFeaturesHeadingProps } from "../types";

export const KeyFeaturesHeading = ({
  headingLabel,
  className,
}: KeyFeaturesHeadingProps) => (
  <div className={cn("mb-6 flex items-center gap-3", className)}>
    <Sparkles className="h-5 w-5 text-indigo-300" />
    <h4 className="font-display text-lg font-bold text-white">{headingLabel}</h4>
  </div>
);
