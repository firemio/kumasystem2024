import React from 'react';

export function Instructions() {
  return (
    <div className="mt-4 text-xs text-green-600 space-y-1">
      <p>• カーソルキーで移動（行末で折り返し）</p>
      <p>• クリックでカーソル移動</p>
      <p>• 数字を入力</p>
      <p>• Enterで基準点設定</p>
      <p>• *で色切替</p>
      <p>• BackspaceまたはDeleteで削除</p>
    </div>
  );
}