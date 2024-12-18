import { Position } from '../types';
import { GRID_COLS, GRID_ROWS } from '../constants/grid';

export function calculateNewPosition(current: Position, offset: number): Position {
  let newX = current.x + offset;
  let newY = current.y;

  while (newX >= GRID_COLS) {
    newX -= GRID_COLS;
    newY++;
  }

  if (newY >= GRID_ROWS) {
    newY = GRID_ROWS - 1;
    newX = GRID_COLS - 1;
  }

  return { x: newX, y: newY };
}