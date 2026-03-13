import { browser } from '$app/environment';
import { createWebHaptics } from 'web-haptics/svelte';

let haptics: ReturnType<typeof createWebHaptics> | null = null;

// Initialize haptics only on the client
if (browser) {
  haptics = createWebHaptics({ showSwitch: false });
}

export function trigger(type: 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'warning' | 'selection' | 'nudge' = 'light') {
  if (!browser || !haptics) return;
  
  // Map to web-haptics pattern format - can be string presets or arrays
  const patterns: Record<string, any> = {
    light: 'light',
    medium: 'medium',
    heavy: 'heavy',
    success: 'success',
    error: 'error',
    warning: 'warning',
    selection: 'selection',
    nudge: 'nudge'
  };
  
  const pattern = patterns[type];
  if (pattern) {
    haptics.trigger(pattern);
  }
}

export function hapticsSupported(): boolean {
  return browser && haptics !== null;
}