<script lang="ts">
	import { shinies, shiniesLoading } from '$lib/stores/shinies';
	import ShinyCard from '$lib/components/ShinyCard.svelte';
	import { EmptyShinies } from '$lib/components/illustrations';

	let sortBy: 'date' | 'encounters' | 'name' = 'date';

	$: sorted = [...$shinies].sort((a, b) => {
		if (sortBy === 'date') return new Date(b.caughtAt).getTime() - new Date(a.caughtAt).getTime();
		if (sortBy === 'encounters') return b.encounters - a.encounters;
		return a.pokemonName.localeCompare(b.pokemonName);
	});
</script>

<svelte:head>
	<title>Shinies – Shiny Hunter Z-A</title>
</svelte:head>

<div class="mb-6 flex flex-wrap items-end justify-between gap-4">
	<div>
		<h1 class="page-header">✨ My Shinies</h1>
		<p class="page-subheader">
			{$shinies.length} shiny Pokémon collected
		</p>
	</div>

	<!-- Sort control -->
	{#if $shinies.length > 1}
		<div class="flex items-center gap-2">
			<span class="text-sm font-medium opacity-60">Sort:</span>
			<div class="join">
				<button
					class="btn btn-sm join-item"
					class:btn-primary={sortBy === 'date'}
					class:btn-ghost={sortBy !== 'date'}
					on:click={() => { sortBy = 'date'; }}
				>
					Recent
				</button>
				<button
					class="btn btn-sm join-item"
					class:btn-primary={sortBy === 'encounters'}
					class:btn-ghost={sortBy !== 'encounters'}
					on:click={() => { sortBy = 'encounters'; }}
				>
					Rarest
				</button>
				<button
					class="btn btn-sm join-item"
					class:btn-primary={sortBy === 'name'}
					class:btn-ghost={sortBy !== 'name'}
					on:click={() => { sortBy = 'name'; }}
				>
					Name
				</button>
			</div>
		</div>
	{/if}
</div>

{#if $shiniesLoading}
	<div class="flex justify-center py-16">
		<span class="loading loading-dots loading-lg" style="color: #FFB7C5;"></span>
	</div>
{:else if $shinies.length === 0}
	<div class="flex flex-col items-center py-12">
		<EmptyShinies animate={true} />
		<a href="/hunts" class="btn btn-primary font-bold mt-4">
			🎯 Go to Hunts
		</a>
	</div>
{:else}
	<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
		{#each sorted as shiny, i (shiny.id)}
			<ShinyCard {shiny} rank={i + 1} />
		{/each}
	</div>
{/if}
