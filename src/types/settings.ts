export interface GameSettings {
  warnings: {
    playerPair: boolean;
    bankerPair: boolean;
    bankerSixWin: boolean;
  };
  gameBoxes: {
    A: boolean;
    B: boolean;
    C: boolean;
    D: boolean;
    E: boolean;
    F: boolean;
    G: boolean;
  };
}

export const DEFAULT_SETTINGS: GameSettings = {
  warnings: {
    playerPair: true,
    bankerPair: true,
    bankerSixWin: true,
  },
  gameBoxes: {
    A: true,
    B: true,
    C: true,
    D: true,
    E: true,
    F: true,
    G: true,
  },
};
