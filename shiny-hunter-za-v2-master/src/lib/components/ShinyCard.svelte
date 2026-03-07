<script lang="ts">
	import type { Shiny } from '$lib/types';

	export let shiny: Shiny;
	export let rank: number | null = null;

	let cardElement: HTMLDivElement;
	let isHovered = false;

	$: caughtDate = new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric'
	}).format(new Date(shiny.caughtAt));

	$: durationDisplay =
		shiny.durationMinutes < 60
			? `${shiny.durationMinutes}m`
			: `${Math.floor(shiny.durationMinutes / 60)}h ${shiny.durationMinutes % 60}m`;

	function handleMouseMove(e: MouseEvent) {
		if (!cardElement) return;
		
		const rect = cardElement.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		
		const rotateX = (y - centerY) / 12;
		const rotateY = (centerX - x) / 12;
		
		cardElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.02)`;
	}

	function handleMouseLeave() {
		if (!cardElement) return;
		cardElement.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
		isHovered = false;
	}

	function handleMouseEnter() {
		isHovered = true;
	}

	// Determine rarity tier based on encounters
	$: rarityTier = shiny.encounters > 4000 ? 'legendary' : 
	               shiny.encounters > 2000 ? 'epic' : 
	               shiny.encounters > 1000 ? 'rare' : 'common';
</script>

<div
	bind:this={cardElement}
	class="card border animate-fade-in overflow-hidden relative shiny-card"
	class:hovered={isHovered}
	class:legendary={rarityTier === 'legendary'}
	class:epic={rarityTier === 'epic'}
	class:rare={rarityTier === 'rare'}
	role="article"
	on:mousemove={handleMouseMove}
	on:mouseleave={handleMouseLeave}
	on:mouseenter={handleMouseEnter}
	style="background: linear-gradient(135deg, #FFF8F0 0%, #FFECF2 100%); border-color: #FFB7C5; transition: transform 0.15s ease-out, box-shadow 0.3s ease;"
>
	<!-- Rarity glow effect -->
	{#if isHovered}
		<div class="absolute inset-0 rarity-glow {rarityTier}"></div>
	{/if}

	<!-- Gold shimmer strip for high encounters -->
	{#if shiny.encounters > 1000}
		<div class="absolute top-0 left-0 right-0 h-0.5 shimmer-bg"></div>
	{/if}

	<!-- Rarity badge -->
	{#if shiny.encounters > 1000}
		<div class="absolute top-2 right-2 z-20">
			<span class="rarity-indicator {rarityTier}" title="{shiny.encounters.toLocaleString()} encounters">
				{shiny.encounters > 4000 ? '💎' : shiny.encounters > 2000 ? '✨' : '⭐'}
			</span>
		</div>
	{/if}

	<div class="p-4 relative z-10">
		<!-- Top row: rank + alpha badge -->
		<div class="flex justify-between items-start mb-2">
			{#if rank !== null}
				<span class="text-xs font-mono opacity-40 rank-badge" class:highlight={isHovered}>#{rank}</span>
			{:else}
				<span></span>
			{/if}
			{#if shiny.isAlpha}
				<span class="badge badge-warning badge-sm font-bold alpha-badge" class:pulse={isHovered}>α Alpha</span>
			{/if}
		</div>

		<!-- Sprite -->
		<div class="flex justify-center my-2 relative">
			<img
				src={shiny.shinySpriteUrl}
				alt={shiny.pokemonName}
				width="80"
				height="80"
				class="shiny-glow pokemon-sprite transition-all duration-300"
				class:bounce={isHovered}
			/>
			<span class="absolute -bottom-1 -right-1 text-lg select-none sparkle-icon" class:spin={isHovered}>✨</span>
		</div>

		<!-- Name -->
		<p class="text-center font-bold text-sm mb-3 pokemon-name transition-all duration-300" 
			class:scale-text={isHovered}
			style="color: #2D1B2E;">
			{shiny.pokemonName}
		</p>

		<!-- Stats grid -->
		<div class="grid grid-cols-2 gap-2 text-xs">
			<div class="bg-white/60 rounded-lg p-2 text-center stat-box transition-all duration-300" class:glow={isHovered}>
				<p class="opacity-50 font-medium">Encounters</p>
				<p class="font-bold text-base tabular-nums encounter-count" style="color: #2D1B2E;">
					{shiny.encounters.toLocaleString()}
				</p>
			</div>
			<div class="bg-white/60 rounded-lg p-2 text-center stat-box transition-all duration-300" class:glow={isHovered}>
				<p class="opacity-50 font-medium">Duration</p>
				<p class="font-bold text-base" style="color: #2D1B2E;">{durationDisplay}</p>
			</div>
		</div>

		<!-- Method + date -->
		<div class="mt-2 flex justify-between text-xs opacity-50">
			<span class="method-name">{shiny.method}</span>
			<span>{caughtDate}</span>
		</div>
	</div>
</div>

<style>
	.shiny-card {
		box-shadow: 0 2px 8px rgba(45, 27, 46, 0.08);
	}

	.shiny-card:hover {
		box-shadow: 0 12px 32px rgba(255, 215, 0, 0.25), 0 4px 16px rgba(45, 27, 46, 0.12);
	}

	.shiny-card.legendary:hover {
		box-shadow: 0 12px 32px rgba(255, 215, 0, 0.4), 0 4px 16px rgba(45, 27, 46, 0.15);
		border-color: #FFD700;
	}

	.shiny-card.epic:hover {
		box-shadow: 0 12px 32px rgba(135, 206, 235, 0.4), 0 4px 16px rgba(45, 27, 46, 0.15);
		border-color: #87CEEB;
	}

	.shiny-card.rare:hover {
		box-shadow: 0 12px 32px rgba(255, 183, 197, 0.5), 0 4px 16px rgba(45, 27, 46, 0.12);
	}

	.rarity-glow {
		pointer-events: none;
		opacity: 0;
		animation: glowPulse 2s ease infinite;
	}

	.rarity-glow.legendary {
		background: radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.3) 0%, transparent 50%);
		opacity: 1;
	}

	.rarity-glow.epic {
		background: radial-gradient(circle at 30% 30%, rgba(135, 206, 235, 0.3) 0%, transparent 50%);
		opacity: 1;
	}

	.rarity-glow.rare {
		background: radial-gradient(circle at 30% 30%, rgba(255, 183, 197, 0.3) 0%, transparent 50%);
		opacity: 1;
	}

	@keyframes glowPulse {
		0%, 100% { opacity: 0.4; }
		50% { opacity: 0.8; }
	}

	.rarity-indicator {
		font-size: 1.2rem;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
		transition: transform 0.3s ease;
	}

	.shiny-card:hover .rarity-indicator {
		transform: scale(1.2);
	}

	.pokemon-sprite.bounce {
		animation: gentleBounce 0.6s ease infinite;
	}

	@keyframes gentleBounce {
		0%, 100% { transform: translateY(0) scale(1); }
		50% { transform: translateY(-4px) scale(1.05); }
	}

	.sparkle-icon.spin {
		animation: gentleSpin 2s linear infinite;
	}

	@keyframes gentleSpin {
		0%, 100% { transform: rotate(0deg); }
		25% { transform: rotate(10deg); }
		75% { transform: rotate(-10deg); }
	}

	.rank-badge {
		transition: all 0.3s ease;
	}

	.rank-badge.highlight {
		color: #FFB7C5;
		font-weight: bold;
		transform: scale(1.1);
	}

	.alpha-badge.pulse {
		animation: alphaPulse 1s ease infinite;
	}

	@keyframes alphaPulse {
		0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.4); }
		50% { box-shadow: 0 0 0 8px rgba(251, 191, 36, 0); }
	}

	.scale-text {
		transform: scale(1.05);
	}

	.stat-box.glow {
		background: rgba(255, 255, 255, 0.9);
		box-shadow: 0 2px 8px rgba(255, 183, 197, 0.3);
	}

	.encounter-count {
		transition: color 0.3s ease;
	}

	.shiny-card:hover .encounter-count {
		color: #FFB7C5;
	}

	/* Shimmer animation for the top strip */
	.shimmer-bg {
		background: linear-gradient(
			90deg,
			rgba(255, 215, 0, 0) 0%,
			rgba(255, 215, 0, 0.6) 50%,
			rgba(255, 215, 0, 0) 100%
		);
		background-size: 200% 100%;
		animation: shimmer 2s linear infinite;
	}

	@keyframes shimmer {
		0% { background-position: -200% 0; }
		100% { background-position: 200% 0; }
	}
</style>
