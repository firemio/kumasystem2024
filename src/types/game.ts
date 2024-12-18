import { Position } from './grid';

export type ColorMode = 'black' | 'red';

export interface GameStatus {
  gameNumber: number;
  startPosition: Position | null;
}