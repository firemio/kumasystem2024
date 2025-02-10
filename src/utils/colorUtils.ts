import { GameBoxType } from '../types/gameBox';

export function checkColorMismatch(numbers: number[], colors: boolean[], boxType: GameBoxType): boolean {
  if (numbers.length < 2) return false;

  switch (boxType) {
    case 'A':
      // Aは色違い判定の対象外
      return false;
    case 'B':
      if (numbers.length >= 2) {
        return colors[0] !== colors[1];
      }
      break;
    case 'C':
      if (numbers.length >= 3) {
        return colors[1] !== colors[2];
      }
      break;
    case 'D':
      if (numbers.length >= 4) {
        return colors[2] !== colors[3];
      }
      break;
    case 'E':
      if (numbers.length >= 6) {
        return colors[4] !== colors[5];
      }
      break;
    case 'F':
      // Check first and second cards from the starting position
      if (numbers.length >= 2) {
        return colors[0] !== colors[1];
      }
      break;
    case 'G':
      // Check first and third cards from the starting position
      if (numbers.length >= 3) {
        return colors[0] !== colors[2];
      }
      break;
  }

  return false;
}