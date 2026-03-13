import { WebHaptics } from 'web-haptics';

// Singleton instance — created once, reused across all components
const haptics = typeof window !== 'undefined' ? new WebHaptics() : null;

// The library's built-in presets use fractional intensities (e.g. 0.5) which it
// simulates via PWM — chopping the vibration into rapid ~10ms on/off pulses.
// Most phone vibration motors can't actuate that fast, so nothing is felt.
// Using intensity: 1 bypasses the PWM simulation; the library passes a single
// solid pulse directly to navigator.vibrate() which phones can actually feel.
const PATTERNS = {
	success: [{ duration: 50, intensity: 1 }, { delay: 100, duration: 80, intensity: 1 }],
	nudge:   [{ duration: 60, intensity: 1 }, { delay:  80, duration: 30, intensity: 1 }],
	error:   [{ duration: 50, intensity: 1 }, { delay:  50, duration: 50, intensity: 1 }, { delay: 50, duration: 50, intensity: 1 }],
	buzz:    [{ duration: 400, intensity: 1 }],
} as const;

type HapticPreset = keyof typeof PATTERNS;

export function triggerHaptic(preset: HapticPreset | number = 'nudge'): void {
	if (!haptics) return;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	haptics.trigger(typeof preset === 'number' ? preset : (PATTERNS[preset] as any));
}
