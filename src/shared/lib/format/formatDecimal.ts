/**
 * Format a number with a fixed number of decimal digits.
 */
export const formatDecimal = (value: number, digits = 1): string => value.toFixed(digits);
