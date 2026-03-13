import { browser } from '$app/environment';
import { WebHaptics } from 'web-haptics';

let haptics: WebHaptics | null = null;

// Initialize haptics only on the client
if (browser) {
  haptics = new WebHaptics({ showSwitch: false });
}

export function trigger(type: 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'warning' | 'selection' | 'nudge' = 'light') {
  if (!browser || !haptics?.isSupported) return;
  
  // Map to web-haptics pattern format
  const patterns = {
    light: [{ duration: 15, intensity: 0.4 }],
    medium: [{ duration: 25, intensity: 0.7 }],
    heavy: [{ duration: 35, intensity: 1 }],
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
  return browser && (haptics?.isSupported ?? false);
}
