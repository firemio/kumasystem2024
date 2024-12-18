import React from 'react';
import { ColorMode } from '../types';
import { CardCounter } from './CardCounter';
import { ColorModeIndicator } from './ColorModeIndicator';

interface HeaderProps {
  cardCount: number;
  colorMode: ColorMode;
}

export function Header({ cardCount, colorMode }: HeaderProps) {
  return (
    <div className="flex items-center text-sm mb-2 text-green-500">
      <CardCounter count={cardCount} />
      <ColorModeIndicator mode={colorMode} />
    </div>
  );
}