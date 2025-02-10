import { GameResult } from './types';
import { calculateHandValue } from './handValue';
import { shouldPlayerDraw, shouldBankerDraw } from './drawingRules';
import { getUsedCardsCount } from './cardCount';
import { NATURAL_MIN } from './constants';

export function calculateBaccaratResult(numbers: number[]): GameResult | null {
  if (!numbers || numbers.length < 4) return null;

  const requiredCards = getUsedCardsCount(numbers);
  if (numbers.length < requiredCards) return null;

  const playerInitial = calculateHandValue([numbers[0], numbers[2]]);
  const bankerInitial = calculateHandValue([numbers[1], numbers[3]]);

  if (playerInitial >= NATURAL_MIN || bankerInitial >= NATURAL_MIN) {
    if (playerInitial > bankerInitial) return 'Player';
    if (bankerInitial > playerInitial) return 'Banker';
    return 'Draw';
  }

  let playerFinal = playerInitial;
  let bankerFinal = bankerInitial;

  if (shouldPlayerDraw(playerInitial) && numbers.length >= 5) {
    playerFinal = calculateHandValue([numbers[0], numbers[2], numbers[4]]);
    
    if (shouldBankerDraw(bankerInitial, numbers[4]) && numbers.length >= 6) {
      bankerFinal = calculateHandValue([numbers[1], numbers[3], numbers[5]]);
    }
  } else if (shouldBankerDraw(bankerInitial, undefined) && numbers.length >= 5) {
    bankerFinal = calculateHandValue([numbers[1], numbers[3], numbers[4]]);
  }

  if (playerFinal > bankerFinal) return 'Player';
  if (bankerFinal > playerFinal) return 'Banker';
  return 'Draw';
}