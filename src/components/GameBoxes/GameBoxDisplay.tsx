import React from 'react';
import { GameBox } from '../../types/gameBox';
import { GameSettings } from '../../types/settings';
import { ResultDisplay } from './ResultDisplay';
import { NumberCircles } from './NumberCircles';
import { checkColorMismatch } from '../../utils/colorUtils';
import { AlertTriangle } from 'lucide-react';
import { calculateBaccaratResult } from '../../utils/baccarat/core/gameLogic';
import { calculateHandValue } from '../../utils/baccarat/core/handValue';
import { getWarningMessages, hasWarnings } from '../../utils/baccarat';

interface GameBoxDisplayProps {
  box: GameBox;
  isSelected: boolean;
  onSelect: () => void;
  referenceColor?: boolean;
  settings: GameSettings;
}

export function GameBoxDisplay({ box, isSelected, onSelect, referenceColor, settings }: GameBoxDisplayProps) {
  const hasMismatch = checkColorMismatch(box.numbers, box.colors, box.id, referenceColor);
  const result = box.numbers ? calculateBaccaratResult(box.numbers) : null;
  const drawValue = result === 'Draw' && box.numbers ? calculateHandValue([box.numbers[0], box.numbers[2]]) : undefined;
  
  // 設定に基づいて警告をフィルタリング
  const filteredWarnings = box.warnings ? {
    bankerSixWin: box.warnings.bankerSixWin && settings.warnings.bankerSixWin,
    playerPair: box.warnings.playerPair && settings.warnings.playerPair,
    bankerPair: box.warnings.bankerPair && settings.warnings.bankerPair,
  } : undefined;
  
  const showWarnings = filteredWarnings && hasWarnings(filteredWarnings);
  const warningMessages = showWarnings ? getWarningMessages(filteredWarnings!) : [];

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
      {showWarnings && (
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {warningMessages.map((msg, idx) => (
            <span 
              key={idx}
              className="bg-yellow-600 text-black text-xs font-bold px-1.5 py-0.5 rounded"
            >
              {msg}
            </span>
          ))}
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
        result={result} 
        isActive={box.isActive} 
        numbers={drawValue !== undefined ? [drawValue] : undefined}
      />
      <NumberCircles 
        numbers={box.numbers} 
        colors={box.colors} 
        result={result}
      />
    </div>
  );
}