import { X } from 'lucide-react';
import { GameSettings } from '../../types/settings';
import { GameBoxType } from '../../types/gameBox';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GameSettings;
  onSettingsChange: (settings: GameSettings) => void;
}

export function SettingsModal({ isOpen, onClose, settings, onSettingsChange }: SettingsModalProps) {
  if (!isOpen) return null;

  const toggleWarning = (key: keyof GameSettings['warnings']) => {
    onSettingsChange({
      ...settings,
      warnings: {
        ...settings.warnings,
        [key]: !settings.warnings[key],
      },
    });
  };

  const toggleGameBox = (key: GameBoxType) => {
    onSettingsChange({
      ...settings,
      gameBoxes: {
        ...settings.gameBoxes,
        [key]: !settings.gameBoxes[key],
      },
    });
  };

  const gameBoxLabels: Record<GameBoxType, string> = {
    A: 'A (4枚)',
    B: 'B (1, 2)',
    C: 'C (2, 3)',
    D: 'D (1, 3)',
    E: 'E (5, 6)',
    F: 'F (ちぎり1)',
    G: 'G (ちぎり2)',
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-green-950 border-2 border-green-500 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-green-950 border-b border-green-500 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-green-400">設定</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-green-900 rounded transition-colors"
            aria-label="閉じる"
          >
            <X className="w-6 h-6 text-green-400" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* 警告設定 */}
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-3">警告表示</h3>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-3 bg-green-900/30 rounded border border-green-500/30 hover:bg-green-900/50 cursor-pointer transition-colors">
                <span className="text-green-400">プレイヤーペア (PP)</span>
                <input
                  type="checkbox"
                  checked={settings.warnings.playerPair}
                  onChange={() => toggleWarning('playerPair')}
                  className="w-5 h-5 accent-green-500"
                />
              </label>
              <label className="flex items-center justify-between p-3 bg-green-900/30 rounded border border-green-500/30 hover:bg-green-900/50 cursor-pointer transition-colors">
                <span className="text-green-400">バンカーペア (BP)</span>
                <input
                  type="checkbox"
                  checked={settings.warnings.bankerPair}
                  onChange={() => toggleWarning('bankerPair')}
                  className="w-5 h-5 accent-green-500"
                />
              </label>
              <label className="flex items-center justify-between p-3 bg-green-900/30 rounded border border-green-500/30 hover:bg-green-900/50 cursor-pointer transition-colors">
                <span className="text-green-400">バンカー6で勝ち (B6)</span>
                <input
                  type="checkbox"
                  checked={settings.warnings.bankerSixWin}
                  onChange={() => toggleWarning('bankerSixWin')}
                  className="w-5 h-5 accent-green-500"
                />
              </label>
            </div>
          </div>

          {/* ゲームボックス設定 */}
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-3">ゲームボックス表示</h3>
            <div className="space-y-2">
              {(['B', 'C', 'D', 'E', 'F', 'G'] as GameBoxType[]).map((box) => (
                <label
                  key={box}
                  className="flex items-center justify-between p-3 bg-green-900/30 rounded border border-green-500/30 hover:bg-green-900/50 cursor-pointer transition-colors"
                >
                  <span className="text-green-400">{gameBoxLabels[box]}</span>
                  <input
                    type="checkbox"
                    checked={settings.gameBoxes[box]}
                    onChange={() => toggleGameBox(box)}
                    className="w-5 h-5 accent-green-500"
                  />
                </label>
              ))}
            </div>
            <p className="text-xs text-green-500/70 mt-2">※ A (4枚) は必須のため常に表示されます</p>
          </div>
        </div>

        <div className="sticky bottom-0 bg-green-950 border-t border-green-500 p-4">
          <button
            onClick={onClose}
            className="w-full py-3 bg-green-900 border border-green-500 rounded-lg text-green-400 font-semibold hover:bg-green-800 transition-colors"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
