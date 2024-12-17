"use client";
export function getInitialValueFromStorage<T>(key: string): T | null {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  }
  return null;
}
