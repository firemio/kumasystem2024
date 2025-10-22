import { calculateBaccaratResult } from './core';
import { calculateHandValue } from './core/handValue';
import { shouldPlayerDraw, shouldBankerDraw } from './core/gameLogic';

export interface BaccaratWarnings {
  bankerSixWin: boolean;
  playerPair: boolean;
  bankerPair: boolean;
}

/**
 * バッカラの警告をチェックする
 * @param numbers カードの数字配列
 * @returns 警告情報
 */
export function checkBaccaratWarnings(numbers: number[]): BaccaratWarnings {
  const warnings: BaccaratWarnings = {
    bankerSixWin: false,
    playerPair: false,
    bankerPair: false,
  };

  if (!numbers || numbers.length < 4) {
    return warnings;
  }

  const result = calculateBaccaratResult(numbers);
  
  // プレイヤーペアのチェック（numbers[0]とnumbers[2]が同じ数字）
  const playerCard1 = numbers[0] === 0 ? 0 : numbers[0];
  const playerCard2 = numbers[2] === 0 ? 0 : numbers[2];
  warnings.playerPair = playerCard1 === playerCard2;

  // バンカーペアのチェック（numbers[1]とnumbers[3]が同じ数字）
  const bankerCard1 = numbers[1] === 0 ? 0 : numbers[1];
  const bankerCard2 = numbers[3] === 0 ? 0 : numbers[3];
  warnings.bankerPair = bankerCard1 === bankerCard2;

  // Bankerが6で勝つかチェック
  if (result === 'Banker') {
    const playerInitial = calculateHandValue([numbers[0], numbers[2]]);
    const bankerInitial = calculateHandValue([numbers[1], numbers[3]]);
    
    let bankerFinal = bankerInitial;
    
    // プレイヤーが3枚目を引く場合
    if (shouldPlayerDraw(playerInitial) && numbers.length >= 5) {
      // バンカーも3枚目を引く場合
      if (shouldBankerDraw(bankerInitial, numbers[4]) && numbers.length >= 6) {
        bankerFinal = calculateHandValue([numbers[1], numbers[3], numbers[5]]);
      }
    } else if (shouldBankerDraw(bankerInitial) && numbers.length >= 5) {
      // プレイヤーが引かずにバンカーだけ引く場合
      bankerFinal = calculateHandValue([numbers[1], numbers[3], numbers[4]]);
    }
    
    warnings.bankerSixWin = bankerFinal === 6;
  }

  return warnings;
}

/**
 * 警告があるかどうかをチェック
 */
export function hasWarnings(warnings: BaccaratWarnings): boolean {
  return warnings.bankerSixWin || warnings.playerPair || warnings.bankerPair;
}

/**
 * 警告メッセージを取得
 */
export function getWarningMessages(warnings: BaccaratWarnings): string[] {
  const messages: string[] = [];
  
  if (warnings.playerPair) {
    messages.push('PP');
  }
  
  if (warnings.bankerPair) {
    messages.push('BP');
  }
  
  if (warnings.bankerSixWin) {
    messages.push('B6');
  }
  
  return messages;
}

/**
 * 警告の完全な名前を取得
 */
export function getWarningFullNames(warnings: BaccaratWarnings): string[] {
  const messages: string[] = [];
  
  if (warnings.playerPair) {
    messages.push('プレイヤーペア');
  }
  
  if (warnings.bankerPair) {
    messages.push('バンカーペア');
  }
  
  if (warnings.bankerSixWin) {
    messages.push('バンカー6で勝ち');
  }
  
  return messages;
}
