import React from 'react';
import { GameResult } from '../../types/gameBox';

interface ResultDisplayProps {
  result: GameResult | null;
  isActive: boolean;
}

export function ResultDisplay({ result, isActive }: ResultDisplayProps) {
  return (
    <div className="flex items-center justify-center w-full mb-2 gap-4">
      {['Banker', 'Player', 'Draw'].map((type) => (
        <span
          key={type}
          className={`
            font-black text-base
            ${!isActive ? 'text-green-900' : 
              result === type ? 'text-yellow-400' : 'text-green-400'
            }
          `}
        >
          {type}
        </span>
      ))}
    </div>
  );
}