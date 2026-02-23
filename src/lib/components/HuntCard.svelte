<script lang="ts">
	import type { Hunt } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import { updateEncounters, completeHunt, abandonHunt } from '$lib/stores/hunts';

	export let hunt: Hunt;

	const dispatch = createEventDispatcher<{ complete: Hunt }>();

	let completing = false;
	let abandoning = false;
	let isAlpha = false;

	$: elapsedMinutes = Math.round(
		(Date.now() - new Date(hunt.startedAt).getTime()) / 60000
	);

	$: elapsedDisplay =
		elapsedMinutes < 60
			? `${elapsedMinutes}m`
			: `${Math.floor(elapsedMinutes / 60)}h ${elapsedMinutes % 60}m`;

	async function onIncrement(delta: number) {
		if (!hunt.id) return;
		await updateEncounters(hunt.id, delta, hunt.encounters);
	}

	async function onComplete() {
		if (!hunt.id || completing) return;
		completing = true;
		try {
			await completeHunt(hunt, isAlpha);
			dispatch('complete', hunt);
		} finally {
			completing = false;
		}
	}

	async function onAbandon() {
		if (!hunt.id || abandoning) return;
		if (!confirm(`Abandon hunt for ${hunt.pokemonName}? This cannot be undone.`)) return;
		abandoning = true;
		try {
			await abandonHunt(hunt.id);
		} finally {
			abandoning = false;
		}
	}
</script>

<div class="card bg-base-100 border border-base-300 p-4 animate-fade-in">
	<!-- Header row -->
	<div class="flex items-center gap-3 mb-3">
		<div class="relative">
			<img
				src={hunt.shinySpriteUrl}
				alt={hunt.pokemonName}
				width="56"
				height="56"
				class="shiny-glow"
			/>
		</div>
		<div class="flex-1 min-w-0">
			<p class="font-bold text-base leading-tight truncate" style="color: #2D1B2E;">
				{hunt.pokemonName}
			</p>
			<p class="text-xs opacity-60">{hunt.method}</p>
		</div>
		<div class="text-right text-xs opacity-50">
			<p>{elapsedDisplay}</p>
		</div>
	</div>

	<!-- Encounters counter -->
	<div class="bg-base-200 rounded-xl p-3 mb-3 text-center">
		<p class="text-xs font-medium opacity-60 mb-1">ENCOUNTERS</p>
		<p class="text-3xl font-bold tabular-nums" style="color: #2D1B2E;">
			{hunt.encounters.toLocaleString()}
		</p>
	</div>

	<!-- +/- buttons -->
	<div class="flex gap-2 mb-3">
		<button
			class="btn btn-outline btn-sm flex-1 font-mono"
			on:click={() => onIncrement(-1)}
			disabled={hunt.encounters === 0}
			title="Undo (misclick)"
		>
			−1
		</button>
		<button
			class="btn btn-primary btn-sm flex-[3] font-bold text-base"
			on:click={() => onIncrement(1)}
		>
			+ Encounter
		</button>
	</div>

	<!-- Alpha toggle -->
	<label class="flex items-center gap-2 text-sm mb-3 cursor-pointer select-none">
		<input type="checkbox" bind:checked={isAlpha} class="checkbox checkbox-warning checkbox-sm" />
		<span class="font-medium">Alpha Pokémon</span>
		{#if isAlpha}
			<span class="badge badge-warning badge-sm">α</span>
		{/if}
	</label>

	<!-- Action row -->
	<div class="flex gap-2">
		<button
			class="btn btn-ghost btn-sm text-error flex-1"
			on:click={onAbandon}
			disabled={abandoning}
		>
			{abandoning ? '...' : 'Abandon'}
		</button>
		<button
			class="btn btn-accent btn-sm flex-[2] font-bold"
			on:click={onComplete}
			disabled={completing}
		>
			{#if completing}
				<span class="loading loading-spinner loading-xs"></span>
			{:else}
				✨ Shiny Found!
			{/if}
		</button>
	</div>
</div>
