import { GameResult } from '../types';
import { calculateHandValue, isNatural } from './handValue';
import { shouldPlayerDraw, shouldBankerDraw } from '../drawingRules';

function getRequiredCardsCount(numbers: number[]): number {
  if (!numbers || numbers.length < 4) return 0;

  const playerInitial = calculateHandValue([numbers[0], numbers[2]]);
  const bankerInitial = calculateHandValue([numbers[1], numbers[3]]);

  if (isNatural(playerInitial) || isNatural(bankerInitial)) {
    return 4;
  }

  if (shouldPlayerDraw(playerInitial)) {
    if (numbers.length < 5) return 5;
    return shouldBankerDraw(bankerInitial, numbers[4]) ? 6 : 5;
  }

  return shouldBankerDraw(bankerInitial) ? 5 : 4;
}

export function calculateBaccaratResult(numbers: number[]): GameResult | null {
  if (!numbers || numbers.length < 4) return null;

  const requiredCards = getRequiredCardsCount(numbers);
  if (numbers.length < requiredCards) return null;

  const playerInitial = calculateHandValue([numbers[0], numbers[2]]);
  const bankerInitial = calculateHandValue([numbers[1], numbers[3]]);

  if (isNatural(playerInitial) || isNatural(bankerInitial)) {
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
  } else if (shouldBankerDraw(bankerInitial) && numbers.length >= 5) {
    bankerFinal = calculateHandValue([numbers[1], numbers[3], numbers[4]]);
  }

  if (playerFinal > bankerFinal) return 'Player';
  if (bankerFinal > playerFinal) return 'Banker';
  return 'Draw';
}

export function getUsedCardsCount(numbers: number[]): number {
  return getRequiredCardsCount(numbers);
}