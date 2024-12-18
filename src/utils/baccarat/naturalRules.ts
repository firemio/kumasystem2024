import { calculateHandValue } from './cardValue';

export const NATURAL_THRESHOLD = 8;

/**
 * Checks if a hand is a natural (8 or 9)
 */
export function isNatural(cards: number[]): boolean {
  const value = calculateHandValue(cards);
  return value >= NATURAL_THRESHOLD;
}

/**
 * Checks if either hand has a natural
 */
export function hasNaturalHand(playerCards: number[], bankerCards: number[]): boolean {
  return isNatural(playerCards) || isNatural(bankerCards);
}