/**
 * Render an "01 / 05" style chapter ordinal.
 * Zero-pads both sides to two digits.
 */
export const formatChapterIndex = (currentIndex: number, totalChapters: number): string => {
  const padded = (value: number) => String(value).padStart(2, "0");
  return `${padded(currentIndex)} / ${padded(totalChapters)}`;
};
