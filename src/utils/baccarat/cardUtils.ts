export function calculateHandValue(cards: number[]): number {
  if (!cards.length) return 0;
  const sum = cards.reduce((acc, num) => acc + num, 0);
  return sum % 10;
}

export function hasNatural(value: number): boolean {
  return value >= 8;
}

export function createInitialHand(firstCard: number, secondCard: number): number[] {
  return [firstCard, secondCard];
}