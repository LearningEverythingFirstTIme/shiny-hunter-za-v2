import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { User } from 'firebase/auth';

export const user = writable<User | null>(null);
export const authLoading = writable(true);

// Only initialize auth listener in the browser
if (browser) {
	import('../firebase').then(({ auth }) => {
		import('firebase/auth').then(({ onAuthStateChanged }) => {
			onAuthStateChanged(auth, (firebaseUser) => {
				user.set(firebaseUser);
				authLoading.set(false);
			});
		});
	});
}

export async function signInWithGoogle() {
	const { auth, googleProvider } = await import('../firebase');
	const { signInWithPopup } = await import('firebase/auth');
	await signInWithPopup(auth, googleProvider);
}

export async function signOut() {
	const { auth } = await import('../firebase');
	const { signOut: firebaseSignOut } = await import('firebase/auth');
	await firebaseSignOut(auth);
}
