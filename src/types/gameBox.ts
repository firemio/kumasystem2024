export type GameBoxType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
export type GameResult = 'Banker' | 'Player' | 'Draw';

export interface GameBox {
  id: GameBoxType;
  label: string;
  description?: string;
  numbers: number[];
  colors: boolean[];
  activeResult: GameResult | null;
  isActive: boolean;
}

export interface GameBoxConfig {
  id: GameBoxType;
  label: string;
  description?: string;
}