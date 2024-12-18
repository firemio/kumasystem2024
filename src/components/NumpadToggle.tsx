import React from 'react';
import { Keyboard } from 'lucide-react';

interface NumpadToggleProps {
  isVisible: boolean;
  onToggle: () => void;
}

export function NumpadToggle({ isVisible, onToggle }: NumpadToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-4 left-4 z-50 p-3 bg-black border-2 border-green-500 rounded-lg 
        hover:bg-green-900 transition-colors"
      title={isVisible ? 'テンキーを非表示' : 'テンキーを表示'}
    >
      <Keyboard 
        className={`w-6 h-6 text-green-400 transition-transform duration-300 ${isVisible ? 'rotate-180' : ''}`} 
      />
    </button>
  );
}