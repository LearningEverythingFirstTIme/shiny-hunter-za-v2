import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'sylveon' | 'umbreon';

const STORAGE_KEY = 'shiny-hunter-theme';

function createThemeStore() {
	const { subscribe, set, update } = writable<Theme>('sylveon');

	return {
		subscribe,

		/** Called once on app mount to sync store with localStorage / DOM. */
		init() {
			if (!browser) return;
			const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
			// Respect saved preference; fall back to system dark-mode preference
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			const theme: Theme = saved === 'umbreon' ? 'umbreon'
				: saved === 'sylveon' ? 'sylveon'
				: prefersDark ? 'umbreon'
				: 'sylveon';
			document.documentElement.setAttribute('data-theme', theme);
			set(theme);
		},

		/** Toggle between sylveon (light) and umbreon (dark). */
		toggle() {
			update((current) => {
				const next: Theme = current === 'sylveon' ? 'umbreon' : 'sylveon';
				if (browser) {
					localStorage.setItem(STORAGE_KEY, next);
					document.documentElement.setAttribute('data-theme', next);
				}
				return next;
			});
		},

		/** Directly set a theme. */
		setTheme(t: Theme) {
			if (browser) {
				localStorage.setItem(STORAGE_KEY, t);
				document.documentElement.setAttribute('data-theme', t);
			}
			set(t);
		}
	};
}

export const theme = createThemeStore();
