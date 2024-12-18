import React, { useRef } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Grid } from './components/Grid';
import { Header } from './components/Header';
import { StatusDisplay } from './components/StatusDisplay';
import { GameBoxesContainer } from './components/GameBoxes';
import { ResetButton } from './components/ResetButton';
import { VirtualNumpad, NumpadToggle } from './components/VirtualNumpad';
import { usePersistedState } from './hooks/usePersistedState';
import { useGameState } from './hooks/useGameState';
import { useKeyboardInput } from './hooks/useKeyboardInput';
import { Position, GridData, ColorMode } from './types';
import { GameBoxType } from './types/gameBox';
import { INITIAL_GRID, DEFAULT_START_POSITION } from './constants/grid';
import { countInputNumbers } from './utils/gridUtils';
import * as handlers from './handlers/inputHandlers';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = usePersistedState<GridData>('baccarat-grid', INITIAL_GRID);
  const [cursor, setCursor] = usePersistedState<Position>('baccarat-cursor', { x: DEFAULT_START_POSITION, y: 0 });
  const [colorMode, setColorMode] = usePersistedState<ColorMode>('baccarat-color-mode', 'black');
  const [isNumpadVisible, setIsNumpadVisible] = usePersistedState<boolean>('baccarat-numpad-visible', true);
  
  const {
    position: referencePoint,
    gameNumber,
    selectedBox,
    setSelectedBox,
    updatePosition: setReferencePoint,
    advanceGame,
    reset: resetGameState
  } = useGameState();

  const { focus } = useKeyboardInput({
    containerRef,
    grid,
    cursor,
    setCursor,
    setGrid,
    setReferencePoint,
    colorMode,
    setColorMode,
  });

  const handleBoxSelect = (boxId: GameBoxType, usedCards: number) => {
    if (referencePoint && usedCards > 0) {
      advanceGame(usedCards);
      toast.success(`${boxId}の結果を確認しました`, {
        duration: 2000,
        position: 'top-center',
        className: 'bg-green-900 text-green-400 border border-green-500',
      });
    }
  };

  const handleReset = () => {
    setGrid(INITIAL_GRID);
    setCursor({ x: DEFAULT_START_POSITION, y: 0 });
    setColorMode('black');
    resetGameState();
    setTimeout(focus, 0);
  };

  return (
    <div className="min-h-screen bg-black p-2 sm:p-4 pb-80">
      <Toaster />
      <div 
        ref={containerRef}
        className="bg-black rounded-lg shadow-sm max-w-[98vw] mx-auto border border-green-500 relative outline-none"
        tabIndex={0}
      >
        <ResetButton onReset={handleReset} />
        <div className="p-2 sm:p-4">
          <Header cardCount={countInputNumbers(grid)} colorMode={colorMode} />
          <div className="border border-green-500 rounded">
            <Grid
              grid={grid}
              cursor={cursor}
              referencePoint={referencePoint}
              onCellClick={(x, y) => handlers.handleCellClick(x, y, grid, setCursor)}
            />
          </div>
          <StatusDisplay gameNumber={gameNumber} position={referencePoint} />
          <GameBoxesContainer 
            grid={grid}
            referencePoint={referencePoint}
            onBoxSelect={handleBoxSelect}
            gameNumber={gameNumber}
            selectedBox={selectedBox}
            setSelectedBox={setSelectedBox}
          />
        </div>
      </div>
      <NumpadToggle 
        isVisible={isNumpadVisible} 
        onToggle={() => setIsNumpadVisible(prev => !prev)} 
      />
      <VirtualNumpad
        onNumberPress={(num) => handlers.handleNumberPress(num, grid, cursor, colorMode, setGrid, setCursor)}
        onArrowPress={(direction) => handlers.handleArrowPress(direction, cursor, setCursor)}
        onDelete={() => handlers.handleDelete(grid, cursor, setGrid, setCursor)}
        onBackspace={() => handlers.handleBackspace(grid, cursor, setGrid, setCursor)}
        onEnter={() => setReferencePoint(cursor)}
        onColorToggle={() => handlers.handleColorToggle(setColorMode)}
        onSpecialChar={(char) => handlers.handleSpecialChar(char, grid, cursor, colorMode, setGrid, setCursor)}
        colorMode={colorMode}
        isVisible={isNumpadVisible}
      />
    </div>
  );
}