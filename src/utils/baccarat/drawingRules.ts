export function shouldPlayerDraw(value: number): boolean {
  return value <= 5;
}

export function shouldBankerDraw(
  bankerValue: number,
  playerThirdCard?: number
): boolean {
  if (bankerValue >= 7) return false;
  
  // If player didn't draw a third card
  if (playerThirdCard === undefined) {
    return bankerValue <= 5;
  }

  // Banker drawing rules based on player's third card
  switch (bankerValue) {
    case 0:
    case 1:
    case 2:
      return true;
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