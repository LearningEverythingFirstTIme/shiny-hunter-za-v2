<script lang="ts">
	import type { Pokemon } from '$lib/types';
	import { getSpriteUrl, getShinySpriteUrl } from '$lib/data/pokemon';
	import { createEventDispatcher } from 'svelte';

	export let pokemon: Pokemon;
	export let showShiny = false;
	export let compact = false;

	const dispatch = createEventDispatcher<{ hunt: Pokemon }>();

	let cardElement: HTMLDivElement;
	let isHovered = false;

	function handleImgError(e: Event) {
		(e.currentTarget as HTMLImageElement).src = getSpriteUrl(pokemon.nationalId);
	}

	function handleMouseMove(e: MouseEvent) {
		if (!cardElement || compact) return;
		
		const rect = cardElement.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		
		const rotateX = (y - centerY) / 10;
		const rotateY = (centerX - x) / 10;
		
		cardElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.02)`;
	}

	function handleMouseLeave() {
		if (!cardElement || compact) return;
		cardElement.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
		isHovered = false;
	}

	function handleMouseEnter() {
		isHovered = true;
	}

	$: spriteUrl = showShiny
		? getShinySpriteUrl(pokemon.nationalId)
		: getSpriteUrl(pokemon.nationalId);

	$: paddedId = String(pokemon.id).padStart(3, '0');
</script>

<div
	bind:this={cardElement}
	class="card bg-base-100 border border-base-300 cursor-default animate-fade-in overflow-hidden relative"
	class:p-3={compact}
	class:p-4={!compact}
	class:compact={compact}
	class:enhanced={!compact}
	class:hovered={isHovered}
	role="article"
	on:mousemove={handleMouseMove}
	on:mouseleave={handleMouseLeave}
	on:mouseenter={handleMouseEnter}
	style="transition: transform 0.15s ease-out, box-shadow 0.3s ease;"
>
	<!-- Shiny sparkle effect overlay -->
	{#if showShiny && isHovered}
		<div class="absolute inset-0 pointer-events-none shiny-sparkle-overlay"></div>
	{/if}

	<!-- Pokemon number -->
	<div class="flex items-start justify-between mb-1 relative z-10">
		<span class="text-xs opacity-40 font-mono font-bold pokemon-number transition-all duration-300" 
			class:text-primary={isHovered}
			class:opacity-100={isHovered}>
			#{paddedId}
		</span>
		{#if showShiny}
			<span class="text-xs font-bold shiny-badge" class:glow={isHovered}>✦ Shiny</span>
		{/if}
	</div>

	<!-- Sprite -->
	<div class="flex justify-center my-2 relative z-10">
		<img
			src={spriteUrl}
			alt={pokemon.name}
			width={compact ? 64 : 80}
			height={compact ? 64 : 80}
			class="transition-all duration-300 pokemon-sprite"
			class:sprite-shadow={!showShiny}
			class:shiny-glow={showShiny}
			class:bounce={isHovered}
			on:error={handleImgError}
		/>
	</div>

	<!-- Name -->
	<p class="text-center font-semibold text-sm mb-2 truncate relative z-10 pokemon-name transition-all duration-300"
		class:font-bold={isHovered}
		style="color: #2D1B2E;">
		{pokemon.name}
	</p>

	<!-- Types -->
	<div class="flex justify-center gap-1 flex-wrap mb-3 relative z-10">
		{#each pokemon.types as type}
			<span class="type-badge type-{type} transition-all duration-300"
				class:scale-110={isHovered}>{type}</span>
		{/each}
	</div>

	<!-- Hunt button -->
	{#if !compact}
		<button
			class="btn btn-primary btn-sm w-full font-bold relative z-10 hunt-btn transition-all duration-300"
			class:btn-lg={isHovered}
			on:click={() => dispatch('hunt', pokemon)}
		>
			🎯 Start Hunt
		</button>
	{/if}
</div>

<style>
	.card.enhanced {
		box-shadow: 0 2px 8px rgba(45, 27, 46, 0.08);
	}

	.card.enhanced:hover {
		box-shadow: 0 12px 32px rgba(255, 183, 197, 0.35), 0 4px 16px rgba(45, 27, 46, 0.12);
		border-color: #FFB7C5;
	}

	.card.enhanced::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%);
		opacity: 0;
		transition: opacity 0.3s ease;
		pointer-events: none;
	}

	.card.enhanced:hover::before {
		opacity: 1;
	}

	.pokemon-sprite.bounce {
		animation: gentleBounce 0.6s ease infinite;
	}

	@keyframes gentleBounce {
		0%, 100% { transform: translateY(0) scale(1); }
		50% { transform: translateY(-4px) scale(1.05); }
	}

	.shiny-badge {
		color: #FFD700;
		transition: all 0.3s ease;
	}

	.shiny-badge.glow {
		text-shadow: 0 0 8px rgba(255, 215, 0, 0.8), 0 0 16px rgba(255, 215, 0, 0.4);
		animation: shimmerText 1.5s ease infinite;
	}

	@keyframes shimmerText {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.7; }
	}

	.shiny-sparkle-overlay {
		background: radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.3) 0%, transparent 30%),
		            radial-gradient(circle at 80% 70%, rgba(255, 183, 197, 0.3) 0%, transparent 30%);
		animation: sparkleFade 1s ease-out forwards;
	}

	@keyframes sparkleFade {
		0% { opacity: 0; }
		50% { opacity: 1; }
		100% { opacity: 0; }
	}

	.hunt-btn {
		transform-origin: center;
	}
</style>
