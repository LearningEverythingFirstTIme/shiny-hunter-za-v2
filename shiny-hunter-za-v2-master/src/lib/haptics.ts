import { WebHaptics } from 'web-haptics';

// Singleton instance — created once, reused across all components
const haptics = typeof window !== 'undefined' ? new WebHaptics() : null;

export function triggerHaptic(pattern: 'success' | 'nudge' | 'error' | 'buzz' | number = 'nudge') {
	haptics?.trigger(pattern);
}
