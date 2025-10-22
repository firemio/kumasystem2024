import { useCallback, useEffect } from 'react';
import { Position, GridData, ColorMode } from '../types';
import * as handlers from '../handlers/inputHandlers';
import { useFocusManagement } from './useFocusManagement';

interface UseKeyboardInputProps {
  containerRef: React.RefObject<HTMLDivElement>;
  grid: GridData;
  cursor: Position;
  setCursor: (value: React.SetStateAction<Position>) => void;
  setGrid: (value: React.SetStateAction<GridData>) => void;
  setReferencePoint: (position: Position) => void;
  colorMode: ColorMode;
  setColorMode: (value: React.SetStateAction<ColorMode>) => void;
}

export function useKeyboardInput({
  containerRef,
  grid,
  cursor,
  setCursor,
  setGrid,
  setReferencePoint,
  colorMode,
  setColorMode,
}: UseKeyboardInputProps) {
  const { focus } = useFocusManagement(containerRef);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return;
    }

    e.preventDefault();
    
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'ArrowUp':
      case 'ArrowDown':
        handlers.handleArrowPress(
          e.key.replace('Arrow', '').toLowerCase() as 'left' | 'right' | 'up' | 'down',
          cursor,
          setCursor
        );
        setTimeout(focus, 0);
        break;
      case 'Enter':
        setReferencePoint(cursor);
        setTimeout(focus, 0);
        break;
      case '*':
        handlers.handleColorToggle(setColorMode);
        setTimeout(focus, 0);
        break;
      case 'Backspace':
      case 'Delete':
        if (e.key === 'Backspace') {
          handlers.handleBackspace(grid, cursor, setGrid, setCursor);
        } else {
          handlers.handleDelete(grid, cursor, setGrid, setCursor);
        }
        setTimeout(focus, 0);
        break;
      case '/':
      case '-':
        handlers.handleSpecialChar(e.key, grid, cursor, colorMode, setGrid, setCursor);
        setTimeout(focus, 0);
        break;
      default:
        if (/^[0-9]$/.test(e.key)) {
          handlers.handleNumberPress(e.key, grid, cursor, colorMode, setGrid, setCursor);
          setTimeout(focus, 0);
        }
    }
  }, [cursor, setCursor, setGrid, setReferencePoint, colorMode, setColorMode, grid, focus]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    element.addEventListener('keydown', handleKeyDown);
    return () => element.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, containerRef]);

  return { focus };
}