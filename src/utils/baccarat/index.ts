// Hand evaluation
export {
  calculateHandValue,
  isNatural
} from './core/handValue';

// Game logic
export {
  calculateBaccaratResult,
  getUsedCardsCount,
  shouldPlayerDraw,
  shouldBankerDraw
} from './core/gameLogic';

// Card position
export {
  isFifthCardPlayer,
  isSixthCardPlayer
} from './core/cardPosition';

// Constants
export {
  NATURAL_THRESHOLD,
  PLAYER_DRAW_THRESHOLD,
  BANKER_MANDATORY_DRAW,
  MAX_HAND_VALUE
} from './core/constants';

// Types
export type { GameResult, BaccaratGame, BaccaratHand } from './types';