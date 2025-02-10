import { Position, GridData, ColorMode, GameStatus } from '../types';
import { insertCharacter, deleteCharacter } from '../utils/inputUtils';
import { moveCursor } from '../utils/cursorUtils';
import { adjustCursorIfNeeded } from './inputHelpers';
import { findLastNonEmptyPosition } from '../utils/gridUtils';
import { GRID_COLS } from '../constants/grid';

export function handleNumberPress(
  num: string,
  grid: GridData,
  cursor: Position,
  colorMode: ColorMode,
  setGrid: (value: React.SetStateAction<GridData>) => void,
  setCursor: (value: React.SetStateAction<Position>) => void
) {
  const adjustedCursor = adjustCursorIfNeeded(grid, cursor);
  const [newGrid, newCursor] = insertCharacter(grid, num, adjustedCursor, colorMode === 'red');
  setGrid(newGrid);
  setCursor(newCursor);
}

export function handleArrowPress(
  direction: 'left' | 'right' | 'up' | 'down',
  cursor: Position,
  setCursor: (value: React.SetStateAction<Position>) => void
) {
  moveCursor(direction, cursor, setCursor);
}

export function handleEnter(
  cursor: Position,
  setReferencePoint: (value: React.SetStateAction<Position | null>) => void,
  setGameStatus: (value: React.SetStateAction<GameStatus>) => void
) {
  setReferencePoint(cursor);
  setGameStatus(prev => ({
    ...prev,
    startPosition: cursor,
  }));
}

export function handleColorToggle(
  setColorMode: (value: React.SetStateAction<ColorMode>) => void
) {
  setColorMode(prev => prev === 'black' ? 'red' : 'black');
}

export function handleDelete(
  grid: GridData,
  cursor: Position,
  setGrid: (value: React.SetStateAction<GridData>) => void,
  setCursor: (value: React.SetStateAction<Position>) => void
) {
  const [newGrid, newCursor] = deleteCharacter(grid, cursor, false);
  setGrid(newGrid);
  setCursor(newCursor);
}

export function handleBackspace(
  grid: GridData,
  cursor: Position,
  setGrid: (value: React.SetStateAction<GridData>) => void,
  setCursor: (value: React.SetStateAction<Position>) => void
) {
  const [newGrid, newCursor] = deleteCharacter(grid, cursor, true);
  setGrid(newGrid);
  setCursor(newCursor);
}

export function handleSpecialChar(
  char: string,
  grid: GridData,
  cursor: Position,
  colorMode: ColorMode,
  setGrid: (value: React.SetStateAction<GridData>) => void,
  setCursor: (value: React.SetStateAction<Position>) => void
) {
  const adjustedCursor = adjustCursorIfNeeded(grid, cursor);
  const [newGrid, newCursor] = insertCharacter(
    grid,
    char,
    adjustedCursor,
    colorMode === 'red',
    char === '-'
  );
  setGrid(newGrid);
  setCursor(newCursor);
}

export function handleCellClick(
  x: number,
  y: number,
  grid: GridData,
  setCursor: (value: React.SetStateAction<Position>) => void
) {
  const lastPosition = findLastNonEmptyPosition(grid);
  const clickPosition = y * GRID_COLS + x;
  const lastFilledPosition = lastPosition.y * GRID_COLS + lastPosition.x;
  
  if (clickPosition > lastFilledPosition) {
    setCursor(lastPosition);
  } else {
    setCursor({ x, y });
  }
  
  if (window.innerWidth <= 640) {
    setTimeout(() => {
      const cell = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
      cell?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }, 100);
  }
}