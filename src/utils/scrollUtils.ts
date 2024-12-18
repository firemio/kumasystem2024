import { Position } from '../types';

export function scrollToCursor(cursor: Position): void {
  if (window.innerWidth <= 640) { // Only scroll on mobile devices
    setTimeout(() => {
      const cell = document.querySelector(`[data-x="${cursor.x}"][data-y="${cursor.y}"]`);
      if (cell) {
        cell.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest'
        });
      }
    }, 50); // Small delay to ensure DOM is updated
  }
}