/**
 * Calculates the value of a Baccarat hand
 */
export function calculateHandValue(cards: number[]): number {
  if (!cards || !cards.length) return 0;
  const sum = cards.reduce((acc, card) => acc + (card === 0 ? 0 : card), 0);
  return sum % 10;
}

/**
 * Checks if a hand is a natural (8 or 9)
 */
export function isNatural(value: number): boolean {
  return value >= 8;
}