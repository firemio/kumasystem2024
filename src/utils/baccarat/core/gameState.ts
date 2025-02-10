import { BaccaratHand, BaccaratGame } from '../types';
import { calculateHandValue, isNatural } from './handValue';
import { shouldPlayerDraw, shouldBankerDraw } from '../drawingRules';
import { NATURAL_MIN } from '../constants';
import { determineWinner } from './gameResult';
import { getRequiredCardsCount } from './gameLogic';

function isNatural(value: number): boolean {
  return value >= NATURAL_MIN;
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
    thirdCard: undefined
  };

  const banker: BaccaratHand = {
    initialCards: [processedNumbers[1], processedNumbers[3]],
    value: calculateHandValue([processedNumbers[1], processedNumbers[3]]),
    thirdCard: undefined
  };

  // Check for naturals
  if (isNatural(player.value) || isNatural(banker.value)) {
    return {
      player,
      banker,
      result: determineWinner(player.value, banker.value)
    };
  }

  // Handle player's third card
  if (shouldPlayerDraw(player.value) && processedNumbers.length >= 5) {
    player.thirdCard = processedNumbers[4];
    player.value = calculateHandValue([...player.initialCards, player.thirdCard]);
  }

  // Handle banker's third card
  if (shouldBankerDraw(banker.value, player.thirdCard)) {
    const bankerThirdCardIndex = player.thirdCard ? 5 : 4;
    if (processedNumbers.length > bankerThirdCardIndex) {
      banker.thirdCard = processedNumbers[bankerThirdCardIndex];
      banker.value = calculateHandValue([...banker.initialCards, banker.thirdCard]);
    }
  }

  return {
    player,
    banker,
    result: determineWinner(player.value, banker.value)
  };
}
