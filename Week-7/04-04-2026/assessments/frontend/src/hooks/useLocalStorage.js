import { useState, useEffect } from 'react';

/**
 * Custom hook to manage state synchronized with window.localStorage.
 * It provides the same interface as useState but persists data.
 * @param {string} key - The localStorage key to store the data under.
 * @param {any} initialValue - The initial value if no data exists in localStorage.
 * @returns {[any, Function]} - Returns the stateful value and a function to update it.
 */
export function useLocalStorage(key, initialValue) {
  // Initialize state using a function to avoid reading from localStorage on every render
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Effect to update localStorage when the state value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
