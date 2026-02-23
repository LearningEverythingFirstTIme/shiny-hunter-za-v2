<script lang="ts">
	import { hunts, huntsLoading } from '$lib/stores/hunts';
	import HuntCard from '$lib/components/HuntCard.svelte';
	import Celebration from '$lib/components/Celebration.svelte';
	import { EmptyHunts } from '$lib/components/illustrations';
	import type { Hunt } from '$lib/types';

	let celebrationHunt: Hunt | null = null;

	function handleComplete(e: CustomEvent<Hunt>) {
		celebrationHunt = e.detail;
	}
</script>

<svelte:head>
	<title>Active Hunts – Shiny Hunter Z-A</title>
</svelte:head>

<div class="mb-6">
	<h1 class="page-header">🎯 Active Hunts</h1>
	<p class="page-subheader">Manage your ongoing shiny hunts</p>
</div>

{#if $huntsLoading}
	<div class="flex justify-center py-16">
		<span class="loading loading-dots loading-lg" style="color: #FFB7C5;"></span>
	</div>
{:else if $hunts.length === 0}
	<div class="flex flex-col items-center py-12">
		<EmptyHunts animate={true} />
		<a href="/pokedex" class="btn btn-primary font-bold mt-4">
			📖 Go to Pokédex
		</a>
	</div>
{:else}
	<div class="mb-3 flex items-center justify-between">
		<p class="text-sm opacity-60">
			{$hunts.length} active {$hunts.length === 1 ? 'hunt' : 'hunts'}
		</p>
		<a href="/pokedex" class="btn btn-ghost btn-sm">+ New Hunt</a>
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
		{#each $hunts as hunt (hunt.id)}
			<HuntCard {hunt} on:complete={handleComplete} />
		{/each}
	</div>
{/if}

<!-- Celebration overlay -->
{#if celebrationHunt}
	<Celebration
		hunt={celebrationHunt}
		on:close={() => { celebrationHunt = null; }}
	/>
{/if}
