import { useCallback } from 'react';
import { Position, GridData, ColorMode, GameStatus } from '../types';
import { moveCursor } from '../utils/cursorUtils';
import { deleteCharacter, insertCharacter } from '../utils/inputUtils';

interface UseKeyboardNavigationProps {
  grid: GridData;
  cursor: Position;
  setCursor: (value: React.SetStateAction<Position>) => void;
  setGrid: (value: React.SetStateAction<GridData>) => void;
  setReferencePoint: (value: React.SetStateAction<Position | null>) => void;
  colorMode: ColorMode;
  setColorMode: (value: React.SetStateAction<ColorMode>) => void;
  gameStatus: GameStatus;
  setGameStatus: (value: React.SetStateAction<GameStatus>) => void;
}

export function useKeyboardNavigation({
  grid,
  cursor,
  setCursor,
  setGrid,
  setReferencePoint,
  colorMode,
  setColorMode,
  gameStatus,
  setGameStatus,
}: UseKeyboardNavigationProps) {
  return useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'ArrowUp':
      case 'ArrowDown':
        moveCursor(e.key.replace('Arrow', '').toLowerCase() as 'left' | 'right' | 'up' | 'down',
          cursor, setCursor);
        break;
      case 'Enter':
        setReferencePoint(cursor);
        setGameStatus(prev => ({
          ...prev,
          startPosition: cursor,
        }));
        break;
      case '*':
        setColorMode(prev => prev === 'black' ? 'red' : 'black');
        break;
      case 'Backspace':
      case 'Delete':
        setGrid(prev => {
          const [newGrid, newPosition] = deleteCharacter(prev, cursor, e.key === 'Backspace');
          setCursor(newPosition);
          return newGrid;
        });
        break;
      case '/':
      case '-':
        setGrid(prev => {
          const [newGrid, newPosition] = insertCharacter(
            prev,
            e.key,
            cursor,
            colorMode === 'red',
            e.key === '-'
          );
          setCursor(newPosition);
          return newGrid;
        });
        break;
      default:
        if (/^[0-9]$/.test(e.key)) {
          setGrid(prev => {
            const [newGrid, newPosition] = insertCharacter(
              prev,
              e.key,
              cursor,
              colorMode === 'red'
            );
            setCursor(newPosition);
            return newGrid;
          });
        }
    }
  }, [cursor, setCursor, setGrid, setReferencePoint, colorMode, setColorMode, setGameStatus]);
}