export function calculateHandValue(cards: number[]): number {
  if (!cards || !cards.length) return 0;
  // 10（P）は0として扱う
  const sum = cards.reduce((acc, card) => {
    const value = card === 10 ? 0 : card;
    return acc + value;
  }, 0);
  return sum % 10;
}

export function isNatural(value: number): boolean {
  return value >= 8;
}