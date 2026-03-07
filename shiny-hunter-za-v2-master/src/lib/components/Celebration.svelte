<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import type { Hunt } from '$lib/types';

	export let hunt: Hunt;

	const dispatch = createEventDispatcher<{ close: void }>();

	let showFlash = false;
	let showStats = false;
	let mounted = false;

	$: durationMinutes = Math.round(
		(Date.now() - new Date(hunt.startedAt).getTime()) / 60000
	);
	$: durationDisplay =
		durationMinutes < 60
			? `${durationMinutes}m`
			: `${Math.floor(durationMinutes / 60)}h ${durationMinutes % 60}m`;

	onMount(() => {
		mounted = true;
		runCelebration();
	});

	async function runCelebration() {
		// 1. Screen flash
		showFlash = true;
		await delay(600);
		showFlash = false;

		// 2. Show stats after a moment
		await delay(200);
		showStats = true;

		// 3. Fire confetti
		await delay(100);
		fireConfetti();
		await delay(800);
		fireConfetti(); // second burst
	}

	function delay(ms: number) {
		return new Promise((r) => setTimeout(r, ms));
	}

	async function fireConfetti() {
		try {
			const confetti = (await import('canvas-confetti')).default;
			confetti({
				particleCount: 120,
				spread: 80,
				origin: { y: 0.55 },
				colors: ['#FFB7C5', '#87CEEB', '#FFF8F0', '#FF69B4', '#ADD8E6', '#FFD700', '#ffffff'],
				shapes: ['circle', 'square'],
				gravity: 0.9,
				scalar: 1.1
			});
			// Side bursts
			confetti({
				particleCount: 40,
				angle: 60,
				spread: 55,
				origin: { x: 0, y: 0.65 },
				colors: ['#FFB7C5', '#87CEEB', '#FFD700']
			});
			confetti({
				particleCount: 40,
				angle: 120,
				spread: 55,
				origin: { x: 1, y: 0.65 },
				colors: ['#FFB7C5', '#87CEEB', '#FFD700']
			});
		} catch {
			// confetti unavailable
		}
	}
</script>

<!-- Overlay -->
<div class="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
	<!-- Backdrop -->
	<button
		class="absolute inset-0 bg-black/50 backdrop-blur-sm"
		on:click={() => dispatch('close')}
		aria-label="Close celebration"
	></button>

	<!-- Flash overlay -->
	{#if showFlash}
		<div
			class="absolute inset-0 pointer-events-none animate-flash-gold"
			style="background: radial-gradient(ellipse at center, rgba(255,215,0,0.7) 0%, rgba(255,183,197,0.5) 60%, transparent 100%);"
		></div>
	{/if}

	<!-- Main card -->
	{#if showStats}
		<div
			class="relative z-10 card shadow-2xl p-6 max-w-xs w-full text-center animate-fade-in"
			style="background: linear-gradient(145deg, #FFF8F0, #FFECF2); border: 2px solid #FFB7C5;"
		>
			<!-- Stars -->
			<div class="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl select-none">⭐</div>

			<h2 class="text-2xl font-black mb-1" style="color: #2D1B2E;">
				✨ Shiny Found! ✨
			</h2>
			<p class="text-sm opacity-60 mb-4">Congratulations, Trainer!</p>

			<!-- Sprite with pulse -->
			<div class="flex justify-center mb-4">
				<img
					src={hunt.shinySpriteUrl}
					alt={hunt.pokemonName}
					width="96"
					height="96"
					class="shiny-glow animate-sprite-pulse"
				/>
			</div>

			<!-- Pokemon name -->
			<p class="text-xl font-black mb-4" style="color: #2D1B2E;">
				{hunt.pokemonName}
			</p>

			<!-- Floating +1 SHINY! text (purely decorative) -->
			<div class="relative h-8 overflow-hidden mb-2">
				<p
					class="absolute inset-x-0 top-0 text-center text-lg font-black animate-float-up"
					style="color: #FFD700; text-shadow: 0 0 10px rgba(255,215,0,0.6);"
				>
					+1 SHINY!
				</p>
			</div>

			<!-- Hunt stats -->
			<div class="grid grid-cols-2 gap-3 mb-5">
				<div class="bg-white/70 rounded-xl p-3">
					<p class="text-xs opacity-50 font-medium">Encounters</p>
					<p class="text-2xl font-black tabular-nums" style="color: #2D1B2E;">
						{hunt.encounters.toLocaleString()}
					</p>
				</div>
				<div class="bg-white/70 rounded-xl p-3">
					<p class="text-xs opacity-50 font-medium">Duration</p>
					<p class="text-2xl font-black" style="color: #2D1B2E;">{durationDisplay}</p>
				</div>
			</div>

			<!-- Method badge -->
			<div class="mb-5">
				<span class="badge badge-secondary badge-lg font-semibold">{hunt.method}</span>
			</div>

			<button
				class="btn btn-primary w-full font-bold"
				on:click={() => dispatch('close')}
			>
				🎉 Amazing! Continue
			</button>
		</div>
	{/if}
</div>
