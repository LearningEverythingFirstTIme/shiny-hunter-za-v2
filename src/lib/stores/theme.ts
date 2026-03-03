import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'sylveon' | 'umbreon';

function createThemeStore() {
	const { subscribe, set } = writable<Theme>('sylveon');

	return {
		subscribe,
		set: (theme: Theme) => {
			if (browser) {
				document.documentElement.setAttribute('data-theme', theme);
				localStorage.setItem('theme', theme);
			}
			set(theme);
		},
		toggle: () => {
			if (browser) {
				const current = document.documentElement.getAttribute('data-theme') as Theme || 'sylveon';
				const next = current === 'sylveon' ? 'umbreon' : 'sylveon';
				document.documentElement.setAttribute('data-theme', next);
				localStorage.setItem('theme', next);
				set(next);
			}
		},
		init: () => {
			if (browser) {
				const saved = localStorage.getItem('theme') as Theme | null;
				const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
				const theme = saved || (prefersDark ? 'umbreon' : 'sylveon');
				document.documentElement.setAttribute('data-theme', theme);
				set(theme);
			}
		}
	};
}

export const theme = createThemeStore();
