import { calculateHandValue } from './handValue';
import { shouldPlayerDraw, shouldBankerDraw } from './drawingRules';
import { NATURAL_MIN } from './constants';

export function getUsedCardsCount(numbers: number[]): number {
  if (!numbers || numbers.length < 4) return 0;

  const playerTotal = calculateHandValue([numbers[0], numbers[2]]);
  const bankerTotal = calculateHandValue([numbers[1], numbers[3]]);

  if (playerTotal >= NATURAL_MIN || bankerTotal >= NATURAL_MIN) {
    return 4;
  }

  if (shouldPlayerDraw(playerTotal)) {
    if (numbers.length >= 5) {
      return shouldBankerDraw(bankerTotal, numbers[4]) ? 6 : 5;
    }
    return 5;
  }

  return shouldBankerDraw(bankerTotal, undefined) ? 5 : 4;
}

export function isFifthCardPlayer(numbers: number[]): boolean {
  if (!numbers || numbers.length < 4) return false;
  const playerTotal = calculateHandValue([numbers[0], numbers[2]]);
  return shouldPlayerDraw(playerTotal);
}

export function isSixthCardPlayer(numbers: number[]): boolean {
  if (!numbers || numbers.length < 5) return false;
  
  const playerTotal = calculateHandValue([numbers[0], numbers[2]]);
  const bankerTotal = calculateHandValue([numbers[1], numbers[3]]);
  
  if (!shouldPlayerDraw(playerTotal)) return false;
  return !shouldBankerDraw(bankerTotal, numbers[4]);
}