import { calculateHandValue } from './cardValue';

const PLAYER_DRAW_THRESHOLD = 5;

/**
 * Determines if the player should draw a third card
 * Player draws if total is 5 or less
 * Player stands on 6 or 7
 */
export function shouldPlayerDraw(playerCards: number[]): boolean {
  const value = calculateHandValue(playerCards);
  return value <= PLAYER_DRAW_THRESHOLD;
}