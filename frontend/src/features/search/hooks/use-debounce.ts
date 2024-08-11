import { useState, useEffect } from 'react';

export default function useDebounce(value:string, delay:number): [string, () => void] {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value]
  );

  const clearDebounce = () => setDebouncedValue("")

  return [debouncedValue, clearDebounce];
}
