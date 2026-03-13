<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Pokemon, HuntMethod } from '$lib/types';
	import { HUNT_METHODS, getShinySpriteUrl } from '$lib/data/pokemon';
	import { folders } from '$lib/stores/folders';
	import { theme } from '$lib/stores/theme';
	import { trigger, hapticsSupported } from '$lib/haptics';
	import { browser } from '$app/environment';

	export let pokemon: Pokemon;

	let hapticsReady = false;
	if (browser) hapticsReady = hapticsSupported();

	function haptic(type: 'light' | 'success' = 'light') {
		if (hapticsReady) trigger(type);
	}

	const dispatch = createEventDispatcher<{
		start: { method: HuntMethod; folderId: string | null };
		close: void;
	}>();

	let selectedMethod: HuntMethod = 'Random Encounter';
	let selectedFolderId = '';
</script>

<!-- Backdrop -->
<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black" role="dialog" aria-modal="true">
	<button
		class="absolute inset-0 backdrop-blur-sm transition-colors duration-300"
		on:click={() => dispatch('close')}
		aria-label="Close modal"
	></button>

	<div
		class="relative z-10 card bg-base-100 shadow-2xl p-6 max-w-sm w-full border border-base-300 animate-fade-in"
	>
		<h3 class="text-xl font-black mb-4">Start Shiny Hunt</h3>

		<!-- Pokemon info -->
		<div class="flex items-center gap-4 mb-5 p-3 rounded-xl transition-colors duration-300"
			class:bg-base-200={$theme === 'sylveon'}
			class:bg-umbreon-purple={$theme === 'umbreon'}>
			<img
				src={getShinySpriteUrl(pokemon.nationalId)}
				alt={pokemon.name}
				width="64"
				height="64"
				class="shiny-glow"
			/>
			<div>
				<p class="font-bold text-lg">{pokemon.name}</p>
				<div class="flex gap-1 flex-wrap mt-1">
					{#each pokemon.types as type}
						<span class="type-badge type-{type}">{type}</span>
					{/each}
				</div>
			</div>
		</div>

		<!-- Method selection -->
		<label class="label" for="method-select">
			<span class="label-text font-semibold">Hunt Method</span>
		</label>
		<select
			id="method-select"
			bind:value={selectedMethod}
			class="select select-bordered w-full mb-5"
		>
			{#each HUNT_METHODS as method}
				<option value={method}>{method}</option>
			{/each}
		</select>

		<label class="label" for="folder-select">
			<span class="label-text font-semibold">Folder</span>
		</label>
		<select
			id="folder-select"
			bind:value={selectedFolderId}
			class="select select-bordered w-full mb-2"
		>
			<option value="">Ungrouped</option>
			{#each $folders as folder (folder.id)}
				<option value={folder.id}>{folder.name}</option>
			{/each}
		</select>
		<p class="text-xs opacity-60 mb-5">
			{#if $folders.length === 0}
				Create folders on the Hunts page to organize area-based hunt runs.
			{:else}
				Choose a folder now, or leave this hunt ungrouped.
			{/if}
		</p>

		<!-- Actions -->
		<div class="flex gap-3">
			<button class="btn btn-ghost flex-1" on:click={() => { dispatch('close'); haptic('light'); }}>Cancel</button>
			<button
				class="btn btn-primary flex-[2] font-bold"
				on:click={() => { dispatch('start', { method: selectedMethod, folderId: selectedFolderId || null }); haptic('success'); }}
			>
				🎯 Start Hunt
			</button>
		</div>
	</div>
</div>
