import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Delete, CornerDownLeft } from 'lucide-react';
import { ColorMode } from '../../types';

interface VirtualNumpadProps {
  onNumberPress: (num: string) => void;
  onArrowPress: (direction: 'left' | 'right' | 'up' | 'down') => void;
  onDelete: () => void;
  onBackspace: () => void;
  onEnter: () => void;
  onColorToggle: () => void;
  onSpecialChar: (char: string) => void;
  colorMode: ColorMode;
  isVisible: boolean;
}

export function VirtualNumpad({
  onNumberPress,
  onArrowPress,
  onDelete,
  onBackspace,
  onEnter,
  onColorToggle,
  onSpecialChar,
  colorMode,
  isVisible
}: VirtualNumpadProps) {
  if (!isVisible) return null;

  // 現在の色に基づいたボタンスタイルを取得
  const getButtonClass = (isInverted = false) => {
    const isRed = isInverted ? colorMode !== 'red' : colorMode === 'red';
    const textColor = isRed ? 'text-red-400' : 'text-green-400';
    const hoverColor = isRed ? 'hover:bg-red-900' : 'hover:bg-green-900';
    const activeColor = isRed ? 'active:bg-red-800' : 'active:bg-green-800';
    
    return `
      w-full aspect-square
      sm:w-16 sm:h-16 sm:aspect-auto
      flex items-center justify-center rounded
      border border-green-500/60 ${textColor}
      ${hoverColor} ${activeColor}
      transition-colors font-bold text-lg sm:text-xl
      touch-manipulation select-none
      min-h-0 bg-green-900/40
    `;
  };

  const buttonClass = getButtonClass();

  return (
    <div className="fixed bottom-0 right-0 left-0 sm:left-auto sm:bottom-4 sm:right-4 bg-green-950/90 border-2 border-green-500 rounded-t-lg sm:rounded-lg p-1 sm:p-4 shadow-lg scale-75 sm:scale-100 origin-bottom sm:origin-center">
      <div className="grid grid-cols-4 gap-1 sm:gap-2 max-w-[260px] sm:max-w-md mx-auto">
        {/* Navigation Controls */}
        <div className="col-span-4 grid grid-cols-3 gap-1 sm:gap-2 mb-1 sm:mb-2">
          <button className={buttonClass} onClick={() => onArrowPress('left')}>
            <ArrowLeft className="w-6 h-6 sm:w-6 sm:h-6" />
          </button>
          <div className="grid grid-rows-2 gap-1 sm:gap-2">
            <button className={buttonClass} onClick={() => onArrowPress('up')}>
              <ArrowUp className="w-6 h-6 sm:w-6 sm:h-6" />
            </button>
            <button className={buttonClass} onClick={() => onArrowPress('down')}>
              <ArrowDown className="w-6 h-6 sm:w-6 sm:h-6" />
            </button>
          </div>
          <button className={buttonClass} onClick={() => onArrowPress('right')}>
            <ArrowRight className="w-6 h-6 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Number Pad */}
        <div className="col-span-4 grid grid-cols-3 gap-1 sm:gap-2">
          {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
            <button
              key={num}
              className={buttonClass}
              onClick={() => onNumberPress(num.toString())}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Special Characters and 0 */}
        <div className="col-span-4 grid grid-cols-3 gap-1 sm:gap-2">
          <button className={buttonClass} onClick={() => onSpecialChar('/')}>
            /
          </button>
          <button className={buttonClass} onClick={() => onNumberPress('0')}>
            0
          </button>
          <button className={buttonClass} onClick={() => onSpecialChar('-')}>
            -
          </button>
        </div>

        {/* Function Keys */}
        <div className="col-span-4 grid grid-cols-3 gap-1 sm:gap-2">
          <button
            className={getButtonClass(true)}
            onClick={onColorToggle}
          >
            *
          </button>
          <button className={buttonClass} onClick={onBackspace}>
            <Delete className="w-6 h-6 sm:w-6 sm:h-6" />
          </button>
          <button className={buttonClass} onClick={onEnter}>
            <CornerDownLeft className="w-6 h-6 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}