import { Settings } from 'lucide-react';

interface SettingsToggleProps {
  onClick: () => void;
}

export function SettingsToggle({ onClick }: SettingsToggleProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 w-12 h-12 bg-green-900 border-2 border-green-500 rounded-lg flex items-center justify-center hover:bg-green-800 transition-colors shadow-lg z-50"
      aria-label="設定を開く"
    >
      <Settings className="w-6 h-6 text-green-400" />
    </button>
  );
}
