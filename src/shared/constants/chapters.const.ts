import type { ChapterDef } from "@/shared/types/chapter.types";

/** Source of truth for the journey timeline. */
export const CHAPTERS: readonly ChapterDef[] = [
  {
    id: "home",
    i18nKey: "chapters.liftoff",
    planetVariant: "gas-indigo",
    hue: "rgba(99,102,241,0.45)",
  },
  {
    id: "cv",
    i18nKey: "chapters.origin",
    planetVariant: "ringed-magenta",
    hue: "rgba(217,70,239,0.45)",
  },
  {
    id: "skills",
    i18nKey: "chapters.craft",
    planetVariant: "ice-cyan",
    hue: "rgba(8,145,178,0.45)",
  },
  {
    id: "projects",
    i18nKey: "chapters.worlds",
    planetVariant: "mars-orange",
    hue: "rgba(234,88,12,0.45)",
  },
  {
    id: "game",
    i18nKey: "chapters.play",
    planetVariant: "forest-green",
    hue: "rgba(22,163,74,0.45)",
  },
];

export const CHAPTER_IDS = CHAPTERS.map((c) => c.id);
