import { PLAYER_DRAW_THRESHOLD, BANKER_MANDATORY_DRAW, BANKER_OPTIONAL_DRAW } from './constants';

export function shouldPlayerDraw(playerTotal: number): boolean {
  if (playerTotal < 0 || playerTotal > 9) throw new Error('Invalid player total');
  return playerTotal <= PLAYER_DRAW_THRESHOLD;
}

export function shouldBankerDraw(bankerTotal: number, playerThirdCard: number | null): boolean {
  if (bankerTotal < 0 || bankerTotal > 9) throw new Error('Invalid banker total');
  if (playerThirdCard !== null && (playerThirdCard < 0 || playerThirdCard > 9)) {
    throw new Error('Invalid player third card');
  }

  if (bankerTotal <= BANKER_MANDATORY_DRAW) return true;
  if (bankerTotal >= 7) return false;
  
  if (playerThirdCard === null) {
    return bankerTotal <= BANKER_OPTIONAL_DRAW;
  }

  const rules = {
    3: (card: number) => card !== 8,
    4: (card: number) => card >= 2 && card <= 7,
    5: (card: number) => card >= 4 && card <= 7,
    6: (card: number) => card === 6 || card === 7
  };

  return rules[bankerTotal as keyof typeof rules]?.(playerThirdCard) ?? false;
}