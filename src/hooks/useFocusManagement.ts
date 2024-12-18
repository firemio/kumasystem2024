import { useEffect } from 'react';

export function useFocusManagement(containerRef: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const handleFocus = () => {
      element.focus();
    };

    // 初期フォーカス
    handleFocus();

    // ウィンドウフォーカス時
    window.addEventListener('focus', handleFocus);

    // クリーンアップ
    return () => window.removeEventListener('focus', handleFocus);
  }, [containerRef]);

  const focus = () => {
    containerRef.current?.focus();
  };

  return { focus };
}