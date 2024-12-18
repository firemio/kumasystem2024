import { useState } from 'react';
import { Position } from '../types';
import { DEFAULT_START_POSITION } from '../constants/grid';
import { calculateNewPosition } from '../utils/positionUtils';

export function useGameState() {
  const [position, setPosition] = useState<Position>({ 
    x: DEFAULT_START_POSITION, 
    y: 0 
  });
  const [gameNumber, setGameNumber] = useState(1);
  const [selectedBox, setSelectedBox] = useState<string | null>(null);

  const reset = () => {
    setPosition({ x: DEFAULT_START_POSITION, y: 0 });
    setGameNumber(1);
    setSelectedBox(null);
  };

  const updatePosition = (newPosition: Position) => {
    setPosition(newPosition);
  };

  const advanceGame = (offset: number) => {
    setGameNumber(prev => prev + 1);
    setPosition(prev => calculateNewPosition(prev, offset));
    setSelectedBox(null); // 選択状態をリセット
  };

  return {
    position,
    gameNumber,
    selectedBox,
    setSelectedBox,
    updatePosition,
    advanceGame,
    reset
  };
}