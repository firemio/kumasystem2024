import React from 'react';
import { GameResult } from '../../types/gameBox';

interface ResultDisplayProps {
  result: GameResult | null;
  isActive: boolean;
  numbers?: number[];
}

export function ResultDisplay({ result, isActive, numbers }: ResultDisplayProps) {
  return (
    <div className="flex items-center justify-center w-full mb-2 gap-4 relative">
      {['Player', 'Banker', 'Draw'].map((type) => (
        <span
          key={type}
          className={`
            font-black text-base relative
            ${!isActive ? 'text-green-900' : 
              result === type ? 'text-yellow-400' : 'text-green-400'
            }
          `}
        >
          {type === 'Draw' && result === 'Draw' && isActive && numbers && (
            <span className="absolute left-1/2 -translate-x-1/2 -top-6 text-xl text-yellow-400">
              {numbers[0]}
            </span>
          )}
          {type}
        </span>
      ))}
    </div>
  );
}