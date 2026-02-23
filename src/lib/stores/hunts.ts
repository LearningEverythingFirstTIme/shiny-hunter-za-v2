import { writable, derived, get } from 'svelte/store';
import { browser } from '$app/environment';
import type { Hunt, HuntMethod } from '$lib/types';
import { getShinySpriteUrl } from '$lib/data/pokemon';

export const hunts = writable<Hunt[]>([]);
export const huntsLoading = writable(false);

let unsubscribe: (() => void) | null = null;

export function subscribeHunts(userId: string) {
	if (!browser) return;
	huntsLoading.set(true);

	import('$lib/firebase').then(({ db }) => {
		import('firebase/firestore').then(({ collection, query, where, orderBy, onSnapshot }) => {
			const q = query(
				collection(db, 'hunts'),
				where('userId', '==', userId),
				where('status', '==', 'active'),
				orderBy('startedAt', 'desc')
			);

			unsubscribe = onSnapshot(q, (snap) => {
				const data: Hunt[] = snap.docs.map((doc) => {
					const d = doc.data();
					return {
						...d,
						id: doc.id,
						startedAt: d.startedAt?.toDate() ?? new Date(),
						completedAt: d.completedAt?.toDate()
					} as Hunt;
				});
				hunts.set(data);
				huntsLoading.set(false);
			});
		});
	});
}

export function unsubscribeHunts() {
	if (unsubscribe) {
		unsubscribe();
		unsubscribe = null;
	}
	hunts.set([]);
}

export async function startHunt(
	userId: string,
	pokemonId: number,
	pokemonName: string,
	nationalId: number,
	method: HuntMethod
): Promise<string> {
	const { db } = await import('$lib/firebase');
	const { collection, addDoc, Timestamp } = await import('firebase/firestore');

	const docRef = await addDoc(collection(db, 'hunts'), {
		userId,
		pokemonId,
		pokemonName,
		nationalId,
		shinySpriteUrl: getShinySpriteUrl(nationalId),
		method,
		encounters: 0,
		status: 'active',
		startedAt: Timestamp.now()
	});

	return docRef.id;
}

export async function updateEncounters(huntId: string, delta: number, currentCount: number) {
	const newCount = Math.max(0, currentCount + delta);
	const { db } = await import('$lib/firebase');
	const { doc, updateDoc } = await import('firebase/firestore');
	await updateDoc(doc(db, 'hunts', huntId), { encounters: newCount });
}

export async function completeHunt(hunt: Hunt, isAlpha: boolean = false): Promise<void> {
	const { db } = await import('$lib/firebase');
	const { doc, updateDoc, addDoc, collection, Timestamp } = await import('firebase/firestore');

	const now = new Date();
	const durationMinutes = Math.round((now.getTime() - hunt.startedAt.getTime()) / 60000);

	// Mark hunt as completed
	await updateDoc(doc(db, 'hunts', hunt.id!), {
		status: 'completed',
		completedAt: Timestamp.now(),
		durationMinutes,
		isAlpha
	});

	// Create shiny record
	await addDoc(collection(db, 'shinies'), {
		userId: hunt.userId,
		pokemonId: hunt.pokemonId,
		pokemonName: hunt.pokemonName,
		nationalId: hunt.nationalId,
		shinySpriteUrl: hunt.shinySpriteUrl,
		method: hunt.method,
		encounters: hunt.encounters,
		caughtAt: Timestamp.now(),
		durationMinutes,
		isAlpha
	});
}

export async function abandonHunt(huntId: string) {
	const { db } = await import('$lib/firebase');
	const { doc, updateDoc } = await import('firebase/firestore');
	await updateDoc(doc(db, 'hunts', huntId), { status: 'abandoned' });
}

export const activeHuntsCount = derived(hunts, ($hunts) => $hunts.length);
