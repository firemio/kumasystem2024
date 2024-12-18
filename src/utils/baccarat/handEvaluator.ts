import { BaccaratHand } from './types';
import { calculateHandValue, hasNatural } from './cardUtils';
import { shouldPlayerDraw, shouldBankerDraw } from './drawingRules';

export function evaluateHand(
  initialCards: number[],
  isPlayer: boolean,
  opponentThirdCard?: number
): BaccaratHand {
  const initialValue = calculateHandValue(initialCards);
  let finalCards = [...initialCards];
  let drewThirdCard = false;

  const shouldDraw = isPlayer
    ? shouldPlayerDraw(initialValue)
    : shouldBankerDraw(initialValue, opponentThirdCard);

  if (shouldDraw && initialCards.length === 2) {
    drewThirdCard = true;
  }

  const finalValue = calculateHandValue(finalCards);

  return {
    cards: finalCards,
    initialValue,
    finalValue,
    hasNatural: hasNatural(initialValue),
    drewThirdCard
  };
}