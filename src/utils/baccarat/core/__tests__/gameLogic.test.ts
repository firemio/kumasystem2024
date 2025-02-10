import { describe, it, expect } from 'vitest';
import {
  calculateBaccaratResult,
  shouldPlayerDraw,
  shouldBankerDraw,
  getRequiredCardsCount
} from '../gameLogic';

describe('Baccarat Game Logic', () => {
  describe('shouldPlayerDraw', () => {
    it('should draw when value is 0-5', () => {
      expect(shouldPlayerDraw(0)).toBe(true);
      expect(shouldPlayerDraw(3)).toBe(true);
      expect(shouldPlayerDraw(5)).toBe(true);
    });

    it('should not draw when value is 6-9', () => {
      expect(shouldPlayerDraw(6)).toBe(false);
      expect(shouldPlayerDraw(7)).toBe(false);
      expect(shouldPlayerDraw(8)).toBe(false);
      expect(shouldPlayerDraw(9)).toBe(false);
    });
  });

  describe('shouldBankerDraw', () => {
    it('should always draw when value is 0-2', () => {
      expect(shouldBankerDraw(0)).toBe(true);
      expect(shouldBankerDraw(1)).toBe(true);
      expect(shouldBankerDraw(2)).toBe(true);
    });

    it('should never draw when value is 7-9', () => {
      expect(shouldBankerDraw(7)).toBe(false);
      expect(shouldBankerDraw(8)).toBe(false);
      expect(shouldBankerDraw(9)).toBe(false);
    });

    it('should follow complex rules when value is 3-6', () => {
      // バンカーが3の場合
      expect(shouldBankerDraw(3, 8)).toBe(false);
      expect(shouldBankerDraw(3, 7)).toBe(true);

      // バンカーが4の場合
      expect(shouldBankerDraw(4, 1)).toBe(false);
      expect(shouldBankerDraw(4, 2)).toBe(true);
      expect(shouldBankerDraw(4, 7)).toBe(true);
      expect(shouldBankerDraw(4, 8)).toBe(false);

      // バンカーが5の場合
      expect(shouldBankerDraw(5, 3)).toBe(false);
      expect(shouldBankerDraw(5, 4)).toBe(true);
      expect(shouldBankerDraw(5, 7)).toBe(true);
      expect(shouldBankerDraw(5, 8)).toBe(false);

      // バンカーが6の場合
      expect(shouldBankerDraw(6, 5)).toBe(false);
      expect(shouldBankerDraw(6, 6)).toBe(true);
      expect(shouldBankerDraw(6, 7)).toBe(true);
      expect(shouldBankerDraw(6, 8)).toBe(false);
    });
  });

  describe('calculateBaccaratResult', () => {
    it('should return null for invalid input', () => {
      expect(calculateBaccaratResult([])).toBeNull();
      expect(calculateBaccaratResult([1, 2])).toBeNull();
      expect(calculateBaccaratResult([1, 2, 3])).toBeNull();
    });

    it('should handle natural wins', () => {
      // プレイヤー: 9 (4,5), バンカー: 7 (3,4)
      expect(calculateBaccaratResult([4, 3, 5, 4])).toBe('Player');
      
      // プレイヤー: 7 (3,4), バンカー: 8 (4,4)
      expect(calculateBaccaratResult([3, 4, 4, 4])).toBe('Banker');
    });

    it('should handle natural ties', () => {
      // プレイヤー: 8 (4,4), バンカー: 8 (4,4)
      expect(calculateBaccaratResult([4, 4, 4, 4])).toBe('Draw');
    });

    it('should handle player third card scenarios', () => {
      // プレイヤー: 5 (2,3) → 8 (2,3,3), バンカー: 6 (3,3)
      expect(calculateBaccaratResult([2, 3, 3, 3, 3])).toBe('Player');
    });

    it('should handle banker third card scenarios', () => {
      // プレイヤー: 6 (3,3), バンカー: 5 (2,3) → 8 (2,3,3)
      expect(calculateBaccaratResult([3, 2, 3, 3, 3])).toBe('Banker');
    });
  });

  describe('getRequiredCardsCount', () => {
    it('should require 4 cards for naturals', () => {
      // プレイヤー: 8 (4,4), バンカー: 7 (3,4)
      expect(getRequiredCardsCount([4, 3, 4, 4])).toBe(4);
    });

    it('should require 5 cards when only player draws', () => {
      // プレイヤー: 5 (2,3), バンカー: 7 (3,4)
      expect(getRequiredCardsCount([2, 3, 3, 4])).toBe(5);
    });

    it('should require 5 cards when only banker draws', () => {
      // プレイヤー: 6 (3,3), バンカー: 5 (2,3)
      expect(getRequiredCardsCount([3, 2, 3, 3])).toBe(5);
    });

    it('should require 6 cards when both draw', () => {
      // プレイヤー: 2 (1,1), バンカー: 2 (1,1) → プレイヤーが3枚目を引く
      expect(getRequiredCardsCount([1, 1, 1, 1, 3])).toBe(6);
    });
  });
});
