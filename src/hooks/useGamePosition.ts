import { useState } from 'react';
import { Position } from '../types';
import { DEFAULT_START_POSITION } from '../constants/grid';
import { calculateNewPosition } from '../utils/positionUtils';

export function useGamePosition() {
  const [position, setPosition] = useState<Position>({ 
    x: DEFAULT_START_POSITION, 
    y: 0 
  });
  const [gameNumber, setGameNumber] = useState(1);

  const updatePosition = (newPosition: Position) => {
    setPosition(newPosition);
  };

  const advanceGame = (offset: number) => {
    setGameNumber(prev => prev + 1);
    setPosition(prev => calculateNewPosition(prev, offset));
  };

  return {
    position,
    gameNumber,
    updatePosition,
    advanceGame
  };
}