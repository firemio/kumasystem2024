import { Position } from '../types';
import { GRID_COLS, GRID_ROWS } from '../constants/grid';

export function moveCursor(
  direction: 'left' | 'right' | 'up' | 'down',
  currentPosition: Position,
  setCursor: (value: React.SetStateAction<Position>) => void,
) {
  setCursor(prev => {
    let newX = prev.x;
    let newY = prev.y;

    switch (direction) {
      case 'left':
        if (prev.x > 0) {
          newX = prev.x - 1;
        } else if (prev.y > 0) {
          newX = GRID_COLS - 1;
          newY = prev.y - 1;
        }
        break;
      case 'right':
        if (prev.x < GRID_COLS - 1) {
          newX = prev.x + 1;
        } else if (prev.y < GRID_ROWS - 1) {
          newX = 0;
          newY = prev.y + 1;
        }
        break;
      case 'up':
        newY = Math.max(0, prev.y - 1);
        break;
      case 'down':
        newY = Math.min(GRID_ROWS - 1, prev.y + 1);
        break;
    }

    return { x: newX, y: newY };
  });
}