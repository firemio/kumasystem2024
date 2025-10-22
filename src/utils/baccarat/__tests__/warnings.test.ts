import { describe, it, expect } from 'vitest';
import { checkBaccaratWarnings, hasWarnings, getWarningMessages } from '../warnings';

describe('Baccarat Warnings', () => {
  describe('checkBaccaratWarnings', () => {
    it('プレイヤーペアを検出する', () => {
      // プレイヤーカード: 5, 5 (同じ数字)
      // バンカーカード: 3, 4
      const warnings = checkBaccaratWarnings([5, 3, 5, 4]);
      expect(warnings.playerPair).toBe(true);
      expect(warnings.bankerPair).toBe(false);
      expect(warnings.bankerSixWin).toBe(false);
    });

    it('バンカーペアを検出する', () => {
      // プレイヤーカード: 5, 3
      // バンカーカード: 7, 7 (同じ数字)
      const warnings = checkBaccaratWarnings([5, 7, 3, 7]);
      expect(warnings.playerPair).toBe(false);
      expect(warnings.bankerPair).toBe(true);
      expect(warnings.bankerSixWin).toBe(false);
    });

    it('プレイヤーペアとバンカーペア両方を検出する', () => {
      // プレイヤーカード: 4, 4
      // バンカーカード: 8, 8
      const warnings = checkBaccaratWarnings([4, 8, 4, 8]);
      expect(warnings.playerPair).toBe(true);
      expect(warnings.bankerPair).toBe(true);
    });

    it('Bankerが6で勝つことを検出する (初期値で6)', () => {
      // プレイヤー: 2 + 3 = 5
      // バンカー: 3 + 3 = 6 (勝ち)
      const warnings = checkBaccaratWarnings([2, 3, 3, 3]);
      expect(warnings.bankerSixWin).toBe(true);
    });

    it('Bankerが6で勝つことを検出する (3枚目で6)', () => {
      // プレイヤー: 1 + 2 = 3 → +2 = 5
      // バンカー: 2 + 2 = 4 → +2 = 6 (勝ち)
      const warnings = checkBaccaratWarnings([1, 2, 2, 2, 2, 2]);
      expect(warnings.bankerSixWin).toBe(true);
    });

    it('Bankerが6以外で勝つ場合は警告なし', () => {
      // プレイヤー: 2 + 2 = 4
      // バンカー: 3 + 4 = 7 (勝ち)
      const warnings = checkBaccaratWarnings([2, 3, 2, 4]);
      expect(warnings.bankerSixWin).toBe(false);
    });

    it('Playerが勝つ場合は警告なし', () => {
      // プレイヤー: 4 + 4 = 8 (勝ち)
      // バンカー: 3 + 3 = 6
      const warnings = checkBaccaratWarnings([4, 3, 4, 3]);
      expect(warnings.bankerSixWin).toBe(false);
    });

    it('カードが4枚未満の場合は警告なし', () => {
      const warnings = checkBaccaratWarnings([1, 2, 3]);
      expect(warnings.playerPair).toBe(false);
      expect(warnings.bankerPair).toBe(false);
      expect(warnings.bankerSixWin).toBe(false);
    });
  });

  describe('hasWarnings', () => {
    it('警告がある場合はtrueを返す', () => {
      expect(hasWarnings({ playerPair: true, bankerPair: false, bankerSixWin: false })).toBe(true);
      expect(hasWarnings({ playerPair: false, bankerPair: true, bankerSixWin: false })).toBe(true);
      expect(hasWarnings({ playerPair: false, bankerPair: false, bankerSixWin: true })).toBe(true);
    });

    it('警告がない場合はfalseを返す', () => {
      expect(hasWarnings({ playerPair: false, bankerPair: false, bankerSixWin: false })).toBe(false);
    });
  });

  describe('getWarningMessages', () => {
    it('正しい警告メッセージを返す (短縮形)', () => {
      const messages1 = getWarningMessages({ playerPair: true, bankerPair: false, bankerSixWin: false });
      expect(messages1).toEqual(['PP']);

      const messages2 = getWarningMessages({ playerPair: false, bankerPair: true, bankerSixWin: false });
      expect(messages2).toEqual(['BP']);

      const messages3 = getWarningMessages({ playerPair: false, bankerPair: false, bankerSixWin: true });
      expect(messages3).toEqual(['B6']);

      const messages4 = getWarningMessages({ playerPair: true, bankerPair: true, bankerSixWin: true });
      expect(messages4).toEqual(['PP', 'BP', 'B6']);
    });

    it('警告がない場合は空の配列を返す', () => {
      const messages = getWarningMessages({ playerPair: false, bankerPair: false, bankerSixWin: false });
      expect(messages).toEqual([]);
    });
  });
});
