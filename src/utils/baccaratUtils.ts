import { GameResult } from '../types/gameBox';

// カードの点数を計算
function calculateCardValue(card: number): number {
  return card === 0 ? 0 : card % 10;  // 0 = P
}

// 手札の合計を計算（1桁になるように）
function calculateHandTotal(cards: number[]): number {
  return cards.reduce((sum, card) => (sum + calculateCardValue(card)) % 10, 0);
}

// プレイヤーが3枚目を引くかどうか
function shouldPlayerDraw(playerTotal: number): boolean {
  return playerTotal <= 5;
}

// バンカーが3枚目を引くかどうか
function shouldBankerDraw(bankerTotal: number, playerThirdCard: number | null): boolean {
  if (bankerTotal <= 2) return true;
  if (bankerTotal >= 7) return false;
  
  // プレイヤーが3枚目を引かなかった場合
  if (playerThirdCard === null) {
    return bankerTotal <= 5;
  }

  // バンカーの詳細な条件判定
  switch (bankerTotal) {
    case 3:
      return playerThirdCard !== 8;
    case 4:
      return playerThirdCard >= 2 && playerThirdCard <= 7;
    case 5:
      return playerThirdCard >= 4 && playerThirdCard <= 7;
    case 6:
      return playerThirdCard === 6 || playerThirdCard === 7;
    default:
      return false;
  }
}

// 必要なカード枚数を計算
export function getUsedCardsCount(numbers: number[]): number {
  if (!numbers || numbers.length < 4) return 0;

  const playerTotal = calculateHandTotal([numbers[0], numbers[2]]);
  const bankerTotal = calculateHandTotal([numbers[1], numbers[3]]);

  // ナチュラル8/9の場合は4枚で終了
  if (playerTotal >= 8 || bankerTotal >= 8) {
    return 4;
  }

  // プレイヤーが3枚目を引く場合
  if (shouldPlayerDraw(playerTotal)) {
    // プレイヤーの3枚目がある場合
    if (numbers.length >= 5) {
      // バンカーが3枚目を引くかチェック
      return shouldBankerDraw(bankerTotal, numbers[4]) ? 6 : 5;
    }
    return 5;
  }

  // プレイヤーが引かず、バンカーが引く場合
  return shouldBankerDraw(bankerTotal, null) ? 5 : 4;
}

// バカラの勝敗を判定
export function calculateBaccaratResult(numbers: number[]): GameResult | null {
  if (!numbers || numbers.length < 4) return null;

  const requiredCards = getUsedCardsCount(numbers);
  if (numbers.length < requiredCards) return null;

  const playerInitial = calculateHandTotal([numbers[0], numbers[2]]);
  const bankerInitial = calculateHandTotal([numbers[1], numbers[3]]);

  // ナチュラル8/9の判定
  if (playerInitial >= 8 || bankerInitial >= 8) {
    if (playerInitial > bankerInitial) return 'Player';
    if (bankerInitial > playerInitial) return 'Banker';
    return 'Draw';
  }

  let playerFinal = playerInitial;
  let bankerFinal = bankerInitial;

  // プレイヤーの3枚目
  if (shouldPlayerDraw(playerInitial) && numbers.length >= 5) {
    playerFinal = calculateHandTotal([numbers[0], numbers[2], numbers[4]]);
    
    // バンカーの3枚目
    if (shouldBankerDraw(bankerInitial, numbers[4]) && numbers.length >= 6) {
      bankerFinal = calculateHandTotal([numbers[1], numbers[3], numbers[5]]);
    }
  } else if (shouldBankerDraw(bankerInitial, null) && numbers.length >= 5) {
    // プレイヤーが引かずバンカーが引く場合
    bankerFinal = calculateHandTotal([numbers[1], numbers[3], numbers[4]]);
  }

  // 最終的な勝敗判定
  if (playerFinal > bankerFinal) return 'Player';
  if (bankerFinal > playerFinal) return 'Banker';
  return 'Draw';
}