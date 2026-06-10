import { Sparkles } from "lucide-react";

import { cn } from "@/shared/lib/cn";

import { KEY_FEATURES_TOGGLE_BUTTON_CLASS_NAME } from "../const";
import type { KeyFeaturesToggleButtonProps } from "../types";

export const KeyFeaturesToggleButton = ({
  isOpen,
  showFeaturesLabel,
  hideFeaturesLabel,
  onToggle,
  className,
}: KeyFeaturesToggleButtonProps) => (
  <button
    type="button"
    onClick={onToggle}
    className={cn(KEY_FEATURES_TOGGLE_BUTTON_CLASS_NAME, className)}
  >
    <Sparkles className="h-3 w-3" />
    {isOpen ? hideFeaturesLabel : showFeaturesLabel}
  </button>
);
