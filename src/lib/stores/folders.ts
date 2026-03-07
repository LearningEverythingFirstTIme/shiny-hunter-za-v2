import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Folder } from '$lib/types';
import { toast } from '$lib/stores/toasts';

export const folders = writable<Folder[]>([]);
export const foldersLoading = writable(false);

let unsubscribe: (() => void) | null = null;

export function subscribeFolders(userId: string) {
	if (!browser) return;
	foldersLoading.set(true);

	import('$lib/firebase').then(({ db }) => {
		import('firebase/firestore').then(({ collection, query, where, onSnapshot }) => {
			const q = query(collection(db, 'folders'), where('userId', '==', userId));

			unsubscribe = onSnapshot(
				q,
				(snap) => {
					const data: Folder[] = snap.docs
						.map((doc) => {
							const d = doc.data();
							return {
								...d,
								id: doc.id,
								createdAt: d.createdAt?.toDate() ?? new Date(),
								updatedAt: d.updatedAt?.toDate() ?? new Date()
							} as Folder;
						})
						.sort((a, b) => a.name.localeCompare(b.name));

					folders.set(data);
					foldersLoading.set(false);
				},
				(err) => {
					console.error('Folders listener error:', err);
					toast.error('Failed to load folders. Check your connection.');
					foldersLoading.set(false);
				}
			);
		});
	});
}

export function unsubscribeFolders() {
	if (unsubscribe) {
		unsubscribe();
		unsubscribe = null;
	}
	folders.set([]);
}

export async function createFolder(userId: string, name: string): Promise<string> {
	const trimmedName = name.trim();
	if (!trimmedName) {
		throw new Error('Folder name is required');
	}

	try {
		const { db } = await import('$lib/firebase');
		const { collection, addDoc, Timestamp } = await import('firebase/firestore');

		const docRef = await addDoc(collection(db, 'folders'), {
			userId,
			name: trimmedName,
			createdAt: Timestamp.now(),
			updatedAt: Timestamp.now()
		});

		toast.success(`Created folder ${trimmedName}.`);
		return docRef.id;
	} catch (err) {
		console.error('createFolder error:', err);
		toast.error("Couldn't create folder. Check your connection.");
		throw err;
	}
}

export async function renameFolder(folderId: string, name: string) {
	const trimmedName = name.trim();
	if (!trimmedName) {
		throw new Error('Folder name is required');
	}

	try {
		const { db } = await import('$lib/firebase');
		const { doc, updateDoc, Timestamp } = await import('firebase/firestore');

		await updateDoc(doc(db, 'folders', folderId), {
			name: trimmedName,
			updatedAt: Timestamp.now()
		});

		toast.success('Folder updated!');
	} catch (err) {
		console.error('renameFolder error:', err);
		toast.error("Couldn't rename folder. Check your connection.");
		throw err;
	}
}

export async function deleteFolder(userId: string, folderId: string) {
	try {
		const { db } = await import('$lib/firebase');
		const { collection, deleteDoc, doc, getDocs, query, where, writeBatch } =
			await import('firebase/firestore');

		const folderHunts = await getDocs(
			query(collection(db, 'hunts'), where('userId', '==', userId), where('folderId', '==', folderId))
		);
		if (!folderHunts.empty) {
			const batch = writeBatch(db);
			folderHunts.docs.forEach((huntDoc) => {
				batch.update(huntDoc.ref, {
					folderId: null
				});
			});
			await batch.commit();
		}

		await deleteDoc(doc(db, 'folders', folderId));
		toast.info('Folder deleted. Hunts moved to Ungrouped.');
	} catch (err) {
		console.error('deleteFolder error:', err);
		toast.error("Couldn't delete folder. Check your connection.");
		throw err;
	}
}

export async function assignHuntToFolder(huntId: string, folderId: string | null) {
	try {
		const { db } = await import('$lib/firebase');
		const { doc, updateDoc } = await import('firebase/firestore');
		await updateDoc(doc(db, 'hunts', huntId), { folderId });
		toast.success(folderId ? 'Hunt moved to folder!' : 'Hunt moved to Ungrouped.');
	} catch (err) {
		console.error('assignHuntToFolder error:', err);
		toast.error("Couldn't update folder. Check your connection.");
		throw err;
	}
}
