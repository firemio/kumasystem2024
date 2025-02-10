import { describe, it, expect } from 'vitest';
import { isFifthCardPlayer, isSixthCardPlayer } from '../cardPosition';

describe('カード位置の判定', () => {
  describe('isFifthCardPlayer', () => {
    it('5枚目のカードがプレイヤーのものかを正しく判定する', () => {
      // プレイヤー: 5 (2,3), バンカー: 7 (3,4) → プレイヤーが引く
      expect(isFifthCardPlayer([2, 3, 3, 4])).toBe(true);

      // プレイヤー: 6 (3,3), バンカー: 5 (2,3) → バンカーが引く
      expect(isFifthCardPlayer([3, 2, 3, 3])).toBe(false);

      // プレイヤー: 8 (4,4), バンカー: 7 (3,4) → 誰も引かない
      expect(isFifthCardPlayer([4, 3, 4, 4])).toBe(false);
    });

    it('無効な入力の場合はfalseを返す', () => {
      expect(isFifthCardPlayer([])).toBe(false);
      expect(isFifthCardPlayer([1, 2])).toBe(false);
      expect(isFifthCardPlayer([1, 2, 3])).toBe(false);
    });
  });

  describe('isSixthCardPlayer', () => {
    it('6枚目のカードがプレイヤーのものかを正しく判定する', () => {
      // プレイヤー: 5 (2,3) → 8 (2,3,3), バンカー: 5 (2,3) → バンカーが引く
      expect(isSixthCardPlayer([2, 2, 3, 3, 3])).toBe(false);

      // プレイヤー: 5 (2,3) → 8 (2,3,3), バンカー: 6 (3,3) → バンカーは引かない
      expect(isSixthCardPlayer([2, 3, 3, 3, 3])).toBe(false);
    });

    it('無効な入力の場合はfalseを返す', () => {
      expect(isSixthCardPlayer([])).toBe(false);
      expect(isSixthCardPlayer([1, 2, 3, 4])).toBe(false);
      expect(isSixthCardPlayer([1, 2, 3, 4, 5])).toBe(false);
    });
  });
});
