import { BANKER_MANDATORY_DRAW } from '../core/constants';

export function shouldBankerDraw(bankerValue: number, playerThirdCard?: number): boolean {
  if (bankerValue <= BANKER_MANDATORY_DRAW) return true;
  if (bankerValue >= 7) return false;
  
  if (playerThirdCard === undefined) {
    return bankerValue <= 5;
  }

  switch (bankerValue) {
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