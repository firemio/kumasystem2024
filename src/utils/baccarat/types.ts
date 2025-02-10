export type GameResult = 'Player' | 'Banker' | 'Draw';

export interface BaccaratHand {
  initialCards: number[];
  value: number;
  thirdCard: number | undefined;
  cards?: number[];  // 後方互換性のために残す
  total?: number;    // 後方互換性のために残す
}

export interface BaccaratGame {
  player: BaccaratHand;
  banker: BaccaratHand;
  result: GameResult | null;
}

// 後方互換性のために残す
export interface Hand extends BaccaratHand {}
export interface GameState extends BaccaratGame {}