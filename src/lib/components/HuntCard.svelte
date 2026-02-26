<script lang="ts">
	import type { Hunt } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import { updateEncounters, completeHunt, abandonHunt, resumeHunt, pauseHunt, updateHuntNotes, updateHuntMethod } from '$lib/stores/hunts';
	import { HUNT_METHODS, POKEMON, formatEVs } from '$lib/data/pokemon';

	export let hunt: Hunt;

	const dispatch = createEventDispatcher<{ complete: Hunt }>();

	let cardElement: HTMLDivElement;
	let isHovered = false;
	let completing = false;
	let abandoning = false;
	let pausing = false;
	let isAlpha = false;
	
	let showNotes = false;
	let notes = hunt.notes || '';
	let savingNotes = false;
	
	let showMethodEdit = false;
	let selectedMethod = hunt.method;
	let savingMethod = false;
	
	let showBulkAdd = false;

	// Tick every minute so elapsed time + enc/hr stay fresh
	let now = Date.now();
	const ticker = setInterval(() => { now = Date.now(); }, 60_000);
	import { onDestroy } from 'svelte';
	onDestroy(() => clearInterval(ticker));

	$: elapsedMs = hunt.isPaused && hunt.pausedAt
		? new Date(hunt.pausedAt).getTime() - new Date(hunt.startedAt).getTime() - (hunt.totalPausedMinutes || 0) * 60_000
		: now - new Date(hunt.startedAt).getTime() - (hunt.totalPausedMinutes || 0) * 60_000;
	$: elapsedMinutes = Math.max(1, Math.round(elapsedMs / 60_000));

	$: elapsedDisplay =
		elapsedMinutes < 60
			? `${elapsedMinutes}m`
			: `${Math.floor(elapsedMinutes / 60)}h ${elapsedMinutes % 60}m`;

	// Encounters per hour
	$: encPerHour = Math.round((hunt.encounters / elapsedMinutes) * 60);
	$: encPerHourDisplay =
		encPerHour >= 1000
			? `${(encPerHour / 1000).toFixed(1)}k/hr`
			: `${encPerHour}/hr`;

	// Progress towards odds (1/4096)
	$: progressToOdds = Math.min(100, (hunt.encounters / 4096) * 100);
	$: progressColor = progressToOdds >= 100 ? '#FFD700' : progressToOdds >= 50 ? '#87CEEB' : '#FFB7C5';

	// Find Pokemon to get EVs
	$: pokemon = POKEMON.find(p => p.name === hunt.pokemonName);

	async function onIncrement(delta: number) {
		if (!hunt.id) return;
		await updateEncounters(hunt.id, delta, hunt.encounters);
	}

	async function onComplete() {
		if (!hunt.id || completing) return;
		completing = true;
		try {
			await completeHunt(hunt, isAlpha);
			dispatch('complete', hunt);
		} catch {
			// error toast already shown by store
		} finally {
			completing = false;
		}
	}

	async function onAbandon() {
		if (!hunt.id || abandoning) return;
		if (!confirm(`Abandon hunt for ${hunt.pokemonName}? This cannot be undone.`)) return;
		abandoning = true;
		try {
			await abandonHunt(hunt.id);
		} catch {
			// error toast already shown by store
		} finally {
			abandoning = false;
		}
	}

	async function onPauseResume() {
		if (!hunt.id || pausing) return;
		pausing = true;
		try {
			if (hunt.isPaused && hunt.pausedAt) {
				const additionalPausedMs = now - new Date(hunt.pausedAt).getTime();
				const additionalPausedMinutes = Math.round(additionalPausedMs / 60_000);
				const newTotalPaused = (hunt.totalPausedMinutes || 0) + additionalPausedMinutes;
				await resumeHunt(hunt.id, newTotalPaused);
			} else {
				await pauseHunt(hunt.id);
			}
		} finally {
			pausing = false;
		}
	}

	async function onSaveNotes() {
		if (!hunt.id || savingNotes) return;
		savingNotes = true;
		try {
			await updateHuntNotes(hunt.id, notes);
			showNotes = false;
		} finally {
			savingNotes = false;
		}
	}

	async function onSaveMethod() {
		if (!hunt.id || savingMethod || selectedMethod === hunt.method) return;
		savingMethod = true;
		try {
			await updateHuntMethod(hunt.id, selectedMethod);
			showMethodEdit = false;
		} finally {
			savingMethod = false;
		}
	}

	function handleMouseMove(e: MouseEvent) {
		// Skip tilt effect on touch devices to prevent panel movement when clicking buttons
		if (window.matchMedia('(pointer: coarse)').matches) return;
		if (!cardElement) return;
		
		const rect = cardElement.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		
		const rotateX = (y - centerY) / 15;
		const rotateY = (centerX - x) / 15;
		
		cardElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.01)`;
	}

	function handleMouseLeave() {
		if (!cardElement) return;
		// Only reset transform if not on touch device (touch devices don't have hover)
		if (!window.matchMedia('(pointer: coarse)').matches) {
			cardElement.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
		}
		isHovered = false;
	}

	function handleMouseEnter() {
		isHovered = true;
	}
</script>

<div
	bind:this={cardElement}
	class="card bg-base-100 border border-base-300 p-4 animate-fade-in hunt-card relative overflow-hidden"
	class:hovered={isHovered}
	role="article"
	on:mousemove={handleMouseMove}
	on:mouseleave={handleMouseLeave}
	on:mouseenter={handleMouseEnter}
	style="transition: transform 0.15s ease-out, box-shadow 0.3s ease;"
>
	<!-- Hover glow effect -->
	{#if isHovered}
		<div class="absolute inset-0 hunt-glow pointer-events-none"></div>
	{/if}

	<!-- Progress bar background -->
	<div class="absolute bottom-0 left-0 right-0 h-1 progress-bar-bg">
		<div class="h-full progress-bar-fill transition-all duration-500"
			style="width: {progressToOdds}%; background-color: {progressColor};">
		</div>
	</div>

	<!-- Header row -->
	<div class="flex items-center gap-3 mb-3 relative z-10">
		<div class="sprite-container transition-all duration-300" class:bounce={isHovered}>
			<img
				src={hunt.shinySpriteUrl}
				alt={hunt.pokemonName}
				width="56"
				height="56"
				class="shiny-glow flex-shrink-0"
			/>
		</div>
		<div class="flex-1 min-w-0">
			<p class="font-bold text-base leading-tight pokemon-name transition-all duration-300"
				class:highlight={isHovered}
				style="color: #2D1B2E;">
				{hunt.pokemonName}
				{#if pokemon?.evs}
					<span class="text-xs text-pink-400/80 ml-1 font-mono block">{formatEVs(pokemon.evs)}</span>
				{/if}
			</p>
			{#if showMethodEdit}
				<select 
					bind:value={selectedMethod} 
					class="select select-bordered select-xs w-full mt-1"
				>
					{#each HUNT_METHODS as method}
						<option value={method}>{method}</option>
					{/each}
				</select>
				<div class="flex gap-1 mt-1">
					<button 
						class="btn btn-xs btn-primary"
						on:click={onSaveMethod}
						disabled={savingMethod || selectedMethod === hunt.method}
					>
						{savingMethod ? '...' : 'Save'}
					</button>
					<button 
						class="btn btn-xs btn-ghost"
						on:click={() => { showMethodEdit = false; selectedMethod = hunt.method; }}
					>
						Cancel
					</button>
				</div>
			{:else}
				<button 
					class="text-xs opacity-60 hover:text-primary transition-colors text-left"
					on:click={() => { showMethodEdit = true; selectedMethod = hunt.method; }}
				>
					{hunt.method} ✏️
				</button>
			{/if}
		</div>
		<div class="text-right text-xs opacity-50 flex-shrink-0 time-badge">
			{#if hunt.isPaused}
				<span class="text-warning">⏸ Paused</span>
			{:else}
				<p>⏱ {elapsedDisplay}</p>
			{/if}
		</div>
	</div>

	<!-- Progress to odds indicator -->
	<div class="mb-3 relative z-10">
		<div class="flex justify-between text-xs mb-1">
			<span class="opacity-50">Progress to odds</span>
			<span class="font-medium" style="color: {progressColor};">{progressToOdds.toFixed(1)}%</span>
		</div>
		<div class="h-2 bg-base-200 rounded-full overflow-hidden">
			<div class="h-full rounded-full transition-all duration-500 relative"
				style="width: {progressToOdds}%; background: linear-gradient(90deg, {progressColor}88, {progressColor});">
				{#if progressToOdds > 5}
					<div class="absolute inset-0 shimmer-overlay"></div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Encounters display + adjustment -->
	<div class="bg-base-200 rounded-xl p-3 mb-3 encounter-box relative z-10 transition-all duration-300"
		class:glow={isHovered}>
		<div class="flex items-center justify-between">
			<!-- Left side: Encounters count -->
			<div>
				<p class="text-xs font-medium opacity-60 mb-0.5">ENCOUNTERS</p>
				<p class="text-3xl font-bold tabular-nums leading-none encounter-count transition-all duration-300"
					class:scale={isHovered}
					style="color: #2D1B2E;">
					{hunt.encounters.toLocaleString()}
				</p>
			</div>
			<!-- Right side: -1 button (away from main + buttons) -->
			<div class="flex items-center gap-3">
				{#if hunt.encounters > 0}
					<div class="text-right mr-2">
						<p class="text-xs font-medium opacity-60 mb-0.5">RATE</p>
						<p class="text-lg font-bold tabular-nums leading-none" style="color: #2D1B2E;">
							{encPerHourDisplay}
						</p>
					</div>
				{/if}
				<button
					class="btn btn-circle btn-sm btn-error"
					on:click={() => onIncrement(-1)}
					disabled={hunt.encounters === 0 || hunt.isPaused}
					aria-label="Decrease encounters"
				>
					−
				</button>
			</div>
		</div>
	</div>

	<!-- Primary +1 button (full width, prominent) -->
	<button
		class="btn btn-primary btn-lg w-full font-bold text-lg increment-btn mb-2 transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-lg"
		on:click={() => onIncrement(1)}
		disabled={hunt.isPaused}
	>
		+1 Encounter
	</button>

	<!-- Secondary increment buttons (+5, +10, bulk toggle) -->
	<div class="flex gap-1.5 mb-1 relative z-10">
		<button
			class="btn btn-primary btn-sm flex-1 font-bold increment-btn transition-all duration-200 hover:scale-105 active:scale-95"
			on:click={() => onIncrement(5)}
			disabled={hunt.isPaused}
		>+5</button>
		<button
			class="btn btn-primary btn-sm flex-1 font-bold increment-btn transition-all duration-200 hover:scale-105 active:scale-95"
			on:click={() => onIncrement(10)}
			disabled={hunt.isPaused}
		>+10</button>
		<button
			class="btn btn-secondary btn-sm font-bold increment-btn transition-all duration-200"
			on:click={() => { showBulkAdd = !showBulkAdd; }}
		>
			{showBulkAdd ? '−' : '⋯'}
		</button>
	</div>

	<!-- Bulk add buttons -->
	{#if showBulkAdd}
		<div class="flex gap-1.5 mb-3 relative z-10 animate-fade-in">
			<button
				class="btn btn-secondary btn-sm flex-1 font-bold"
				on:click={() => onIncrement(50)}
				disabled={hunt.isPaused}
			>+50</button>
			<button
				class="btn btn-secondary btn-sm flex-1 font-bold"
				on:click={() => onIncrement(100)}
				disabled={hunt.isPaused}
			>+100</button>
			<button
				class="btn btn-error btn-sm font-bold"
				on:click={() => onIncrement(-10)}
				disabled={hunt.encounters < 10 || hunt.isPaused}
			>-10</button>
		</div>
	{/if}

	<!-- Alpha toggle -->
	<label class="flex items-center gap-2 text-sm mb-3 cursor-pointer select-none relative z-10 alpha-toggle"
		class:hovered={isHovered}>
		<input type="checkbox" bind:checked={isAlpha} class="checkbox checkbox-warning checkbox-sm transition-all" />
		<span class="font-medium">Alpha Pokémon</span>
		{#if isAlpha}
			<span class="badge badge-warning badge-sm alpha-badge animate-pulse">α</span>
		{/if}
	</label>

	<!-- Notes section -->
	{#if showNotes}
		<div class="mb-3 relative z-10 animate-fade-in">
			<textarea
				bind:value={notes}
				placeholder="Add notes about this hunt..."
				class="textarea textarea-bordered w-full text-sm"
				rows="2"
			></textarea>
			<div class="flex justify-end gap-1 mt-1">
				<button 
					class="btn btn-xs btn-primary"
					on:click={onSaveNotes}
					disabled={savingNotes}
				>
					{savingNotes ? '...' : 'Save Notes'}
				</button>
				<button 
					class="btn btn-xs btn-ghost"
					on:click={() => { showNotes = false; notes = hunt.notes || ''; }}
				>
					Cancel
				</button>
			</div>
		</div>
	{:else}
		<button 
			class="btn btn-ghost btn-xs w-full mb-3 relative z-10 opacity-50 hover:opacity-100 transition-all"
			on:click={() => { showNotes = true; notes = hunt.notes || ''; }}
		>
			{hunt.notes ? '📝 Edit Notes' : '+ Add Notes'}
		</button>
	{/if}

	<!-- Action row -->
	<div class="flex gap-2 relative z-10">
		<button
			class="btn btn-ghost btn-sm text-error flex-1 transition-all duration-200 hover:bg-error/10"
			on:click={onAbandon}
			disabled={abandoning}
		>
			{abandoning ? '...' : 'Abandon'}
		</button>
		<button
			class="btn btn-warning btn-sm flex-1 font-bold transition-all duration-200"
			on:click={onPauseResume}
			disabled={pausing}
		>
			{#if pausing}
				<span class="loading loading-spinner loading-xs"></span>
			{:else if hunt.isPaused}
				▶ Resume
			{:else}
				⏸ Pause
			{/if}
		</button>
		<button
			class="btn btn-accent btn-sm flex-1 font-bold shiny-found-btn transition-all duration-200 hover:scale-105"
			on:click={onComplete}
			disabled={completing || hunt.isPaused}
		>
			{#if completing}
				<span class="loading loading-spinner loading-xs"></span>
			{:else}
				✨ Found!
			{/if}
		</button>
	</div>
</div>

<style>
	.hunt-card {
		box-shadow: 0 2px 8px rgba(45, 27, 46, 0.08);
		min-width: 280px;
	}

	@media (min-width: 1024px) {
		.hunt-card {
			min-width: 320px;
		}
	}

	.hunt-card:hover {
		box-shadow: 0 12px 32px rgba(255, 183, 197, 0.3), 0 4px 16px rgba(45, 27, 46, 0.1);
		border-color: #FFB7C5;
	}

	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(-4px); }
		to { opacity: 1; transform: translateY(0); }
	}

	.animate-fade-in {
		animation: fadeIn 0.2s ease-out;
	}

	.hunt-glow {
		background: radial-gradient(circle at 50% 0%, rgba(255, 183, 197, 0.15) 0%, transparent 60%);
		animation: glowPulse 2s ease infinite;
	}

	@keyframes glowPulse {
		0%, 100% { opacity: 0.5; }
		50% { opacity: 1; }
	}

	.sprite-container {
		transition: transform 0.3s ease;
	}

	.sprite-container.bounce {
		animation: gentleBounce 0.6s ease infinite;
	}

	@keyframes gentleBounce {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-3px); }
	}

	.pokemon-name.highlight {
		color: #FFB7C5;
	}

	.encounter-box.glow {
		background: linear-gradient(135deg, rgba(255, 183, 197, 0.15) 0%, rgba(255, 236, 242, 0.5) 100%);
		box-shadow: 0 2px 12px rgba(255, 183, 197, 0.2);
	}

	.encounter-count.scale {
		transform: scale(1.05);
		color: #FFB7C5;
	}

	.increment-btn {
		position: relative;
		overflow: hidden;
	}

	.increment-btn::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0;
		height: 0;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		transform: translate(-50%, -50%);
		transition: width 0.3s ease, height 0.3s ease;
	}

	.increment-btn:active::after {
		width: 100px;
		height: 100px;
	}

	.shiny-found-btn {
		position: relative;
		overflow: hidden;
	}

	.shiny-found-btn::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(255, 255, 255, 0.3),
			transparent
		);
		transition: left 0.5s ease;
	}

	.shiny-found-btn:hover::before {
		left: 100%;
	}

	.progress-bar-bg {
		background: rgba(0, 0, 0, 0.05);
	}

	.shimmer-overlay {
		background: linear-gradient(
			90deg,
			transparent,
			rgba(255, 255, 255, 0.4),
			transparent
		);
		animation: shimmer 1.5s infinite;
	}

	@keyframes shimmer {
		0% { transform: translateX(-100%); }
		100% { transform: translateX(100%); }
	}

	.alpha-toggle {
		transition: all 0.3s ease;
	}

	.alpha-toggle.hovered {
		background: rgba(255, 183, 197, 0.1);
		border-radius: 8px;
		padding: 4px 8px;
		margin-left: -8px;
		margin-right: -8px;
	}

	.alpha-badge {
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.7; }
	}
</style>
