import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

interface ResetButtonProps {
  onReset: () => void;
}

export function ResetButton({ onReset }: ResetButtonProps) {
  const [showModal, setShowModal] = useState(false);

  const handleReset = () => {
    setShowModal(false);
    onReset();
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="absolute -top-3 -right-3 p-2 rounded-lg bg-black border-2 border-green-500 
          hover:bg-green-900 transition-colors z-10"
      >
        <RotateCcw className="w-5 h-5 text-green-400" />
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-black border-2 border-green-500 p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-bold text-green-400 mb-4">リセット確認</h3>
            <p className="text-green-300 mb-6">すべてのデータをリセットしますか？</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm border border-green-500 rounded hover:bg-green-900 text-green-400 transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                リセット
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}