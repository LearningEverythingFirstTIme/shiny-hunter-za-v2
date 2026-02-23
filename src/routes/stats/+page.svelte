<script lang="ts">
	import { shinies, stats } from '$lib/stores/shinies';
	import { hunts } from '$lib/stores/hunts';
	import MethodChart from '$lib/components/MethodChart.svelte';
	import { EmptyStats } from '$lib/components/illustrations';

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

	// Method breakdown from shinies
	$: methodBreakdown = (() => {
		const counts: Record<string, number> = {};
		for (const s of $shinies) {
			counts[s.method] = (counts[s.method] ?? 0) + 1;
		}
		return Object.entries(counts).sort((a, b) => b[1] - a[1]);
	})();

	// Chart data format
	$: chartData = methodBreakdown.map(([method, count]) => ({
		method,
		count,
		color: '#FFB7C5'
	}));

	$: alphaCount = $shinies.filter((s) => s.isAlpha).length;

	// Calculate encounter distribution
	$: encounterDistribution = (() => {
		if ($shinies.length === 0) return [];
		const ranges = [
			{ label: '< 100', min: 0, max: 100, color: '#86efac' },
			{ label: '100-500', min: 100, max: 500, color: '#87CEEB' },
			{ label: '500-1k', min: 500, max: 1000, color: '#FFB7C5' },
			{ label: '1k-2k', min: 1000, max: 2000, color: '#F85888' },
			{ label: '2k+', min: 2000, max: Infinity, color: '#FFD700' }
		];
		
		return ranges.map(range => ({
			...range,
			count: $shinies.filter(s => s.encounters >= range.min && s.encounters < range.max).length
		})).filter(r => r.count > 0);
	})();
</script>

<svelte:head>
	<title>Stats – Shiny Hunter Z-A</title>
</svelte:head>

<div class="mb-6">
	<h1 class="page-header">📊 Hunt Statistics</h1>
	<p class="page-subheader">Your shiny hunting journey in numbers</p>
</div>

