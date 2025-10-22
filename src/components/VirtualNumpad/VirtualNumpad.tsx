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
      flex items-center justify-center rounded-lg
      border-2 border-green-500 ${textColor}
      ${hoverColor} ${activeColor}
      transition-colors font-medium text-lg sm:text-xl
      touch-manipulation
    `;
  };

  const buttonClass = getButtonClass();

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto bg-black border-2 border-green-500 rounded-xl p-2 sm:p-4 shadow-lg">
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2 max-w-md mx-auto">
        {/* Navigation Controls */}
        <div className="col-span-4 grid grid-cols-3 gap-1.5 sm:gap-2 mb-2">
          <button className={buttonClass} onClick={() => onArrowPress('left')}>
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <div className="grid grid-rows-2 gap-1.5 sm:gap-2">
            <button className={buttonClass} onClick={() => onArrowPress('up')}>
              <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button className={buttonClass} onClick={() => onArrowPress('down')}>
              <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
          <button className={buttonClass} onClick={() => onArrowPress('right')}>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Number Pad */}
        <div className="col-span-4 grid grid-cols-3 gap-1.5 sm:gap-2">
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
        <div className="col-span-4 grid grid-cols-3 gap-1.5 sm:gap-2">
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
        <div className="col-span-4 grid grid-cols-3 gap-1.5 sm:gap-2">
          <button
            className={getButtonClass(true)}
            onClick={onColorToggle}
          >
            *
          </button>
          <button className={buttonClass} onClick={onBackspace}>
            <Delete className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button className={buttonClass} onClick={onEnter}>
            <CornerDownLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}