import { Position } from '../types';

export function scrollToCursor(cursor: Position): void {
  // すべてのデバイスでスクロールを行う
  setTimeout(() => {
    const cell = document.querySelector(`[data-x="${cursor.x}"][data-y="${cursor.y}"]`);
    if (cell) {
      cell.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, 50); // Small delay to ensure DOM is updated
}