{#if $shinies.length === 0 && $hunts.length === 0}
	<div class="flex flex-col items-center py-12">
		<EmptyStats animate={true} />
		<a href="/pokedex" class="btn btn-primary font-bold mt-4">📖 Go to Pokédex</a>
	</div>
{:else}
	<!-- Overview stats -->
	<div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
		<div class="stat-card bg-base-100 border border-base-300 rounded-2xl py-4 px-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
			<div class="stat-figure text-3xl mb-1">✨</div>
			<div class="stat-title text-xs opacity-60">Total Shinies</div>
			<div class="stat-value text-3xl font-black" style="color: #2D1B2E;">{$stats.totalShinies}</div>
		</div>
		<div class="stat-card bg-base-100 border border-base-300 rounded-2xl py-4 px-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
			<div class="stat-figure text-3xl mb-1">⚔️</div>
			<div class="stat-title text-xs opacity-60">Total Encounters</div>
			<div class="stat-value text-2xl font-black" style="color: #2D1B2E;">{$stats.totalEncounters.toLocaleString()}</div>
		</div>
		<div class="stat-card bg-base-100 border border-base-300 rounded-2xl py-4 px-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
			<div class="stat-figure text-3xl mb-1">🎯</div>
			<div class="stat-title text-xs opacity-60">Active Hunts</div>
			<div class="stat-value text-3xl font-black" style="color: #2D1B2E;">{$hunts.length}</div>
		</div>
		<div class="stat-card bg-base-100 border border-base-300 rounded-2xl py-4 px-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
			<div class="stat-figure text-3xl mb-1">⏱️</div>
			<div class="stat-title text-xs opacity-60">Total Hunt Time</div>
			<div class="stat-value text-2xl font-black" style="color: #2D1B2E;">{formatMinutes($stats.totalHuntTime)}</div>
		</div>
	</div>

	{#if $stats.totalShinies > 0}
		<!-- Charts section -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
			<!-- Method breakdown chart -->
			<div class="card bg-base-100 border border-base-300 p-5 chart-card transition-all duration-300 hover:shadow-lg">
				<h3 class="font-bold mb-4 flex items-center gap-2" style="color: #2D1B2E;">
					<span>🎯</span> Method Breakdown
				</h3>
				{#if chartData.length > 0}
					<MethodChart data={chartData} />
				{:else}
					<div class="h-64 flex items-center justify-center opacity-50">
						<p>No data available</p>
					</div>
				{/if}
			</div>

			<!-- Encounter distribution -->
			<div class="card bg-base-100 border border-base-300 p-5 chart-card transition-all duration-300 hover:shadow-lg">
				<h3 class="font-bold mb-4 flex items-center gap-2" style="color: #2D1B2E;">
					<span>📈</span> Encounter Distribution
				</h3>
				{#if encounterDistribution.length > 0}
					<div class="space-y-3">
						{#each encounterDistribution as range}
							{@const total = $shinies.length}
							{@const pct = Math.round((range.count / total) * 100)}
							<div class="flex items-center gap-3">
								<span class="text-xs font-medium w-16">{range.label}</span>
								<div class="flex-1 h-3 bg-base-200 rounded-full overflow-hidden">
									<div class="h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden"
										style="width: {pct}%; background-color: {range.color};">
										<div class="absolute inset-0 shimmer-effect"></div>
									</div>
								</div>
								<span class="text-xs font-bold w-10 text-right">{pct}%</span>
								<span class="text-xs opacity-50 w-8 text-right">({range.count})</span>
							</div>
						{/each}
					</div>
					<p class="text-xs opacity-50 mt-4 text-center">
						Distribution of shinies by encounter count
					</p>
				{:else}
					<div class="h-48 flex items-center justify-center opacity-50">
						<p>No data available</p>
					</div>
				{/if}
			</div>
		</div>

		<!-- Secondary stats -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
			<div class="card bg-base-100 border border-base-300 p-4 secondary-stat transition-all duration-300 hover:shadow-md hover:border-primary/30">
				<p class="text-xs opacity-50 font-semibold mb-1">AVG. ENCOUNTERS</p>
				<p class="text-2xl font-black" style="color: #2D1B2E;">{$stats.averageEncounters.toLocaleString()}</p>
				<p class="text-xs opacity-40 mt-1">per shiny</p>
			</div>
			<div class="card bg-base-100 border border-base-300 p-4 secondary-stat transition-all duration-300 hover:shadow-md hover:border-warning/30">
				<p class="text-xs opacity-50 font-semibold mb-1">ALPHA SHINIES</p>
				<p class="text-2xl font-black" style="color: #2D1B2E;">{alphaCount}</p>
				<p class="text-xs opacity-40 mt-1">
					{$stats.totalShinies > 0 ? Math.round((alphaCount / $stats.totalShinies) * 100) : 0}% of total
				</p>
			</div>
			<div class="card bg-base-100 border border-base-300 p-4 secondary-stat transition-all duration-300 hover:shadow-md hover:border-secondary/30">
				<p class="text-xs opacity-50 font-semibold mb-1">FAVORITE METHOD</p>
				<p class="text-lg font-black leading-tight" style="color: #2D1B2E;">{$stats.favoriteMethod ?? '—'}</p>
				<p class="text-xs opacity-40 mt-1">most used</p>
			</div>
		</div>

		<!-- Luckiest / Rarest -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
			<!-- Luckiest -->
			{#if $stats.luckiest}
				<div class="card bg-base-100 border-2 p-4 luckiest-card transition-all duration-300 hover:shadow-lg" 
					style="border-color: #87CEEB;">
					<p class="text-xs font-bold mb-3 flex items-center gap-1" style="color: #87CEEB;">
						<span>🍀</span> LUCKIEST HUNT
					</p>
					<div class="flex items-center gap-3">
						<div class="sprite-wrapper">
							<img
								src={$stats.luckiest.shinySpriteUrl}
								alt={$stats.luckiest.pokemonName}
								width="56"
								height="56"
								class="shiny-glow"
							/>
						</div>
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
				<div class="card bg-base-100 border-2 p-4 rarest-card transition-all duration-300 hover:shadow-lg" 
					style="border-color: #FFD700;">
					<p class="text-xs font-bold mb-3 flex items-center gap-1" style="color: #B8860B;">
						<span>💎</span> RAREST HUNT
					</p>
					<div class="flex items-center gap-3">
						<div class="sprite-wrapper">
							<img
								src={$stats.rarest.shinySpriteUrl}
								alt={$stats.rarest.pokemonName}
								width="56"
								height="56"
								class="shiny-glow"
							/>
						</div>
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
			<div class="card bg-base-100 border border-base-300 p-5 method-list-card">
				<h3 class="font-bold mb-4" style="color: #2D1B2E;">Method Breakdown</h3>
				<div class="space-y-3">
					{#each methodBreakdown as [method, count]}
						{@const pct = Math.round((count / $stats.totalShinies) * 100)}
						<div class="method-row group">
							<div class="flex justify-between text-sm mb-1">
								<span class="font-medium group-hover:text-primary transition-colors">{method}</span>
								<span class="opacity-60">{count} ({pct}%)</span>
							</div>
							<div class="h-2 bg-base-200 rounded-full overflow-hidden">
								<div class="h-full rounded-full progress-fill transition-all duration-500 relative overflow-hidden"
									style="width: {pct}%;">
									<div class="absolute inset-0 shimmer-effect"></div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	{/if}
{/if}

<style>
	.stat-card {
		position: relative;
		overflow: hidden;
	}

	.stat-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(90deg, #FFB7C5, #87CEEB);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.stat-card:hover::before {
		opacity: 1;
	}

	.stat-card:hover {
		border-color: #FFB7C5;
	}

	.chart-card:hover {
		border-color: #FFB7C5;
	}

	.secondary-stat:hover {
		transform: translateY(-2px);
	}

	.luckiest-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 24px rgba(135, 206, 235, 0.25);
	}

	.rarest-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 24px rgba(255, 215, 0, 0.25);
	}

	.sprite-wrapper {
		position: relative;
	}

	.sprite-wrapper::after {
		content: '';
		position: absolute;
		inset: -4px;
		background: radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%);
		border-radius: 50%;
		z-index: -1;
	}

	.shimmer-effect {
		background: linear-gradient(
			90deg,
			transparent,
			rgba(255, 255, 255, 0.4),
			transparent
		);
		animation: shimmer 2s infinite;
	}

	@keyframes shimmer {
		0% { transform: translateX(-100%); }
		100% { transform: translateX(100%); }
	}

	.method-row:hover .progress-fill {
		background: linear-gradient(90deg, #FFB7C5, #FF91A4);
	}

	.progress-fill {
		background: linear-gradient(90deg, #FFB7C5, #87CEEB);
	}

	.method-list-card {
		transition: all 0.3s ease;
	}

	.method-list-card:hover {
		box-shadow: 0 4px 16px rgba(255, 183, 197, 0.15);
	}
</style>
