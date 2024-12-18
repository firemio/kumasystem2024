import React from 'react';
import { ColorMode } from '../types';

interface ColorModeIndicatorProps {
  mode: ColorMode;
}

export function ColorModeIndicator({ mode }: ColorModeIndicatorProps) {
  return (
    <div className="relative group ml-4">
      <span className={`font-medium ${mode === 'red' ? 'text-red-500' : 'text-green-400'}`}>
        入力色: {mode === 'red' ? '赤' : '緑'}
      </span>
      <div className="absolute hidden group-hover:block top-full left-0 mt-1 p-2 bg-green-900 text-green-400 text-xs rounded shadow-lg whitespace-nowrap">
        *キーで切替
      </div>
    </div>
  );
}