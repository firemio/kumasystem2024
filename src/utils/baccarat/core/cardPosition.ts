import { calculateHandValue } from './handValue';
import { shouldPlayerDraw, shouldBankerDraw } from './gameLogic';

export function isFifthCardPlayer(numbers: number[]): boolean {
  if (!numbers || numbers.length < 4) return false;

  const playerInitial = calculateHandValue([numbers[0], numbers[2]]);
  const bankerInitial = calculateHandValue([numbers[1], numbers[3]]);

  return shouldPlayerDraw(playerInitial);
}

export function isSixthCardPlayer(numbers: number[]): boolean {
  if (!numbers || numbers.length < 5) return false;

  const playerInitial = calculateHandValue([numbers[0], numbers[2]]);
  const bankerInitial = calculateHandValue([numbers[1], numbers[3]]);

  return shouldPlayerDraw(playerInitial) && shouldBankerDraw(bankerInitial, numbers[4]);
}