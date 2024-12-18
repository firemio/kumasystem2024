import { GridData } from '../types';

// Grid configuration
export const GRID_COLS = 52; // 52 characters per row
export const GRID_ROWS = 9; // Fixed 9 rows, no scrolling
export const DEFAULT_START_POSITION = 0; // 1番目の位置をデフォルトに

export const INITIAL_GRID: GridData = Array(GRID_ROWS).fill(null).map(() => 
  Array(GRID_COLS).fill(null).map(() => ({ value: '', isRed: false, isBold: false }))
);