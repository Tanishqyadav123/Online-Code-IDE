import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    // start a timer :-
    const timerId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debounceValue;
}
