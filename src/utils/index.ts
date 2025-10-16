/**
 * Calculates the Euclidean distance between two points
 * @param x1 - X coordinate of the first point
 * @param y1 - Y coordinate of the first point
 * @param x2 - X coordinate of the second point
 * @param y2 - Y coordinate of the second point
 * @returns Distance between the two points, rounded to 2 decimal places
 */
export const calculateDistance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => {
  const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  return parseNumber(distance);
};

/**
 * Rounds a number to 2 decimal places
 * @param num - The number to round
 * @returns The number rounded to 2 decimal places
 */
export const parseNumber = (num: number): number => {
  return Number(num.toFixed(2));
};
