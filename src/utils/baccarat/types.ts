export type GameResult = 'Player' | 'Banker' | 'Draw';

export interface Hand {
  cards: number[];
  total: number;
}

export interface GameState {
  player: Hand;
  banker: Hand;
  result: GameResult | null;
}