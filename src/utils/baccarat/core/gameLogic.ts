import { GameResult } from '../types';
import { calculateHandValue, isNatural } from './handValue';

export function shouldPlayerDraw(value: number): boolean {
  // プレイヤーは0-5の場合のみ3枚目を引く
  // 6-7の場合は引かない（8-9はナチュラルで既に処理済み）
  return value >= 0 && value <= 5;
}

export function shouldBankerDraw(
  bankerValue: number,
  playerThirdCard?: number
): boolean {
  // 1. バンカーが7以上の場合は絶対に引かない
  if (bankerValue >= 7) return false;
  
  // 2. バンカーが0,1,2の場合は必ず引く
  if (bankerValue <= 2) return true;

  // 3. プレイヤーが3枚目を引かなかった場合
  if (playerThirdCard === undefined) {
    return bankerValue <= 5;  // バンカーは5以下なら引く
  }

  // 4. プレイヤーの3枚目の値によってバンカーの引くルールが変わる
  switch (bankerValue) {
    case 3:  // バンカーが3の場合、プレイヤーの3枚目が8以外なら引く
      return playerThirdCard !== 8;
    case 4:  // バンカーが4の場合、プレイヤーの3枚目が2-7なら引く
      return playerThirdCard >= 2 && playerThirdCard <= 7;
    case 5:  // バンカーが5の場合、プレイヤーの3枚目が4-7なら引く
      return playerThirdCard >= 4 && playerThirdCard <= 7;
    case 6:  // バンカーが6の場合、プレイヤーの3枚目が6,7なら引く
      return playerThirdCard === 6 || playerThirdCard === 7;
    default:
      return false;
  }
}

export function getRequiredCardsCount(numbers: number[]): number {
  if (!numbers || numbers.length < 4) return 0;

  // Convert P (represented as 0) to actual 0 for calculations
  const processedNumbers = numbers.map(n => n === 0 ? 0 : n);

  const playerValue = calculateHandValue([processedNumbers[0], processedNumbers[2]]);
  const bankerValue = calculateHandValue([processedNumbers[1], processedNumbers[3]]);

  // Natural 8 or 9
  if (isNatural(playerValue) || isNatural(bankerValue)) {
    return 4;
  }

  // Check if player should draw
  if (shouldPlayerDraw(playerValue)) {
    if (shouldBankerDraw(bankerValue, processedNumbers[4])) {
      return 6;
    }
    return 5;
  }

  // Check if banker should draw
  if (shouldBankerDraw(bankerValue, undefined)) {
    return 5;
  }

  return 4;
}

export function calculateBaccaratResult(numbers: number[]): GameResult | null {
  if (!numbers || numbers.length < 4) return null;

  const requiredCards = getRequiredCardsCount(numbers);
  if (numbers.length < requiredCards) return null;

  const playerInitial = calculateHandValue([numbers[0], numbers[2]]);
  const bankerInitial = calculateHandValue([numbers[1], numbers[3]]);

  if (isNatural(playerInitial) || isNatural(bankerInitial)) {
    if (playerInitial > bankerInitial) return 'Player';
    if (bankerInitial > playerInitial) return 'Banker';
    return 'Draw';
  }

  let playerFinal = playerInitial;
  let bankerFinal = bankerInitial;

  if (shouldPlayerDraw(playerInitial) && numbers.length >= 5) {
    playerFinal = calculateHandValue([numbers[0], numbers[2], numbers[4]]);
    
    if (shouldBankerDraw(bankerInitial, numbers[4]) && numbers.length >= 6) {
      bankerFinal = calculateHandValue([numbers[1], numbers[3], numbers[5]]);
    }
  } else if (shouldBankerDraw(bankerInitial) && numbers.length >= 5) {
    bankerFinal = calculateHandValue([numbers[1], numbers[3], numbers[4]]);
  }

  if (playerFinal > bankerFinal) return 'Player';
  if (bankerFinal > playerFinal) return 'Banker';
  return 'Draw';
}

export function getUsedCardsCount(numbers: number[]): number {
  const baseCount = getRequiredCardsCount(numbers);
  
  if (!numbers || numbers.length === 0) {
    return baseCount;
  }

  return baseCount;
}