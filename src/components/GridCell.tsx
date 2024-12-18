import React from 'react';
import { Position, CellData } from '../types';

interface GridCellProps {
  x: number;
  y: number;
  cell: CellData;
  cursor: Position;
  referencePoint: Position | null;
  onClick: () => void;
}

export function GridCell({ x, y, cell, cursor, referencePoint, onClick }: GridCellProps) {
  const isCursor = cursor.x === x && cursor.y === y;
  const isReference = referencePoint?.x === x && referencePoint?.y === y;

  return (
    <div
      data-x={x}
      data-y={y}
      onClick={onClick}
      className={`
        aspect-square flex items-center justify-center relative cursor-pointer text-sm
        border-r border-b border-green-500 last:border-r-0
        ${isCursor ? 'bg-green-900' : ''}
        ${isReference ? 'bg-blue-900' : 'bg-black'}
        hover:bg-yellow-900/50
        touch-manipulation
      `}
      style={{
        minWidth: '16px',
        minHeight: '16px'
      }}
    >
      <span className={`
        ${cell.isRed ? 'text-red-500' : 'text-green-400'}
        ${cell.isBold ? 'font-bold' : ''}
        ${isReference ? 'z-10' : ''}
        select-none
      `}>
        {cell.displayValue || cell.value}
      </span>
    </div>
  );
}