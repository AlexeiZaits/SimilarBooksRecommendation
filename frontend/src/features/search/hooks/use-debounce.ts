import { useState, useEffect } from 'react';

export default function useDebounce(callback:(value: string) => void,delay:number): [string, (value: string) => void] {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(debouncedValue);
        callback(debouncedValue)
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedValue]
  );

  return [debouncedValue, setDebouncedValue];
}
