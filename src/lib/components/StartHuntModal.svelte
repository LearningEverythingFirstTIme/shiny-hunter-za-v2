<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Pokemon, HuntMethod } from '$lib/types';
	import { HUNT_METHODS, getShinySpriteUrl } from '$lib/data/pokemon';
	import { theme } from '$lib/stores/theme';

	export let pokemon: Pokemon;

	const dispatch = createEventDispatcher<{ start: { method: HuntMethod }; close: void }>();

	let selectedMethod: HuntMethod = 'Random Encounter';
</script>

<!-- Backdrop -->
<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black" role="dialog" aria-modal="true">
	<button
		class="absolute inset-0 backdrop-blur-sm transition-colors duration-300"
		on:click={() => dispatch('close')}
		aria-label="Close modal"
	></button>

	<div
		class="relative z-10 card shadow-2xl p-6 max-w-sm w-full animate-fade-in transition-all duration-300"
		class:bg-base-100={$theme === 'sylveon'}
		class:border-base-300={$theme === 'sylveon'}
		class:bg-umbreon-dark={$theme === 'umbreon'}
		class:ring-border={$theme === 'umbreon'}>
		<h3 class="text-xl font-black mb-4 transition-colors duration-300"
			class:text-dark-text={$theme === 'sylveon'}
			class:text-umbreon-moon={$theme === 'umbreon'}>
			Start Shiny Hunt
		</h3>

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
				<p class="font-bold text-lg transition-colors duration-300"
					class:text-dark-text={$theme === 'sylveon'}
					class:text-umbreon-moon={$theme === 'umbreon'}>
					{pokemon.name}
				</p>
				<div class="flex gap-1 flex-wrap mt-1">
					{#each pokemon.types as type}
						<span class="type-badge type-{type}">{type}</span>
					{/each}
				</div>
			</div>
		</div>

		<!-- Method selection -->
		<label class="label" for="method-select">
			<span class="label-text font-semibold transition-colors duration-300"
				class:text-dark-text={$theme === 'sylveon'}
				class:text-umbreon-moon={$theme === 'umbreon'}>
				Hunt Method
			</span>
		</label>
		<select
			id="method-select"
			bind:value={selectedMethod}
			class="select select-bordered w-full mb-5 transition-colors duration-300"
			class:bg-umbreon-dark={$theme === 'umbreon'}
			class:border-umbreon-purple={$theme === 'umbreon'}
			class:text-umbreon-moon={$theme === 'umbreon'}>
			{#each HUNT_METHODS as method}
				<option value={method}>{method}</option>
			{/each}
		</select>

		<!-- Actions -->
		<div class="flex gap-3">
			<button class="btn btn-ghost flex-1" on:click={() => dispatch('close')}>Cancel</button>
			<button
				class="btn btn-primary flex-[2] font-bold"
				on:click={() => dispatch('start', { method: selectedMethod })}
			>
				🎯 Start Hunt
			</button>
		</div>
	</div>
</div>
