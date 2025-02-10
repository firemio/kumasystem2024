import React from 'react';
import { GameResult } from '../../types/gameBox';
import { isFifthCardPlayer, isSixthCardPlayer, getUsedCardsCount } from '../../utils/baccarat';

interface NumberCirclesProps {
  numbers: number[];
  colors: boolean[];
  result: GameResult | null;
}

export function NumberCircles({ numbers = [], colors = [], result }: NumberCirclesProps) {
  const getRole = (index: number): 'P' | 'B' | null => {
    if (!result) return null;
    
    if (index === 0 || index === 2) return 'P';
    if (index === 1 || index === 3) return 'B';
    
    if (index === 4) return isFifthCardPlayer(numbers) ? 'P' : 'B';
    if (index === 5) return isSixthCardPlayer(numbers) ? 'P' : 'B';
    
    return null;
  };

  const usedCards = getUsedCardsCount(numbers);

  return (
    <div className="flex flex-nowrap gap-1 justify-center">
      {numbers.slice(0, usedCards).map((number, index) => (
        <div key={index} className="relative">
          {getRole(index) && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] text-green-400">
              {getRole(index)}
            </div>
          )}
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border flex items-center justify-center border-green-500 bg-black">
            <span className={`text-xs sm:text-sm font-medium ${colors[index] ? 'text-red-500' : 'text-green-400'}`}>
              {number}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}