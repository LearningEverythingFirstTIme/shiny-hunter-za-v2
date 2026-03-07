<script lang="ts">
	import { POKEMON, ALL_TYPES } from '$lib/data/pokemon';
	import PokemonCard from '$lib/components/PokemonCard.svelte';
	import StartHuntModal from '$lib/components/StartHuntModal.svelte';
	import { EmptySearch } from '$lib/components/illustrations';
	import { user } from '$lib/stores/auth';
	import { startHunt } from '$lib/stores/hunts';
	import { goto } from '$app/navigation';
	import type { Pokemon, PokemonType } from '$lib/types';

	let searchQuery = '';
	let selectedType: PokemonType | '' = '';
	let showShiny = false;
	let huntTarget: Pokemon | null = null;
	let starting = false;

	$: filtered = POKEMON.filter((p) => {
		const matchesSearch =
			searchQuery === '' ||
			p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			String(p.id).includes(searchQuery);
		const matchesType = selectedType === '' || p.types.includes(selectedType);
		return matchesSearch && matchesType;
	});

	async function handleStartHunt(e: CustomEvent<{ method: import('$lib/types').HuntMethod }>) {
		if (!huntTarget || !$user || starting) return;
		starting = true;
		try {
			await startHunt($user.uid, huntTarget.id, huntTarget.name, huntTarget.nationalId, e.detail.method);
			huntTarget = null;
			goto('/hunts');
		} finally {
			starting = false;
		}
	}
</script>

<svelte:head>
	<title>Pokédex – Shiny Hunter Z-A</title>
</svelte:head>

<!-- Page header -->
<div class="mb-6">
	<h1 class="page-header">📖 Z-A Pokédex</h1>
	<p class="page-subheader">{POKEMON.length} Pokémon • Click a card to start a hunt</p>
</div>

<!-- Filters -->
<div class="flex flex-wrap gap-3 mb-6">
	<!-- Search -->
	<div class="flex-1 min-w-48">
		<input
			type="search"
			bind:value={searchQuery}
			placeholder="Search by name or #..."
			class="input input-bordered w-full"
		/>
	</div>

	<!-- Type filter -->
	<select bind:value={selectedType} class="select select-bordered w-40">
		<option value="">All Types</option>
		{#each ALL_TYPES as type}
			<option value={type}>{type}</option>
		{/each}
	</select>

	<!-- Shiny toggle -->
	<label class="flex items-center gap-2 cursor-pointer select-none px-3 py-2 bg-base-100 border border-base-300 rounded-lg hover:border-primary transition-colors">
		<input type="checkbox" bind:checked={showShiny} class="checkbox checkbox-warning checkbox-sm" />
		<span class="text-sm font-semibold">✨ Shiny View</span>
	</label>
</div>

<!-- Results count -->
<p class="text-sm opacity-50 mb-4">
	Showing {filtered.length} of {POKEMON.length} Pokémon
	{#if selectedType || searchQuery}
		<button class="link link-primary ml-2" on:click={() => { searchQuery = ''; selectedType = ''; }}>
			Clear filters
		</button>
	{/if}
</p>

<!-- Grid -->
{#if filtered.length === 0}
	<div class="flex flex-col items-center py-12">
		<EmptySearch animate={true} />
		<button class="btn btn-ghost btn-sm mt-4" on:click={() => { searchQuery = ''; selectedType = ''; }}>
			Clear Filters
		</button>
	</div>
{:else}
	<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
		{#each filtered as pokemon (pokemon.id)}
			<PokemonCard
				{pokemon}
				{showShiny}
				on:hunt={(e) => { huntTarget = e.detail; }}
			/>
		{/each}
	</div>
{/if}

<!-- Start Hunt Modal -->
{#if huntTarget}
	<StartHuntModal
		pokemon={huntTarget}
		on:close={() => { huntTarget = null; }}
		on:start={handleStartHunt}
	/>
{/if}
