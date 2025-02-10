import { BaccaratHand } from './types';
import { calculateHandValue } from './cardUtils';
import { shouldPlayerDraw, shouldBankerDraw } from './drawingRules';

export function evaluateHand(
  initialCards: number[],
  isPlayer: boolean,
  opponentThirdCard?: number
): BaccaratHand {
  const initialValue = calculateHandValue(initialCards);
  const finalCards = [...initialCards];
  let drewThirdCard = false;

  const shouldDraw = isPlayer
    ? shouldPlayerDraw(initialValue)
    : shouldBankerDraw(initialValue, opponentThirdCard);

  if (shouldDraw && initialCards.length === 2) {
    drewThirdCard = true;
  }

  const finalValue = calculateHandValue(finalCards);

  return {
    initialCards,
    value: finalValue,
    thirdCard: drewThirdCard ? finalCards[2] : undefined,
    cards: finalCards,  // 後方互換性のために残す
    total: finalValue   // 後方互換性のために残す
  };
}