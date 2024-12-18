import { BaccaratHand, BaccaratGame } from '../types';
import { calculateHandValue } from './handValue';
import { shouldPlayerDraw } from '../rules/playerRules';
import { shouldBankerDraw } from '../rules/bankerRules';
import { NATURAL_THRESHOLD } from '../constants';
import { determineWinner } from './gameResult';

function hasNatural(value: number): boolean {
  return value >= NATURAL_THRESHOLD;
}

export function getRequiredCardsCount(numbers: number[]): number {
  if (!numbers || numbers.length < 4) return 0;

  // Convert P (represented as 0) to actual 0 for calculations
  const processedNumbers = numbers.map(n => n === 0 ? 0 : n);

  const playerValue = calculateHandValue([processedNumbers[0], processedNumbers[2]]);
  const bankerValue = calculateHandValue([processedNumbers[1], processedNumbers[3]]);

  // Natural 8 or 9
  if (hasNatural(playerValue) || hasNatural(bankerValue)) {
    return 4;
  }

  // Check if player needs third card
  const playerDraws = shouldPlayerDraw(playerValue);
  if (!playerDraws) {
    // Player stands - check if banker draws based on fixed rule
    return shouldBankerDraw(bankerValue, undefined) ? 6 : 4;
  }

  // Player will draw, need at least 5 cards
  if (processedNumbers.length < 5) return 5;

  // Check if banker needs third card based on player's third card
  const playerThirdCard = processedNumbers[4];
  return shouldBankerDraw(bankerValue, playerThirdCard) ? 6 : 5;
}

export function evaluateGame(numbers: number[]): BaccaratGame | null {
  if (!numbers || numbers.length < 4) return null;

  // Convert P (represented as 0) to actual 0 for calculations
  const processedNumbers = numbers.map(n => n === 0 ? 0 : n);

  const requiredCards = getRequiredCardsCount(processedNumbers);
  if (processedNumbers.length < requiredCards) return null;

  const player: BaccaratHand = {
    initialCards: [processedNumbers[0], processedNumbers[2]],
    value: calculateHandValue([processedNumbers[0], processedNumbers[2]]),
    thirdCard: null
  };

  const banker: BaccaratHand = {
    initialCards: [processedNumbers[1], processedNumbers[3]],
    value: calculateHandValue([processedNumbers[1], processedNumbers[3]]),
    thirdCard: null
  };

  // Check for naturals
  if (hasNatural(player.value) || hasNatural(banker.value)) {
    return {
      player,
      banker,
      result: determineWinner(player.value, banker.value)
    };
  }

  // Player draws first if needed
  if (shouldPlayerDraw(player.value) && processedNumbers.length >= 5) {
    player.thirdCard = processedNumbers[4];
    player.value = calculateHandValue([...player.initialCards, player.thirdCard]);
  }

  // Banker draws if needed
  if (processedNumbers.length >= 6 && shouldBankerDraw(banker.value, player.thirdCard)) {
    banker.thirdCard = processedNumbers[5];
    banker.value = calculateHandValue([...banker.initialCards, banker.thirdCard]);
  }

  return {
    player,
    banker,
    result: determineWinner(player.value, banker.value)
  };
}