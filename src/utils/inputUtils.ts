import { Position, GridData } from '../types';
import { GRID_COLS, GRID_ROWS } from '../constants/grid';
import { scrollToCursor } from './scrollUtils';

export function deleteCharacter(
  grid: GridData,
  cursor: Position,
  isBackspace: boolean
): [GridData, Position] {
  const newGrid = grid.map(row => [...row]);
  const cursorPosition = cursor.y * GRID_COLS + cursor.x;
  
  const deletePos = isBackspace ? cursorPosition - 1 : cursorPosition;
  if (deletePos < 0) return [grid, cursor];

  const deleteY = Math.floor(deletePos / GRID_COLS);
  const deleteX = deletePos % GRID_COLS;

  const chars = [];
  for (let y = deleteY; y < GRID_ROWS; y++) {
    for (let x = (y === deleteY ? deleteX + 1 : 0); x < GRID_COLS; x++) {
      if (newGrid[y][x].value !== '') {
        chars.push({ ...newGrid[y][x] });
      }
    }
  }

  newGrid[deleteY][deleteX] = { value: '', isRed: false };

  let pos = deletePos;
  for (const char of chars) {
    const y = Math.floor(pos / GRID_COLS);
    const x = pos % GRID_COLS;
    if (y < GRID_ROWS) {
      newGrid[y][x] = char;
      pos++;
    }
  }

  if (chars.length > 0) {
    const lastPos = deletePos + chars.length;
    const lastY = Math.floor(lastPos / GRID_COLS);
    const lastX = lastPos % GRID_COLS;
    if (lastY < GRID_ROWS) {
      newGrid[lastY][lastX] = { value: '', isRed: false };
    }
  }

  let newCursor = { ...cursor };
  if (isBackspace && cursorPosition > 0) {
    if (cursor.x > 0) {
      newCursor.x--;
    } else if (cursor.y > 0) {
      newCursor.y--;
      newCursor.x = GRID_COLS - 1;
    }
  }

  // Scroll to the new cursor position
  scrollToCursor(newCursor);

  return [newGrid, newCursor];
}

export function insertCharacter(
  grid: GridData,
  char: string,
  cursor: Position,
  isRed: boolean,
  isBold: boolean = false
): [GridData, Position] {
  if (!char.trim()) return [grid, cursor];

  const newGrid = grid.map(row => [...row]);
  const cursorPosition = cursor.y * GRID_COLS + cursor.x;

  const chars = [];
  for (let y = cursor.y; y < GRID_ROWS; y++) {
    for (let x = (y === cursor.y ? cursor.x : 0); x < GRID_COLS; x++) {
      if (newGrid[y][x].value !== '') {
        chars.push({ ...newGrid[y][x] });
      }
    }
  }

  newGrid[cursor.y][cursor.x] = {
    value: char,
    isRed,
    isBold,
    displayValue: char === '-' ? 'P' : undefined
  };

  let pos = cursorPosition + 1;
  for (const char of chars) {
    const y = Math.floor(pos / GRID_COLS);
    const x = pos % GRID_COLS;
    if (y < GRID_ROWS) {
      newGrid[y][x] = char;
      pos++;
    }
  }

  let newCursor = { ...cursor };
  if (cursor.x < GRID_COLS - 1) {
    newCursor.x++;
  } else if (cursor.y < GRID_ROWS - 1) {
    newCursor.x = 0;
    newCursor.y++;
  }

  // Scroll to the new cursor position
  scrollToCursor(newCursor);

  return [newGrid, newCursor];
}