import { browser } from '$app/environment';

// Simple haptics using the Vibration API directly
// This is more reliable than the web-haptics library for basic usage

function isSupported(): boolean {
  return browser && typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';
}

export function trigger(type: 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'warning' | 'selection' = 'light') {
  if (!isSupported()) return;
  
  // Define vibration patterns for each type (duration in ms)
  const patterns: Record<string, number | number[]> = {
    light: 15,
    medium: 25,
    heavy: 35,
    // Complex patterns for these
    success: [30, 50, 40, 50],
    error: [40, 30, 40, 30, 40, 30],
    warning: [40, 50, 40, 50],
    selection: 8
  };
  
  const pattern = patterns[type];
  if (pattern !== undefined) {
    navigator.vibrate(pattern);
  }
}

export function hapticsSupported(): boolean {
  return isSupported();
}