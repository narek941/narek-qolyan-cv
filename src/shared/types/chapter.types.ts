import type { PlanetVariant } from "@/shared/ui/planet";

export type ChapterId = "home" | "cv" | "skills" | "projects" | "game";

/** Sections rendered inside ChapterScene (excludes hero/home). */
export type ChapterSectionId = Exclude<ChapterId, "home">;

export interface ChapterDef {
  /** DOM id for scroll anchoring. */
  id: ChapterId;
  /** i18n key prefix, e.g. "chapters.liftoff". */
  i18nKey: string;
  /** Planet rendered behind the chapter title. */
  planetVariant: PlanetVariant;
  /** Atmospheric backlight tint. */
  hue: string;
}
