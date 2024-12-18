import { useState, useEffect } from 'react';

export function usePersistedState<T>(key: string, initialValue: T) {
  // Get initial value from localStorage or use provided initialValue
  const [state, setState] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  // Update localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
}