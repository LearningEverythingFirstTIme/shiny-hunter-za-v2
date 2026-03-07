import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
	id: string;
	message: string;
	type: ToastType;
	duration: number;
}

function createToastStore() {
	const { subscribe, update } = writable<Toast[]>([]);

	function add(message: string, type: ToastType, duration: number) {
		const id = Math.random().toString(36).slice(2, 9);
		update((toasts) => [...toasts, { id, message, type, duration }]);
		if (duration > 0) {
			setTimeout(() => remove(id), duration);
		}
	}

	function remove(id: string) {
		update((toasts) => toasts.filter((t) => t.id !== id));
	}

	return {
		subscribe,
		success: (message: string, duration = 3000) => add(message, 'success', duration),
		error:   (message: string, duration = 5000) => add(message, 'error', duration),
		warning: (message: string, duration = 4000) => add(message, 'warning', duration),
		info:    (message: string, duration = 3000) => add(message, 'info', duration),
		remove
	};
}

export const toast = createToastStore();
