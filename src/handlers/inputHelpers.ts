import { Position, GridData } from '../types';
import { findLastNonEmptyPosition } from '../utils/gridUtils';
import { GRID_COLS } from '../constants/grid';

export function adjustCursorIfNeeded(
  grid: GridData,
  cursor: Position
): Position {
  const lastPosition = findLastNonEmptyPosition(grid);
  const cursorPos = cursor.y * GRID_COLS + cursor.x;
  const lastFilledPos = lastPosition.y * GRID_COLS + lastPosition.x;
  return cursorPos > lastFilledPos ? lastPosition : cursor;
}
