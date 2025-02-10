import { shouldBankerDraw } from '../drawingRules';

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