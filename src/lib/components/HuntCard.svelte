<script lang="ts">
	import type { Hunt } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import { updateEncounters, completeHunt, abandonHunt } from '$lib/stores/hunts';

	export let hunt: Hunt;

	const dispatch = createEventDispatcher<{ complete: Hunt }>();

	let completing = false;
	let abandoning = false;
	let isAlpha = false;

	// Tick every minute so elapsed time + enc/hr stay fresh
	let now = Date.now();
	const ticker = setInterval(() => { now = Date.now(); }, 60_000);
	import { onDestroy } from 'svelte';
	onDestroy(() => clearInterval(ticker));

	$: elapsedMs = now - new Date(hunt.startedAt).getTime();
	$: elapsedMinutes = Math.max(1, Math.round(elapsedMs / 60_000));

	$: elapsedDisplay =
		elapsedMinutes < 60
			? `${elapsedMinutes}m`
			: `${Math.floor(elapsedMinutes / 60)}h ${elapsedMinutes % 60}m`;

	// Encounters per hour
	$: encPerHour = Math.round((hunt.encounters / elapsedMinutes) * 60);
	$: encPerHourDisplay =
		encPerHour >= 1000
			? `${(encPerHour / 1000).toFixed(1)}k/hr`
			: `${encPerHour}/hr`;

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
		} catch {
			// error toast already shown by store
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
		} catch {
			// error toast already shown by store
		} finally {
			abandoning = false;
		}
	}
</script>

<div class="card bg-base-100 border border-base-300 p-4 animate-fade-in">
	<!-- Header row -->
	<div class="flex items-center gap-3 mb-3">
		<img
			src={hunt.shinySpriteUrl}
			alt={hunt.pokemonName}
			width="56"
			height="56"
			class="shiny-glow flex-shrink-0"
		/>
		<div class="flex-1 min-w-0">
			<p class="font-bold text-base leading-tight truncate" style="color: #2D1B2E;">
				{hunt.pokemonName}
			</p>
			<p class="text-xs opacity-60">{hunt.method}</p>
		</div>
		<div class="text-right text-xs opacity-50 flex-shrink-0">
			<p>⏱ {elapsedDisplay}</p>
		</div>
	</div>

	<!-- Encounters + enc/hr -->
	<div class="bg-base-200 rounded-xl p-3 mb-3">
		<div class="flex items-end justify-between">
			<div>
				<p class="text-xs font-medium opacity-60 mb-0.5">ENCOUNTERS</p>
				<p class="text-3xl font-bold tabular-nums leading-none" style="color: #2D1B2E;">
					{hunt.encounters.toLocaleString()}
				</p>
			</div>
			{#if hunt.encounters > 0}
				<div class="text-right">
					<p class="text-xs font-medium opacity-60 mb-0.5">RATE</p>
					<p class="text-lg font-bold tabular-nums leading-none" style="color: #2D1B2E;">
						{encPerHourDisplay}
					</p>
				</div>
			{/if}
		</div>
	</div>

	<!-- +1 / +5 / +10 buttons -->
	<div class="flex gap-1.5 mb-1.5">
		<button
			class="btn btn-primary btn-sm flex-1 font-bold text-base"
			on:click={() => onIncrement(1)}
		>+1</button>
		<button
			class="btn btn-primary btn-sm flex-1 font-bold"
			on:click={() => onIncrement(5)}
		>+5</button>
		<button
			class="btn btn-primary btn-sm flex-1 font-bold"
			on:click={() => onIncrement(10)}
		>+10</button>
	</div>

	<!-- Undo misclick -->
	<div class="flex justify-end mb-3">
		<button
			class="btn btn-ghost btn-xs text-xs opacity-50 hover:opacity-100"
			on:click={() => onIncrement(-1)}
			disabled={hunt.encounters === 0}
		>
			↩ undo misclick
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
