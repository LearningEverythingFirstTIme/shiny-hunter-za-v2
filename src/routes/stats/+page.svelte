<script lang="ts">
	import { shinies, stats } from '$lib/stores/shinies';
	import { hunts } from '$lib/stores/hunts';

	function formatMinutes(min: number): string {
		if (min < 60) return `${min}m`;
		const h = Math.floor(min / 60);
		const m = min % 60;
		return m > 0 ? `${h}h ${m}m` : `${h}h`;
	}

	const typeColors: Record<string, string> = {
		Normal: '#A8A878', Fire: '#F08030', Water: '#6890F0',
		Grass: '#78C850', Electric: '#F8D030', Ice: '#98D8D8',
		Fighting: '#C03028', Poison: '#A040A0', Ground: '#E0C068',
		Flying: '#A890F0', Psychic: '#F85888', Bug: '#A8B820',
		Rock: '#B8A038', Ghost: '#705898', Dragon: '#7038F8',
		Dark: '#705848', Steel: '#B8B8D0', Fairy: '#EE99AC'
	};

	// Type breakdown from shinies
	$: typeBreakdown = (() => {
		const counts: Record<string, number> = {};
		for (const s of $shinies) {
			// Look up types from pokemon data would be ideal, but we store method not types
			// Use method distribution instead
		}
		return counts;
	})();

	$: methodBreakdown = (() => {
		const counts: Record<string, number> = {};
		for (const s of $shinies) {
			counts[s.method] = (counts[s.method] ?? 0) + 1;
		}
		return Object.entries(counts).sort((a, b) => b[1] - a[1]);
	})();

	$: alphaCount = $shinies.filter((s) => s.isAlpha).length;
</script>

<svelte:head>
	<title>Stats – Shiny Hunter Z-A</title>
</svelte:head>

<div class="mb-6">
	<h1 class="page-header">📊 Hunt Statistics</h1>
	<p class="page-subheader">Your shiny hunting journey in numbers</p>
</div>

