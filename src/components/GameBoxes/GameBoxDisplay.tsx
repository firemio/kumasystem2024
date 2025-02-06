import React from 'react';
import { GameBox } from '../../types/gameBox';
import { ResultDisplay } from './ResultDisplay';
import { NumberCircles } from './NumberCircles';
import { checkColorMismatch } from '../../utils/colorUtils';
import { AlertTriangle } from 'lucide-react';

interface GameBoxDisplayProps {
  box: GameBox;
  isSelected: boolean;
  onSelect: () => void;
}

export function GameBoxDisplay({ box, isSelected, onSelect }: GameBoxDisplayProps) {
  const hasMismatch = checkColorMismatch(box.numbers, box.colors, box.id);

  return (
    <div
      onClick={hasMismatch ? undefined : onSelect}
      className={`
        relative h-full border-2 rounded-lg p-2 sm:p-3 transition-colors
        ${hasMismatch ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${isSelected ? 'bg-green-900 border-green-400' : 'border-green-500 hover:bg-green-900'}
        bg-black text-green-500
      `}
    >
      {hasMismatch && (
        <div className="absolute top-2 right-2 text-red-500 flex items-center gap-1">
          <AlertTriangle className="w-4 h-4" />
        </div>
      )}
      <div className="flex items-center justify-center mb-2 sm:mb-3">
        <span className="text-sm sm:text-base font-bold text-green-400">
          {box.label}
          {box.description && (
            <span className="text-green-600 ml-1 text-xs sm:text-sm">({box.description})</span>
          )}
        </span>
      </div>
      <ResultDisplay 
        result={box.activeResult} 
        isActive={box.isActive} 
        numbers={box.activeResult === 'Draw' && box.numbers ? [box.numbers[1]] : undefined}
      />
      <NumberCircles 
        numbers={box.numbers} 
        colors={box.colors} 
        result={box.activeResult}
      />
    </div>
  );
}