import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'sylveon' | 'umbreon' | 'aegislash';

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
				: saved === 'aegislash' ? 'aegislash'
				: saved === 'sylveon' ? 'sylveon'
				: prefersDark ? 'umbreon'
				: 'sylveon';
			document.documentElement.setAttribute('data-theme', theme);
			set(theme);
		},

		/** Cycle through themes: sylveon → umbreon → aegislash → sylveon */
		cycle() {
			update((current) => {
				const order: Theme[] = ['sylveon', 'umbreon', 'aegislash'];
				const currentIndex = order.indexOf(current);
				const next = order[(currentIndex + 1) % order.length];
				if (browser) {
					localStorage.setItem(STORAGE_KEY, next);
					document.documentElement.setAttribute('data-theme', next);
				}
				return next;
			});
		},

		/** Toggle between sylveon (light) and umbreon (dark) - kept for backwards compatibility. */
		toggle() {
			this.cycle();
		},

		/** Directly set a theme. */
		setTheme(t: Theme) {
			if (browser) {
				localStorage.setItem(STORAGE_KEY, t);
				document.documentElement.setAttribute('data-theme', t);
			}
			set(t);
		},

		/** Get the next theme in the cycle without changing it. */
		peekNext(current: Theme): Theme {
			const order: Theme[] = ['sylveon', 'umbreon', 'aegislash'];
			const currentIndex = order.indexOf(current);
			return order[(currentIndex + 1) % order.length];
		}
	};
}

export const theme = createThemeStore();
