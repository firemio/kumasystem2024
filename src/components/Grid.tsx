import React from 'react';
import { GridCell } from './GridCell';
import { Position, GridData } from '../types';
import { GRID_COLS } from '../constants/grid';

interface GridProps {
  grid: GridData;
  cursor: Position;
  referencePoint: Position | null;
  onCellClick: (x: number, y: number) => void;
}

export function Grid({ grid, cursor, referencePoint, onCellClick }: GridProps) {
  return (
    <div 
      className="w-full overflow-x-auto touch-pan-x relative scrollbar-cyber"
      style={{ WebkitOverflowScrolling: 'touch' }} // Enable smooth scrolling on iOS
    >
      <div className="min-w-[800px] relative">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-green-500/20 to-transparent opacity-50 sm:hidden" />
        <div 
          className="grid border-collapse bg-black"
          style={{ 
            gridTemplateColumns: `repeat(${GRID_COLS}, minmax(16px, 1fr))`,
            width: '100%',
          }}
        >
          {grid.map((row, y) => 
            row.map((cell, x) => (
              <GridCell
                key={`${x}-${y}`}
                x={x}
                y={y}
                cell={cell}
                cursor={cursor}
                referencePoint={referencePoint}
                onClick={() => onCellClick(x, y)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}