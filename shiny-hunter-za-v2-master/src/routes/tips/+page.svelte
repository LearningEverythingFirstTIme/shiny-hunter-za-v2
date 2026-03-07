<script lang="ts">
	const methods = [
		{
			name: 'Random Encounter',
			icon: '🌿',
			color: '#78C850',
			description: 'Wander through tall grass or caves and encounter Pokémon at random.',
			tips: [
				'Save the game before entering an area with your target.',
				'Use the Poké Radar chain method to boost encounter rates.',
				'Certain weather conditions can increase specific type encounters.',
				'Keep a counter running — every battle counts!'
			],
			avgRate: '1/4096',
			difficulty: 'Easy'
		},
		{
			name: 'Mass Outbreak',
			icon: '🌊',
			color: '#6890F0',
			description: 'Large groups of one Pokémon appear together, with a dramatically boosted shiny rate.',
			tips: [
				'Check the map each day for new outbreaks.',
				'Completing Pokédex research boosts odds in this method.',
				'Clear outbreak waves quickly to reset and potentially find shinies sooner.',
				'Bring lots of Poké Balls — you want to catch, not faint.'
			],
			avgRate: '1/128+',
			difficulty: 'Medium'
		},
		{
			name: 'Alpha Hunt',
			icon: '⚡',
			color: '#F85888',
			description: 'Seek out oversized Alpha Pokémon, which can also appear as sparkling shinies.',
			tips: [
				'Alphas respawn after changing the time of day.',
				'An alpha shiny has both the alpha glow and shiny sparkle effects.',
				'Be prepared for a tough battle — Alphas hit hard.',
				'Use Smoke Bombs to approach without triggering a chase.'
			],
			avgRate: '1/4096',
			difficulty: 'Hard'
		},
		{
			name: 'Dex Research',
			icon: '📖',
			color: '#A890F0',
			description: 'Complete specific Pokédex research tasks to earn permanent odds boosts for a species.',
			tips: [
				'Reach Research Level 10 for a Pokémon to unlock the full odds boost.',
				'Complete the "perfect" Pokédex entry for even better odds.',
				'Combine with Mass Outbreaks for maximum efficiency.',
				'Focus on Pokémon you actually want to shiny hunt first.'
			],
			avgRate: '1/1024',
			difficulty: 'Medium'
		},
		{
			name: 'Roaming',
			icon: '🦅',
			color: '#F08030',
			description: 'Legendary or rare Pokémon that move freely around the map.',
			tips: [
				'Use Smoke Bombs to sneak up and observe before engaging.',
				'Fly back to base and return to reset a roaming Pokémon\'s position.',
				'Have Quick Balls ready — roaming Pokémon can flee.',
				'Track roamers on your map; their icon will be visible once spotted.'
			],
			avgRate: '1/4096',
			difficulty: 'Hard'
		}
	];

	const generalTips = [
		{ icon: '💾', tip: 'Save frequently. If you accidentally faint a shiny, you\'ll want a recent save.' },
		{ icon: '🎒', tip: 'Stock up on Poké Balls before long hunts. Run out and you\'ll regret it.' },
		{ icon: '🔊', tip: 'Turn on sound! The distinctive shiny sparkle sound cue is impossible to miss.' },
		{ icon: '📱', tip: 'Use this tracker to log every encounter — streaks and accurate counts matter.' },
		{ icon: '⏰', tip: 'Take breaks. Shiny hunting is a marathon, not a sprint.' },
		{ icon: '🌟', tip: 'The odds never change — every encounter is independent. Stay patient!' }
	];
</script>

<svelte:head>
	<title>Tips – Shiny Hunter Z-A</title>
</svelte:head>

<div class="mb-6">
	<h1 class="page-header">💡 Hunting Tips</h1>
	<p class="page-subheader">Guides for each hunting method in Pokémon Legends: Z-A</p>
</div>

<!-- Method cards -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
	{#each methods as method}
		<div class="card bg-base-100 border border-base-300 p-5 animate-fade-in">
			<!-- Header -->
			<div class="flex items-center gap-3 mb-3">
				<span class="text-3xl">{method.icon}</span>
				<div>
					<h2 class="font-black text-lg" style="color: #2D1B2E;">{method.name}</h2>
					<div class="flex gap-2 mt-0.5">
						<span class="badge badge-sm" style="background-color: {method.color}; color: white; border: none;">
							{method.difficulty}
						</span>
						<span class="badge badge-ghost badge-sm font-mono">{method.avgRate} rate</span>
					</div>
				</div>
			</div>

			<!-- Description -->
			<p class="text-sm opacity-70 mb-3">{method.description}</p>

			<!-- Tips list -->
			<ul class="space-y-1.5">
				{#each method.tips as tip}
					<li class="flex gap-2 text-sm">
						<span style="color: {method.color};" class="flex-shrink-0 font-bold mt-0.5">›</span>
						<span>{tip}</span>
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</div>

<!-- General tips -->
<div class="card bg-base-100 border border-base-300 p-5">
	<h2 class="font-black text-lg mb-4" style="color: #2D1B2E;">🌟 General Tips</h2>
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
		{#each generalTips as { icon, tip }}
			<div class="flex gap-3 items-start">
				<span class="text-xl flex-shrink-0">{icon}</span>
				<p class="text-sm opacity-80">{tip}</p>
			</div>
		{/each}
	</div>
</div>

<!-- Odds reference table -->
<div class="card bg-base-100 border border-base-300 p-5 mt-4">
	<h2 class="font-black text-lg mb-4" style="color: #2D1B2E;">📊 Base Shiny Odds Reference</h2>
	<div class="overflow-x-auto">
		<table class="table table-sm">
			<thead>
				<tr>
					<th>Condition</th>
					<th class="text-right">Odds</th>
					<th class="text-right">~Chance %</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Base rate</td>
					<td class="text-right font-mono">1 / 4096</td>
					<td class="text-right font-mono">0.024%</td>
				</tr>
				<tr>
					<td>Research Level 10</td>
					<td class="text-right font-mono">1 / 2048</td>
					<td class="text-right font-mono">0.049%</td>
				</tr>
				<tr>
					<td>Perfect Pokédex entry</td>
					<td class="text-right font-mono">1 / 1024</td>
					<td class="text-right font-mono">0.098%</td>
				</tr>
				<tr>
					<td>Mass Outbreak (base)</td>
					<td class="text-right font-mono">1 / 128</td>
					<td class="text-right font-mono">0.781%</td>
				</tr>
				<tr class="font-bold" style="color: #2D1B2E;">
					<td>Mass Outbreak + Perfect Entry</td>
					<td class="text-right font-mono">1 / 64</td>
					<td class="text-right font-mono">1.563%</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
