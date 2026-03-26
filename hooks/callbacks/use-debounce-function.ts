"use client";

import { useRef, useEffect, useCallback } from "react";

/**
 * Custom hook that creates a debounced version of a callback function
 * @param callback The function to debounce
 * @param delay The delay in milliseconds (default: 1000ms)
 * @returns A debounced version of the callback
 */
export function useDebounceFunction<TArgs extends unknown[]>(
  callback: (...args: TArgs) => unknown,
  delay = 1000
) {
  // Store the latest callback in a ref
  const callbackRef = useRef<((...args: TArgs) => unknown) | null>(null);

  // Store the timeout ID for cleanup
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update the callback ref when the callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Create the debounced function
  const debouncedCallback = useCallback(
    (...args: TArgs) => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set a new timeout
      timeoutRef.current = setTimeout(() => {
        if (callbackRef.current) {
          callbackRef.current(...args);
        }
      }, delay);
    },
    [delay]
  );

  // Clean up the timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}
