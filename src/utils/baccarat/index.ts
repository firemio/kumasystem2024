export {
  calculateHandValue,
  isNatural
} from './core/handValue';

export {
  calculateBaccaratResult,
  getUsedCardsCount
} from './core/gameLogic';

export {
  isFifthCardPlayer,
  isSixthCardPlayer
} from './core/cardPosition';

export {
  shouldPlayerDraw,
  shouldBankerDraw
} from './drawingRules';

export type { GameResult } from './types';