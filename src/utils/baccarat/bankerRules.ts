import { calculateHandValue } from './cardValue';

/**
 * Determines if the banker should draw a third card based on:
 * - Banker's current hand value
 * - Player's third card (if any)
 */
export function shouldBankerDraw(bankerCards: number[], playerThirdCard?: number): boolean {
  const value = calculateHandValue(bankerCards);
  
  // Always draw on 0-2
  if (value <= 2) return true;
  
  // Never draw on 7
  if (value >= 7) return false;
  
  // If player didn't draw a third card
  if (playerThirdCard === undefined) {
    return value <= 5;
  }

  // Complex drawing rules based on banker's total and player's third card
  switch (value) {
    case 3:
      return playerThirdCard !== 8;
    case 4:
      return playerThirdCard >= 2 && playerThirdCard <= 7;
    case 5:
      return playerThirdCard >= 4 && playerThirdCard <= 7;
    case 6:
      return playerThirdCard === 6 || playerThirdCard === 7;
    default:
      return false;
  }
}