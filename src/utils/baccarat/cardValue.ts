import { MAX_HAND_VALUE } from './constants';

export function calculateCardValue(card: number): number {
  if (card < 0) throw new Error('Invalid card value: negative number');
  return card === 0 ? 0 : card % 10;  // 0 = P
}

export function calculateHandTotal(cards: number[]): number {
  if (!Array.isArray(cards)) throw new Error('Invalid input: cards must be an array');
  return cards.reduce((sum, card) => {
    const value = calculateCardValue(card);
    return (sum + value) % MAX_HAND_VALUE;
  }, 0);
}