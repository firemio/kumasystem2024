import React from 'react';

interface CardCounterProps {
  count: number;
}

export function CardCounter({ count }: CardCounterProps) {
  return (
    <span className="font-medium text-green-400">
      カード入力情報 {count} 枚
    </span>
  );
}