{#if $shinies.length === 0 && $hunts.length === 0}
	<div class="text-center py-20">
		<div class="text-6xl mb-4">📊</div>
		<h2 class="text-xl font-bold mb-2" style="color: #2D1B2E;">No data yet</h2>
		<p class="text-sm opacity-60 mb-6">Start hunting to see your statistics here!</p>
		<a href="/pokedex" class="btn btn-primary font-bold">📖 Go to Pokédex</a>
	</div>
{:else}
	<!-- Overview stats -->
	<div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
		<div class="stat bg-base-100 border border-base-300 rounded-2xl py-4 px-5">
			<div class="stat-figure text-3xl">✨</div>
			<div class="stat-title text-xs">Total Shinies</div>
			<div class="stat-value text-3xl" style="color: #2D1B2E;">{$stats.totalShinies}</div>
		</div>
		<div class="stat bg-base-100 border border-base-300 rounded-2xl py-4 px-5">
			<div class="stat-figure text-3xl">⚔️</div>
			<div class="stat-title text-xs">Total Encounters</div>
			<div class="stat-value text-2xl" style="color: #2D1B2E;">{$stats.totalEncounters.toLocaleString()}</div>
		</div>
		<div class="stat bg-base-100 border border-base-300 rounded-2xl py-4 px-5">
			<div class="stat-figure text-3xl">🎯</div>
			<div class="stat-title text-xs">Active Hunts</div>
			<div class="stat-value text-3xl" style="color: #2D1B2E;">{$hunts.length}</div>
		</div>
		<div class="stat bg-base-100 border border-base-300 rounded-2xl py-4 px-5">
			<div class="stat-figure text-3xl">⏱️</div>
			<div class="stat-title text-xs">Total Hunt Time</div>
			<div class="stat-value text-2xl" style="color: #2D1B2E;">{formatMinutes($stats.totalHuntTime)}</div>
		</div>
	</div>

	{#if $stats.totalShinies > 0}
		<!-- Secondary stats -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
			<div class="card bg-base-100 border border-base-300 p-4">
				<p class="text-xs opacity-50 font-semibold mb-1">AVG. ENCOUNTERS</p>
				<p class="text-2xl font-black" style="color: #2D1B2E;">{$stats.averageEncounters.toLocaleString()}</p>
				<p class="text-xs opacity-40 mt-1">per shiny</p>
			</div>
			<div class="card bg-base-100 border border-base-300 p-4">
				<p class="text-xs opacity-50 font-semibold mb-1">ALPHA SHINIES</p>
				<p class="text-2xl font-black" style="color: #2D1B2E;">{alphaCount}</p>
				<p class="text-xs opacity-40 mt-1">
					{$stats.totalShinies > 0 ? Math.round((alphaCount / $stats.totalShinies) * 100) : 0}% of total
				</p>
			</div>
			<div class="card bg-base-100 border border-base-300 p-4">
				<p class="text-xs opacity-50 font-semibold mb-1">FAVORITE METHOD</p>
				<p class="text-lg font-black leading-tight" style="color: #2D1B2E;">{$stats.favoriteMethod ?? '—'}</p>
				<p class="text-xs opacity-40 mt-1">most used</p>
			</div>
		</div>

		<!-- Luckiest / Rarest -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
			<!-- Luckiest -->
			{#if $stats.luckiest}
				<div class="card bg-base-100 border-2 p-4" style="border-color: #87CEEB;">
					<p class="text-xs font-bold mb-3" style="color: #87CEEB;">🍀 LUCKIEST HUNT</p>
					<div class="flex items-center gap-3">
						<img
							src={$stats.luckiest.shinySpriteUrl}
							alt={$stats.luckiest.pokemonName}
							width="56"
							height="56"
							class="shiny-glow"
						/>
						<div>
							<p class="font-bold" style="color: #2D1B2E;">{$stats.luckiest.pokemonName}</p>
							<p class="text-sm opacity-60">{$stats.luckiest.method}</p>
							<p class="text-xl font-black tabular-nums" style="color: #2D1B2E;">
								{$stats.luckiest.encounters.toLocaleString()} enc.
							</p>
						</div>
					</div>
				</div>
			{/if}

			<!-- Rarest -->
			{#if $stats.rarest}
				<div class="card bg-base-100 border-2 p-4" style="border-color: #FFD700;">
					<p class="text-xs font-bold mb-3" style="color: #B8860B;">💎 RAREST HUNT</p>
					<div class="flex items-center gap-3">
						<img
							src={$stats.rarest.shinySpriteUrl}
							alt={$stats.rarest.pokemonName}
							width="56"
							height="56"
							class="shiny-glow"
						/>
						<div>
							<p class="font-bold" style="color: #2D1B2E;">{$stats.rarest.pokemonName}</p>
							<p class="text-sm opacity-60">{$stats.rarest.method}</p>
							<p class="text-xl font-black tabular-nums" style="color: #2D1B2E;">
								{$stats.rarest.encounters.toLocaleString()} enc.
							</p>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Method breakdown -->
		{#if methodBreakdown.length > 0}
			<div class="card bg-base-100 border border-base-300 p-5">
				<h3 class="font-bold mb-4" style="color: #2D1B2E;">Method Breakdown</h3>
				<div class="space-y-3">
					{#each methodBreakdown as [method, count]}
						{@const pct = Math.round((count / $stats.totalShinies) * 100)}
						<div>
							<div class="flex justify-between text-sm mb-1">
								<span class="font-medium">{method}</span>
								<span class="opacity-60">{count} ({pct}%)</span>
							</div>
							<progress
								class="progress w-full h-2"
								style="--tw-bg-opacity: 1;"
								value={pct}
								max="100"
							></progress>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	{/if}
{/if}
