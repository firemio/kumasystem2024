import { GameResult } from '../types';

export function determineWinner(playerValue: number, bankerValue: number): GameResult {
  if (playerValue > bankerValue) return 'Player';
  if (bankerValue > playerValue) return 'Banker';
  return 'Draw';
}