<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import { user, authLoading, signInWithGoogle } from '$lib/stores/auth';
	import { subscribeHunts, unsubscribeHunts } from '$lib/stores/hunts';
	import { subscribeShinies, unsubscribeShinies } from '$lib/stores/shinies';
	import { onDestroy } from 'svelte';

	let prevUserId: string | null = null;

	$: {
		const uid = $user?.uid ?? null;
		if (uid !== prevUserId) {
			// Clean up old subscriptions
			unsubscribeHunts();
			unsubscribeShinies();

			if (uid) {
				subscribeHunts(uid);
				subscribeShinies(uid);
			}
			prevUserId = uid;
		}
	}

	onDestroy(() => {
		unsubscribeHunts();
		unsubscribeShinies();
	});
</script>

<div class="min-h-screen flex flex-col" style="background-color: #FFF8F0;">
	{#if $authLoading}
		<!-- Loading screen -->
		<div class="flex-1 flex items-center justify-center">
			<div class="text-center">
				<div class="text-6xl mb-4 animate-pulse">✨</div>
				<p class="font-semibold opacity-60">Loading...</p>
			</div>
		</div>
	{:else if !$user}
		<!-- Login screen -->
		<div class="flex-1 flex items-center justify-center p-6">
			<div class="card bg-base-100 shadow-2xl p-8 max-w-md w-full text-center border border-base-300">
				<!-- Logo / header -->
				<div class="text-7xl mb-4 select-none">
					<span class="inline-block animate-pulse">✨</span>
				</div>
				<h1 class="text-3xl font-black mb-2" style="color: #2D1B2E;">Shiny Hunter Z-A</h1>
				<p class="text-sm opacity-60 mb-8">
					Track your shiny hunts in Pokémon Legends: Z-A
				</p>

				<!-- Feature list -->
				<ul class="text-left space-y-2 mb-8 text-sm">
					<li class="flex items-center gap-2">
						<span class="text-lg">📖</span>
						<span>Browse all 230 Pokémon in the Z-A Dex</span>
					</li>
					<li class="flex items-center gap-2">
						<span class="text-lg">🎯</span>
						<span>Track encounters for multiple active hunts</span>
					</li>
					<li class="flex items-center gap-2">
						<span class="text-lg">✨</span>
						<span>Gallery of all your shiny catches</span>
					</li>
					<li class="flex items-center gap-2">
						<span class="text-lg">📊</span>
						<span>Statistics dashboard for your collection</span>
					</li>
				</ul>

				<button
					class="btn btn-primary w-full font-bold text-base gap-2"
					on:click={signInWithGoogle}
				>
					<svg class="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
						<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
						<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
						<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
					</svg>
					Sign in with Google
				</button>

				<p class="text-xs opacity-40 mt-4">Your data is synced across devices via Firebase</p>
			</div>
		</div>
	{:else}
		<!-- Authenticated layout -->
		<Nav />
		<main class="flex-1 container mx-auto max-w-6xl px-4 py-6">
			<slot />
		</main>
		<footer class="text-center py-4 text-xs opacity-30 border-t border-base-300">
			Shiny Hunter Z-A • Made with 💖 for Pokémon fans
		</footer>
	{/if}
</div>
