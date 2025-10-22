export type GameBoxType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
export type GameResult = 'Player' | 'Banker' | 'Draw';

export interface GameBox {
  id: GameBoxType;
  label: string;
  description?: string;
  numbers: number[];
  colors: boolean[];
  activeResult: GameResult | null;
  isActive: boolean;
  warnings?: {
    bankerSixWin: boolean;
    playerPair: boolean;
    bankerPair: boolean;
  };
}

export interface GameBoxConfig {
  id: GameBoxType;
  label: string;
  description?: string;
}