import { Position, GridData } from '../types';
import { GameBoxType } from '../types/gameBox';
import { GRID_COLS, GRID_ROWS } from '../constants/grid';

export function findLastNonEmptyPosition(grid: GridData): Position {
  for (let y = GRID_ROWS - 1; y >= 0; y--) {
    for (let x = GRID_COLS - 1; x >= 0; x--) {
      if (grid[y][x].value !== '') {
        if (x < GRID_COLS - 1) {
          return { x: x + 1, y };
        } else if (y < GRID_ROWS - 1) {
          return { x: 0, y: y + 1 };
        }
        return { x, y };
      }
    }
  }
  return { x: 0, y: 0 };
}

export function countInputNumbers(grid: GridData): number {
  return grid.reduce((count, row) => 
    count + row.reduce((rowCount, cell) => 
      rowCount + (cell.value !== '' ? 1 : 0), 0), 0);
}

export function getNumbersFromGrid(
  grid: GridData,
  referencePoint: Position,
  boxType: GameBoxType
): [number[], boolean[]] {
  if (!referencePoint) return [[], []];

  const startPos = referencePoint.x + (referencePoint.y * GRID_COLS);
  const numbers: number[] = [];
  const colors: boolean[] = [];
  let pos = startPos;
  
  // 最大8枚まで読み込む（F,Gボックス用）
  while (numbers.length < 8 && pos < GRID_COLS * GRID_ROWS) {
    const y = Math.floor(pos / GRID_COLS);
    const x = pos % GRID_COLS;
    
    if (y < grid.length && x < GRID_COLS) {
      const cell = grid[y][x];
      if (cell.value !== '') {
        if (cell.value === '/') {
          pos++;
          continue;
        }
        
        const numValue = cell.value === '-' ? 0 : parseInt(cell.value, 10);
        numbers.push(numValue);
        colors.push(cell.isRed);
      }
    }
    pos++;
  }

  // F,Gボックスの場合、必要な枚数があるか確認
  if (boxType === 'F' && numbers.length < 7) return [[], []];
  if (boxType === 'G' && numbers.length < 8) return [[], []];

  return processNumbers(numbers, colors, boxType);
}

function processNumbers(
  numbers: number[], 
  colors: boolean[], 
  boxType: GameBoxType
): [number[], boolean[]] {
  let processedNumbers = [...numbers];
  let processedColors = [...colors];

  switch (boxType) {
    case 'B':
      if (processedNumbers.length >= 2) {
        [processedNumbers[0], processedNumbers[1]] = [processedNumbers[1], processedNumbers[0]];
        [processedColors[0], processedColors[1]] = [processedColors[1], processedColors[0]];
      }
      break;
    case 'C':
      if (processedNumbers.length >= 3) {
        [processedNumbers[1], processedNumbers[2]] = [processedNumbers[2], processedNumbers[1]];
        [processedColors[1], processedColors[2]] = [processedColors[2], processedColors[1]];
      }
      break;
    case 'D':
      if (processedNumbers.length >= 4) {
        [processedNumbers[2], processedNumbers[3]] = [processedNumbers[3], processedNumbers[2]];
        [processedColors[2], processedColors[3]] = [processedColors[3], processedColors[2]];
      }
      break;
    case 'E':
      if (processedNumbers.length >= 6) {
        [processedNumbers[4], processedNumbers[5]] = [processedNumbers[5], processedNumbers[4]];
        [processedColors[4], processedColors[5]] = [processedColors[5], processedColors[4]];
      }
      break;
    case 'F':
      // 7枚以上ある場合のみ処理
      if (processedNumbers.length >= 7) {
        processedNumbers = processedNumbers.slice(1, 7);
        processedColors = processedColors.slice(1, 7);
      }
      break;
    case 'G':
      // 8枚以上ある場合のみ処理
      if (processedNumbers.length >= 8) {
        processedNumbers = processedNumbers.slice(2, 8);
        processedColors = processedColors.slice(2, 8);
      }
      break;
  }

  return [processedNumbers.slice(0, 6), processedColors.slice(0, 6)];
}