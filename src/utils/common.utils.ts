export const calculateDistance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  return parseNumber(distance);
};

export const parseNumber = (num: number) => {
  return Number(num.toFixed(2));
};
