import { PLAYER_DRAW_THRESHOLD } from '../core/constants';

export function shouldPlayerDraw(handValue: number): boolean {
  return handValue <= PLAYER_DRAW_THRESHOLD;
}