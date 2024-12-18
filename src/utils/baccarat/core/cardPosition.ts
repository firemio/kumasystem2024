export function isFifthCardPlayer(numbers: number[]): boolean {
  if (!numbers || numbers.length < 4) return false;
  
  const playerInitial = numbers[0] + numbers[2];
  const initialValue = playerInitial % 10;
  return initialValue <= 5;
}

export function isSixthCardPlayer(numbers: number[]): boolean {
  if (!numbers || numbers.length < 5) return false;
  
  const playerInitial = numbers[0] + numbers[2];
  const bankerInitial = numbers[1] + numbers[3];
  const playerValue = playerInitial % 10;
  const bankerValue = bankerInitial % 10;
  
  if (playerValue > 5) return false;
  
  const playerThirdCard = numbers[4];
  return !shouldBankerDraw(bankerValue, playerThirdCard);
}

function shouldBankerDraw(bankerValue: number, playerThirdCard: number): boolean {
  if (bankerValue <= 2) return true;
  if (bankerValue >= 7) return false;

  switch (bankerValue) {
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