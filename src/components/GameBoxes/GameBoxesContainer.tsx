import React, { useState, useEffect } from 'react';
import { GameBox, GameBoxType } from '../../types/gameBox';
import { GAME_BOXES } from '../../constants/gameBoxes';
import { GameBoxDisplay } from './GameBoxDisplay';
import { Position, GridData } from '../../types';
import { getNumbersFromGrid } from '../../utils/gridUtils';
import { calculateBaccaratResult, getUsedCardsCount } from '../../utils/baccarat';

interface GameBoxesContainerProps {
  grid: GridData;
  referencePoint: Position | null;
  onBoxSelect?: (boxId: GameBoxType, usedCards: number) => void;
  gameNumber: number;
  selectedBox: string | null;
  setSelectedBox: (box: string | null) => void;
}

// ゲームボックスの更新ロジックを分離
function updateGameBox(
  box: GameBox,
  grid: GridData,
  referencePoint: Position
): GameBox {
  const [numbers, colors] = getNumbersFromGrid(grid, referencePoint, box.id);
  const result = numbers.length >= 4 ? calculateBaccaratResult(numbers) : null;
  
  return {
    ...box,
    numbers,
    colors,
    activeResult: result,
    isActive: numbers.length >= 4,
  };
}

export function GameBoxesContainer({ 
  grid, 
  referencePoint,
  onBoxSelect,
  gameNumber,
  selectedBox,
  setSelectedBox
}: GameBoxesContainerProps) {
  const [gameBoxes, setGameBoxes] = useState<GameBox[]>(
    GAME_BOXES.map(config => ({
      ...config,
      numbers: [],
      colors: [],
      activeResult: null,
      isActive: false,
    }))
  );

  useEffect(() => {
    if (!referencePoint) return;
    
    const updatedBoxes = GAME_BOXES.map(box => updateGameBox(
      { ...box, numbers: [], colors: [], activeResult: null, isActive: false },
      grid,
      referencePoint
    ));

    setGameBoxes(updatedBoxes);
  }, [grid, referencePoint, gameNumber]);

  const handleBoxSelect = (boxId: GameBoxType) => {
    setSelectedBox(boxId);
    const box = gameBoxes.find(b => b.id === boxId);
    if (box && onBoxSelect) {
      let usedCards = box.numbers.length >= 4 ? getUsedCardsCount(box.numbers) : 0;
      
      // FとGの場合は追加の移動量を加算
      if (boxId === 'F') {
        usedCards += 1;  // 通常の移動量+1（合計+2）
      } else if (boxId === 'G') {
        usedCards += 2;  // 通常の移動量+2（合計+3）
      }
      
      onBoxSelect(boxId, usedCards);
    }
  };

  // 基準点の色情報を取得
  const referenceColor = referencePoint ? grid[referencePoint.y][referencePoint.x].isRed : undefined;

  return (
    <div className="mt-4 space-y-2">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {gameBoxes.slice(0, 4).map((box) => (
          <div key={box.id}>
            <GameBoxDisplay
              box={box}
              isSelected={selectedBox === box.id}
              onSelect={() => handleBoxSelect(box.id)}
              referenceColor={referenceColor}
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {gameBoxes.slice(4).map((box) => (
          <div key={box.id}>
            <GameBoxDisplay
              box={box}
              isSelected={selectedBox === box.id}
              onSelect={() => handleBoxSelect(box.id)}
              referenceColor={referenceColor}
            />
          </div>
        ))}
      </div>
    </div>
  );
}