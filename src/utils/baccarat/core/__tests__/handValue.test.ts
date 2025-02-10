import { describe, it, expect } from 'vitest';
import { calculateHandValue, isNatural } from '../handValue';

describe('バカラの手札評価', () => {
  describe('calculateHandValue', () => {
    it('空の配列や無効な入力の場合は0を返す', () => {
      expect(calculateHandValue([])).toBe(0);
      expect(calculateHandValue(undefined as any)).toBe(0);
      expect(calculateHandValue(null as any)).toBe(0);
    });

    it('単一のカードの値を正しく計算する', () => {
      expect(calculateHandValue([1])).toBe(1);
      expect(calculateHandValue([5])).toBe(5);
      expect(calculateHandValue([9])).toBe(9);
      expect(calculateHandValue([0])).toBe(0);
    });

    it('複数のカードの合計を正しく計算する', () => {
      expect(calculateHandValue([1, 2])).toBe(3);
      expect(calculateHandValue([4, 5])).toBe(9);
      expect(calculateHandValue([6, 7])).toBe(3); // 13 % 10 = 3
      expect(calculateHandValue([9, 9])).toBe(8); // 18 % 10 = 8
    });

    it('3枚のカードの合計を正しく計算する', () => {
      expect(calculateHandValue([1, 2, 3])).toBe(6);
      expect(calculateHandValue([4, 5, 6])).toBe(5); // 15 % 10 = 5
      expect(calculateHandValue([7, 8, 9])).toBe(4); // 24 % 10 = 4
    });

    it('0（ジョーカー）を含む計算を正しく処理する', () => {
      expect(calculateHandValue([0, 1])).toBe(1);
      expect(calculateHandValue([0, 5])).toBe(5);
      expect(calculateHandValue([1, 0, 2])).toBe(3);
    });
  });

  describe('isNatural', () => {
    it('8と9はナチュラルとして判定される', () => {
      expect(isNatural(8)).toBe(true);
      expect(isNatural(9)).toBe(true);
    });

    it('7以下の値はナチュラルとして判定されない', () => {
      expect(isNatural(0)).toBe(false);
      expect(isNatural(5)).toBe(false);
      expect(isNatural(7)).toBe(false);
    });
  });
});
