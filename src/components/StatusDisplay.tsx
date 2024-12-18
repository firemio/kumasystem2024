import React from 'react';
import { Position } from '../types';

interface StatusDisplayProps {
  gameNumber: number;
  position: Position;
}

export function StatusDisplay({ gameNumber, position }: StatusDisplayProps) {
  const displayPosition = position.x + 1 + (position.y * 52);

  return (
    <div className="mt-4 text-sm border-t border-green-500 pt-4 text-green-500">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-green-600">ゲーム数:</span>{' '}
          <span className="font-medium">{gameNumber}</span>
        </div>
        <div>
          <span className="text-green-600">開始位置:</span>{' '}
          <span className="font-medium">{displayPosition}</span>
        </div>
      </div>
    </div>
  );
}