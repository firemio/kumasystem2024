import { GameResult } from '../../types/gameBox';
import { calculateHandValue, isNatural } from './handValue';
import { shouldPlayerDraw, shouldBankerDraw } from './drawRules';

/**
 * Calculates required number of cards based on game state
 */
function getRequiredCardsCount(numbers: number[]): number {
  if (!numbers || numbers.length < 4) return 0;

  const playerInitial = calculateHandValue([numbers[0], numbers[2]]);
  const bankerInitial = calculateHandValue([numbers[1], numbers[3]]);

  // Natural 8 or 9
  if (isNatural(playerInitial) || isNatural(bankerInitial)) {
    return 4;
  }

  // Check player draw
  if (shouldPlayerDraw(playerInitial)) {
    // Player will draw
    if (numbers.length < 5) return 5;

    // Check banker draw with player's third card
    return shouldBankerDraw(bankerInitial, numbers[4]) ? 6 : 5;
  }

  // Player stands - check banker draw
  return shouldBankerDraw(bankerInitial) ? 5 : 4;
}

/**
 * Evaluates the game result
 */
export function calculateBaccaratResult(numbers: number[]): GameResult | null {
  if (!numbers || numbers.length < 4) return null;

  const requiredCards = getRequiredCardsCount(numbers);
  if (numbers.length < requiredCards) return null;

  // Initial hands
  const playerInitial = calculateHandValue([numbers[0], numbers[2]]);
  const bankerInitial = calculateHandValue([numbers[1], numbers[3]]);

  // Check naturals
  if (isNatural(playerInitial) || isNatural(bankerInitial)) {
    if (playerInitial > bankerInitial) return 'Player';
    if (bankerInitial > playerInitial) return 'Banker';
    return 'Draw';
  }

  let playerFinal = playerInitial;
  let bankerFinal = bankerInitial;

  // Player draws first if needed
  if (shouldPlayerDraw(playerInitial) && numbers.length >= 5) {
    playerFinal = calculateHandValue([numbers[0], numbers[2], numbers[4]]);
    
    // Banker decision based on player's third card
    if (shouldBankerDraw(bankerInitial, numbers[4]) && numbers.length >= 6) {
      bankerFinal = calculateHandValue([numbers[1], numbers[3], numbers[5]]);
    }
  } else if (shouldBankerDraw(bankerInitial) && numbers.length >= 5) {
    // Player stands, banker might draw
    bankerFinal = calculateHandValue([numbers[1], numbers[3], numbers[4]]);
  }

  // Determine winner
  if (playerFinal > bankerFinal) return 'Player';
  if (bankerFinal > playerFinal) return 'Banker';
  return 'Draw';
}

/**
 * Gets the number of cards used in the game
 */
export function getUsedCardsCount(numbers: number[]): number {
  return getRequiredCardsCount(numbers);
}