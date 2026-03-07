import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import type { Shiny, UserStats, HuntMethod } from '$lib/types';

export const shinies = writable<Shiny[]>([]);
export const shiniesLoading = writable(false);

let unsubscribe: (() => void) | null = null;

export function subscribeShinies(userId: string) {
	if (!browser) return;
	shiniesLoading.set(true);

	import('$lib/firebase').then(({ db }) => {
		import('firebase/firestore').then(({ collection, query, where, orderBy, onSnapshot }) => {
			const q = query(
				collection(db, 'shinies'),
				where('userId', '==', userId),
				orderBy('caughtAt', 'desc')
			);

			unsubscribe = onSnapshot(q, (snap) => {
				const data: Shiny[] = snap.docs.map((doc) => {
					const d = doc.data();
					return {
						...d,
						id: doc.id,
						caughtAt: d.caughtAt?.toDate() ?? new Date()
					} as Shiny;
				});
				shinies.set(data);
				shiniesLoading.set(false);
			});
		});
	});
}

export function unsubscribeShinies() {
	if (unsubscribe) {
		unsubscribe();
		unsubscribe = null;
	}
	shinies.set([]);
}

export const stats = derived<typeof shinies, UserStats>(shinies, ($shinies) => {
	if ($shinies.length === 0) {
		return {
			totalShinies: 0,
			totalEncounters: 0,
			totalHuntTime: 0,
			averageEncounters: 0,
			longestHunt: 0,
			shortestHunt: 0,
			favoriteMethod: null,
			rarest: null,
			luckiest: null
		};
	}

	const totalEncounters = $shinies.reduce((sum, s) => sum + s.encounters, 0);
	const totalHuntTime = $shinies.reduce((sum, s) => sum + s.durationMinutes, 0);

	const sorted = [...$shinies].sort((a, b) => b.encounters - a.encounters);
	const rarest = sorted[0] ?? null;
	const luckiest = sorted[sorted.length - 1] ?? null;

	// Find favorite method
	const methodCounts: Partial<Record<HuntMethod, number>> = {};
	for (const s of $shinies) {
		methodCounts[s.method] = (methodCounts[s.method] ?? 0) + 1;
	}
	const favoriteMethod = (Object.entries(methodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ??
		null) as HuntMethod | null;

	return {
		totalShinies: $shinies.length,
		totalEncounters,
		totalHuntTime,
		averageEncounters: Math.round(totalEncounters / $shinies.length),
		longestHunt: sorted[0]?.encounters ?? 0,
		shortestHunt: sorted[sorted.length - 1]?.encounters ?? 0,
		favoriteMethod,
		rarest,
		luckiest
	};
});
