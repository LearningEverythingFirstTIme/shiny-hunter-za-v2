<script lang="ts">
	import type { Shiny } from '$lib/types';

	export let shiny: Shiny;
	export let rank: number | null = null;

	$: caughtDate = new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric'
	}).format(new Date(shiny.caughtAt));

	$: durationDisplay =
		shiny.durationMinutes < 60
			? `${shiny.durationMinutes}m`
			: `${Math.floor(shiny.durationMinutes / 60)}h ${shiny.durationMinutes % 60}m`;
</script>

<div
	class="card border animate-fade-in overflow-hidden relative"
	style="background: linear-gradient(135deg, #FFF8F0 0%, #FFECF2 100%); border-color: #FFB7C5;"
>
	<!-- Gold shimmer strip for high encounters -->
	{#if shiny.encounters > 1000}
		<div class="absolute top-0 left-0 right-0 h-0.5 shimmer-bg"></div>
	{/if}

	<div class="p-4">
		<!-- Top row: rank + alpha badge -->
		<div class="flex justify-between items-start mb-2">
			{#if rank !== null}
				<span class="text-xs font-mono opacity-40">#{rank}</span>
			{:else}
				<span></span>
			{/if}
			{#if shiny.isAlpha}
				<span class="badge badge-warning badge-sm font-bold">α Alpha</span>
			{/if}
		</div>

		<!-- Sprite -->
		<div class="flex justify-center my-2 relative">
			<img
				src={shiny.shinySpriteUrl}
				alt={shiny.pokemonName}
				width="80"
				height="80"
				class="shiny-glow"
			/>
			<span class="absolute -bottom-1 -right-1 text-lg select-none">✨</span>
		</div>

		<!-- Name -->
		<p class="text-center font-bold text-sm mb-3" style="color: #2D1B2E;">
			{shiny.pokemonName}
		</p>

		<!-- Stats grid -->
		<div class="grid grid-cols-2 gap-2 text-xs">
			<div class="bg-white/60 rounded-lg p-2 text-center">
				<p class="opacity-50 font-medium">Encounters</p>
				<p class="font-bold text-base tabular-nums" style="color: #2D1B2E;">
					{shiny.encounters.toLocaleString()}
				</p>
			</div>
			<div class="bg-white/60 rounded-lg p-2 text-center">
				<p class="opacity-50 font-medium">Duration</p>
				<p class="font-bold text-base" style="color: #2D1B2E;">{durationDisplay}</p>
			</div>
		</div>

		<!-- Method + date -->
		<div class="mt-2 flex justify-between text-xs opacity-50">
			<span>{shiny.method}</span>
			<span>{caughtDate}</span>
		</div>
	</div>
</div>
