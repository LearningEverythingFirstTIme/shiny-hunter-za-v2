<script lang="ts">
	import type { Pokemon } from '$lib/types';
	import { getSpriteUrl, getShinySpriteUrl } from '$lib/data/pokemon';
	import { createEventDispatcher } from 'svelte';

	export let pokemon: Pokemon;
	export let showShiny = false;
	export let compact = false;

	const dispatch = createEventDispatcher<{ hunt: Pokemon }>();

	function handleImgError(e: Event) {
		(e.currentTarget as HTMLImageElement).src = getSpriteUrl(pokemon.nationalId);
	}

	$: spriteUrl = showShiny
		? getShinySpriteUrl(pokemon.nationalId)
		: getSpriteUrl(pokemon.nationalId);

	$: paddedId = String(pokemon.id).padStart(3, '0');
</script>

<div
	class="card bg-base-100 border border-base-300 card-hover cursor-default animate-fade-in"
	class:p-3={compact}
	class:p-4={!compact}
>
	<!-- Pokemon number -->
	<div class="flex items-start justify-between mb-1">
		<span class="text-xs opacity-40 font-mono font-bold">#{paddedId}</span>
		{#if showShiny}
			<span class="text-xs font-bold" style="color: #FFD700;">✦ Shiny</span>
		{/if}
	</div>

	<!-- Sprite -->
	<div class="flex justify-center my-2">
		<img
			src={spriteUrl}
			alt={pokemon.name}
			width={compact ? 64 : 80}
			height={compact ? 64 : 80}
			class="transition-all duration-300"
			class:sprite-shadow={!showShiny}
			class:shiny-glow={showShiny}
			on:error={handleImgError}
		/>
	</div>

	<!-- Name -->
	<p class="text-center font-semibold text-sm mb-2 truncate" style="color: #2D1B2E;">
		{pokemon.name}
	</p>

	<!-- Types -->
	<div class="flex justify-center gap-1 flex-wrap mb-3">
		{#each pokemon.types as type}
			<span class="type-badge type-{type}">{type}</span>
		{/each}
	</div>

	<!-- Hunt button -->
	{#if !compact}
		<button
			class="btn btn-primary btn-sm w-full font-bold"
			on:click={() => dispatch('hunt', pokemon)}
		>
			🎯 Start Hunt
		</button>
	{/if}
</div>
